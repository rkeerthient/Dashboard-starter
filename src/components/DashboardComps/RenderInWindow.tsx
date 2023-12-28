import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import * as React from "react";
import Preview from "./Preview";

interface RenderInWindowProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

const RenderInWindow: React.FC<RenderInWindowProps> = ({
  open,
  setOpen,
  data,
}) => {
  const _window = useRef<Window | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
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
      styleLink?.setAttribute("type", "text/css");
      styleLink?.setAttribute("href", "/src/index.css");
      curWindow?.document.head.appendChild(
        styleLink || document.createElement("div")
      );

      setReady(true);

      return () => {
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

export default RenderInWindow;
