import { useUnit } from "effector-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface checkPageClickingProps {
  blockDataId: string;
}

export const checkPageClicking = (
  { blockDataId }: checkPageClickingProps,
  callback: (isNotBlock: boolean) => void
) => {
  let isBlock = false;
  const clickEventHandler = (e: any) => {
    isBlock = e.target.closest(`[data-id="${blockDataId}"]`);
    callback(isBlock);
  };

  window.addEventListener("click", clickEventHandler);
};

type DeviceType = "main" | "bigTablet" | "laptop" | "tablet" | "phone";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | undefined>(
    undefined
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1280) {
        setDeviceType("main");
      } else if (width <= 996 && width > 700) {
        setDeviceType("bigTablet");
      } else if (width <= 1280 && width > 700) {
        setDeviceType("laptop");
      } else if (width <= 700 && width > 320) {
        setDeviceType("tablet");
      } else if (width <= 320) {
        setDeviceType("phone");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export const FB_PIXEL_ID = "1797283080715437";

export const pageview = () => {
  (window as any).fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: any, options = {}) => {
  (window as any).fbq("track", name, options);
};

interface useDropdownReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function useDropdown(): useDropdownReturn {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, dropdownRef, setIsOpen]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close, dropdownRef };
}
