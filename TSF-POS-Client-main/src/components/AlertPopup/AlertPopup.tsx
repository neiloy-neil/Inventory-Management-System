import React from "react";
import "./alertPopup.scss";
import ModernAlert from "../Alert/ModernAlert/ModernAlert";

interface AlertPopupProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ message, type = "info", onClose = () => {} }) => {
  return (
    <div className="alert-popup">
      <ModernAlert 
        message={message} 
        type={type} 
        onClose={onClose} 
        dismissible={true} 
      />
    </div>
  );
};

export default AlertPopup;