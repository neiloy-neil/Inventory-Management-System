import React from "react";
import "./modernLoader.scss";

interface ModernLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const ModernLoader: React.FC<ModernLoaderProps> = ({ 
  message = "Loading...", 
  size = "md" 
}) => {
  return (
    <div className="modern-loader-container">
      <div className={`modern-loader-spinner modern-loader-${size}`}>
        <div className="modern-loader-spinner-ring"></div>
        <div className="modern-loader-spinner-ring"></div>
        <div className="modern-loader-spinner-ring"></div>
        <div className="modern-loader-spinner-ring"></div>
      </div>
      {message && (
        <p className="modern-loader-message">{message}</p>
      )}
    </div>
  );
};

export default ModernLoader;