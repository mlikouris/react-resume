# Resume Backend API (FastAPI)

This is the backend service for the resume website. It handles contact form submissions, verifies security tokens with Cloudflare Turnstile, and sends notification emails via SMTP.

## Features

- **FastAPI**: Asynchronous Python web framework.
- **Cloudflare Turnstile**: Server-side verification of CAPTCHA tokens.
- **SMTP Integration**: Secure email delivery via Gmail/SMTP.
- **CORS Configuration**: Restricted to trusted origins.
- **SSL Support**: Ready for local HTTPS development.

## Prerequisites

- Python 3.9+
- [mkcert](https://github.com/FiloSottile/mkcert) (for local SSL certificates)

## Installation

1. **Create and activate a virtual environment**:

   ```bash
   python -m venv env_site
   source env_site/bin/activate  # On Windows use `env_site\Scripts\activate`
   ```

2. **Install dependencies**:

   ```bash
   pip install fastapi uvicorn[standard] pydantic[email] python-dotenv httpx certifi
   ```

3. **Environment Variables**:
   Ensure your `.env` file is populated with the following keys:
   `SENDER_EMAIL`, `APP_PASSWORD`, `SMTP_SERVER`, `SMTP_PORT`, `MAIL_TO`, `ALLOWED_ORIGINS`, and `CLOUDFLARE_SECRET_KEY`.

## Running the Application

To start the server with SSL for local development (to match the frontend HTTPS if applicable):

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000 --ssl-keyfile=./localhost+2-key.pem --ssl-certfile=./localhost+2.pem
```

The API will be available at `https://localhost:8000`.
