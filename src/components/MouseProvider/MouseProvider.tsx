"use client";
import { ClickAwayListener } from "@mui/material";
import { createContext, useContext, useState } from "react";

export type MouseValue = {
  isInside: boolean;
};

const INITIAL_MOUSE_VALUE: MouseValue = {
  isInside: false,
};

const MouseContext = createContext<MouseValue>(INITIAL_MOUSE_VALUE);

export function useMouseContext() {
  return useContext(MouseContext);
}

export default function MouseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInside, setIsInside] = useState(false);

  const onMouseOver = () => {
    if (!isInside) {
      setIsInside(true);
    }
  };

  const onMouseOut = () => {
    if (isInside) {
      setIsInside(false);
    }
  };

  return (
    <MouseContext.Provider value={{ isInside }}>
      <ClickAwayListener onClickAway={onMouseOut}>
        <div
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseOut}
          onClick={onMouseOver}
        >
          {children}
        </div>
      </ClickAwayListener>
    </MouseContext.Provider>
  );
}