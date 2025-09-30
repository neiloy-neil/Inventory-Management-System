import React from "react";
import "./modernAlert.scss";

interface ModernAlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose?: () => void;
  dismissible?: boolean;
}

const ModernAlert: React.FC<ModernAlertProps> = ({ 
  message, 
  type, 
  onClose, 
  dismissible = false 
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "";
    }
  };

  return (
    <div className={`modern-alert modern-alert-${type} modern-fade-in`}>
      <div className="modern-alert-content">
        <span className="modern-alert-icon">{getIcon()}</span>
        <span className="modern-alert-message">{message}</span>
        {dismissible && (
          <button 
            className="modern-alert-close" 
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ModernAlert;