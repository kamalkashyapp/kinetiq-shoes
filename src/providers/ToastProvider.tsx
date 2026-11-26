'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'warn' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  dismiss: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, type = 'default', action }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, description, type, action };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        dismiss(id);
      }, 5000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4"
      >
        {toasts.map((t) => {
          const typeBorder =
            t.type === 'success'
              ? 'border-status-success'
              : t.type === 'warn'
              ? 'border-status-warn'
              : t.type === 'error'
              ? 'border-status-danger'
              : 'border-line';

          return (
            <div
              key={t.id}
              role="alert"
              className={`pointer-events-auto bg-paper text-ink p-4 border ${typeBorder} shadow-pop flex items-start justify-between gap-4 transition-all duration-base`}
            >
              <div className="flex-1">
                <p className="micro-label font-bold text-ink">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-smoke mt-1">{t.description}</p>
                )}
                {t.action && (
                  <button
                    onClick={() => {
                      t.action?.onClick();
                      dismiss(t.id);
                    }}
                    className="mt-2 text-xs font-mono underline uppercase tracking-wider text-ink hover:text-acid"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Close notification"
                className="text-smoke hover:text-ink transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
