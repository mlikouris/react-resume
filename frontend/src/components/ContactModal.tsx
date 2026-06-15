import { motion, AnimatePresence } from "framer-motion";
import Loader from './Loader';
import { useState, useEffect } from 'react'

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {

  const [state, setState] = useState<'idle' | 'generating' | 'generated'>("idle");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const isGenerating = state === "generating";

  useEffect(() => {
    if (isOpen) {
      // Manually inject the script tag into the document body
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Cleanup: remove the script tag when the modal is closed/unmounted
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formPayLoad = Object.fromEntries(formData.entries())
    try {
        setState("generating");
        setMessage("");
        setIsError(false);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formPayLoad)
      })

      const data = await response.json();

      if (response.status === 422) {
        throw new Error("Please verify that you are human");
      }

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }
      if (data.message) {
        setMessage(data.message);
      }

      setState("generated");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Submission Failed");
      setIsError(true);
      setState("idle");
    }
  }


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 overflow-hidden"
          >

          {isGenerating ? (
            <Loader />
          ): ""}
          {message && !isError ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Thank You!</h2>
                    <button
                      onClick={onClose}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-all"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{message}</h3>
              </div>
            ): (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Contact Mike</h2>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-all"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700">First Name</label>
                    <input type="text" name="firstName" placeholder="Alexander" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700">Last Name</label>
                    <input type="text" name="lastName" placeholder="The Great" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Work Email</label>
                  <input type="email" name="email" placeholder="alex@company.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700">Message</label>
                  <textarea name="message" rows={4} placeholder="How can I help you?" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" required></textarea>
                </div>
                <div className="cf-turnstile" data-sitekey="0x4AAAAAADi2auSiCM1vqXF7"></div>
                {isError && (
                  <p className="text-red-500 text-sm font-medium mt-2">{message}</p>
                )}
                <div className="pt-2">
                  <button type="submit" className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-blue-500/20">
                    Contact
                  </button>
                </div>
              </form>
            </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;