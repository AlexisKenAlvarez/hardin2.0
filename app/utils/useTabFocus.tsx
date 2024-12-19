import { useEffect } from "react";

const useTabFocus = (onFocus: () => void) => {
  useEffect(() => {
    const handleFocus = () => {
      onFocus();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [onFocus]);
};

export default useTabFocus;