import { useState, useEffect } from "react";

const useTouchDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const touchSupported = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator as any).msMaxTouchPoints > 0;
    
    // Check if hover is supported (indicates mouse device)
    const hoverSupported = window.matchMedia('(hover: hover)').matches;
    
    setIsTouchDevice(touchSupported);
    setIsHoverSupported(hoverSupported);
  }, []);

  return { isTouchDevice, isHoverSupported };
};

export default useTouchDetection;