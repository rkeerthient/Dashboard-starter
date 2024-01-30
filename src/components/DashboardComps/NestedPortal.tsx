import * as React from "react";
import { createPortal } from "react-dom";

const PortalContext = React.createContext(
  typeof document !== "undefined" ? document.body : null
);

export function NestedPortal({ children }: any) {
  const context = React.useContext(PortalContext);
  const [container] = React.useState(() => {
    if (typeof document !== "undefined") {
      const portal = document.getElementById(`test-portal`);
      return portal;
    }
    // ssr
    return null;
  });

  React.useLayoutEffect(() => {
    if (container && context) {
      context.appendChild(container);
      return () => {
        context.removeChild(container);
      };
    }
    return undefined;
  }, [container, context]);

  if (container) {
    const portal = createPortal(children, container);
    return (
      <PortalContext.Provider value={container}>
        {portal}
      </PortalContext.Provider>
    );
  }

  // ssr
  return null;
}
