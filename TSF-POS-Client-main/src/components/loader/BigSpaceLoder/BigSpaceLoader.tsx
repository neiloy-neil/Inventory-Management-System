import React from "react";
import ModernLoader from "../ModernLoader/ModernLoader";

const BigSpaceLoader = () => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}>
      <ModernLoader message="Loading, please wait..." size="lg" />
    </div>
  );
};

export default BigSpaceLoader;