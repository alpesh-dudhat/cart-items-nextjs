// src/context/NotificationContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Notification {
  message: string;
  type: "success" | "error";
}

interface NotificationContextProps {
  showNotification: (message: string, type: "success" | "error") => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          
          className={`fixed w-full inset-x-0 max-w-1/2 mx-auto  top-10 px-4 py-2 rounded shadow-lg text-black z-50 ${
            notification.type === "success" ? "bg-white" : "bg-red"
          }`}
        >
          {notification.message}
        </motion.div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
