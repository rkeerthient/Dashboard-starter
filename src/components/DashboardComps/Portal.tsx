import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import * as React from "react";
import Preview from "./Preview";

interface PortalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  styleSheetRef: string;
}

const Portal: React.FC<PortalProps> = ({
  open,
  setOpen,
  data,
  styleSheetRef,
}) => {
  const _window = useRef<Window | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (_window.current && event.target instanceof Node) {
        if (!_window.current.document.body.contains(event.target)) {
          setReady(false);
          setOpen(false);
        }
      }
    };

    if (open) {
      _window.current = window.open("", "");

      const curWindow = _window.current;

      const closeHandler = () => {
        setReady(false);
        setOpen(false);
      };

      curWindow?.addEventListener("beforeunload", closeHandler);
      curWindow?.addEventListener("unload", closeHandler);

      const styleLink = curWindow?.document.createElement("link");
      styleLink?.setAttribute("rel", "stylesheet");
       styleLink?.setAttribute("href", "/src/index.css");
      // styleLink?.setAttribute("href", styleSheetRef);
      curWindow?.document.head.appendChild(
        styleLink || curWindow.document.createElement("div")
      );

      setReady(true);

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        curWindow?.removeEventListener("beforeunload", closeHandler);
        curWindow?.removeEventListener("unload", closeHandler);
        _window.current?.close();
        setReady(false);
      };
    } else {
      _window.current?.close();
      setReady(false);
    }
  }, [open, setOpen, data]);

  useEffect(() => {}, [data]);

  const portal =
    open &&
    ready &&
    createPortal(<Preview data={data} />, _window.current?.document.body!);

  return portal || null;
};

export default Portal;
