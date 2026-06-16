import { useEffect, useRef } from 'react';

interface Turnstile {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string;
      callback?: () => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  isOpen: boolean;
  onTurnstileError: () => void;
  onTurnstileExpired: () => void;
  onTurnstileSuccess: () => void;
}

const TurnstileWidget = (
  {
    siteKey,
    isOpen,
    onTurnstileError,
    onTurnstileExpired,
    onTurnstileSuccess
  }: TurnstileWidgetProps
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (window.turnstile && containerRef.current && isOpen) {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onTurnstileSuccess,
        'expired-callback': onTurnstileExpired,
        'error-callback': onTurnstileError,
      });
    }
    if(!isOpen) return;

    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onTurnstileSuccess,
          'expired-callback': onTurnstileExpired,
          'error-callback': onTurnstileError,
        });
      }
    };

    if (!script) {
      // Manually inject the script tag into the document body only once
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else if (window.turnstile) {
      // Script already exists, just render
      renderWidget();
    }

    // This cleanup function fires when the component is destroyed
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };

  }, [isOpen, siteKey]);

  return (
    <div ref={containerRef} ></div>
);
}

export default TurnstileWidget;