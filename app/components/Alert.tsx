"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationSelector,
  removeNotification,
} from "../slices/notificationSlice";

export interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  autoClose?: boolean;
  duration?: number; // Auto close duration in ms
}

export const Alert: React.FC<AlertProps> = ({
  message,
  type = "success",
  autoClose = true,
  duration = 3000,
}) => {
  const notification = useSelector(notificationSelector);
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */
  const close = () => {
    dispatch(removeNotification());
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        close();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  if (!notification.visible) return null;

  return (
    <div
      role="alert"
      className={clsx(
        "fixed top-5 right-5 flex items-center gap-3 p-4 rounded-lg shadow-lg transition-opacity duration-300",
        {
          "bg-green-100 text-green-800 border-l-4 border-green-500":
            type === "success",
          "bg-red-100 text-red-800 border-l-4 border-red-500": type === "error",
          "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500":
            type === "warning",
          "bg-blue-100 text-blue-800 border-l-4 border-blue-500":
            type === "info",
        }
      )}
    >
      {/* Icon */}
      <span>
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "warning" && "⚠️"}
        {type === "info" && "ℹ️"}
      </span>

      {/* Message */}
      <span>{message}</span>

      {/* Close Button */}
      <button
        onClick={() => close()}
        className="cursor-pointer ml-auto text-gray-700 hover:text-gray-900"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Alert;
