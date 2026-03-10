import { useEffect, useState } from "react";

export const useCustomNavigate = () => {
    const [categoryActive, setCategoryActive] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-white" : "text-indigo-500";

  return { categoryActive, setCategoryActive, linkClass }
}


export const useScroll = (isOpen: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

export const useKeyDown = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
};
