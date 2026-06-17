from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import smtplib
import os
from dotenv import load_dotenv
import ssl
import certifi
import httpx
from email.message import EmailMessage

app = FastAPI()

# Load variables from the .env file
load_dotenv()

# Access your global configuration .env file
sender_email = os.getenv("SENDER_EMAIL")
app_password = os.getenv("APP_PASSWORD")
smtp_server = os.getenv("SMTP_SERVER")
smtp_port = int(os.getenv("SMTP_PORT", 465))
mail_to = os.getenv("MAIL_TO")
cloudflare_secret = os.getenv("CLOUDFLARE_SECRET_KEY")

# Merge .env origins with localhost for easier development
raw_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
allowed_origins = [o for o in raw_origins if o] + [
    "http://localhost:5173",
    "https://localhost:5173",
    "http://127.0.0.1:5173",
    "https://127.0.0.1:5173"
]

# Enable CORS so your frontend can send requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Define data structure with built-in validation


class ContactSubmission(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    message: str
    token: str = Field(..., alias="cf-turnstile-response", min_length=1)


@app.get("/api/ping")
async def ping():
    return {"ok": True}


# @app.get("/api/contact")
# async def contact_form_info():
#     return {"message": "The contact API is active. Please use POST to submit messages."}


@app.post("/api/contact", status_code=status.HTTP_200_OK)
async def submit_contact_form(payload: ContactSubmission):
    # 1. Verify Cloudflare Turnstile Token
    if not cloudflare_secret:
        print("WARNING: CLOUDFLARE_SECRET_KEY is missing. Skipping security verification.")

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            verify_res = await client.post(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                data={
                    "secret": cloudflare_secret,
                    "response": payload.token,
                },
            )
            verification_data = verify_res.json()
            if not verification_data.get("success"):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Security check failed. Please refresh and try again.")
    except httpx.RequestError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Security verification service is currently unavailable.")

    # Sanitize inputs to prevent header injection and strip extra whitespace
    first_name = payload.firstName.strip().replace("\n", "").replace("\r", "")
    last_name = payload.lastName.strip().replace("\n", "").replace("\r", "")
    email = payload.email.strip().replace("\n", "").replace("\r", "")
    email_subject = f"Likouris.com Contact Inquiry from {first_name} {last_name}"

    # 2. Build the email message
    msg = EmailMessage()
    msg["Subject"] = email_subject
    msg["From"] = sender_email
    msg["To"] = mail_to
    msg.set_content(
        f"Name: {first_name} {last_name}\nEmail: {email}\n\nMessage:\n{payload.message}")

    # 3. Establish a secure connection and send
    context = ssl.create_default_context(cafile=certifi.where())

    try:
        if not sender_email or not app_password:
            raise ValueError(
                "SENDER_EMAIL or APP_PASSWORD is not set in the environment.")

        # Connect to your preferred SMTP server (e.g., Mailtrap, SendGrid, Gmail)
        # Use standard port 587 and updated host
        with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
            server.login(sender_email, app_password)
            server.send_message(msg)
        return {"status": "success", "message": "Your message was sent successfully!"}
    except Exception as e:
        print(f"SMTP Error: {e}")  # Logs the actual error to your terminal
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try again later."
        )
