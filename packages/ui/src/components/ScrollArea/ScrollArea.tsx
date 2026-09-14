import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

export type ScrollAreaProps = {
  children: React.ReactNode;
  /** Altura, em px, a subtrair de 100vh para calcular a altura máxima. Default 206. */
  offsetHeight?: number;
};

/**
 * Container com scroll vertical e altura calculada a partir da viewport.
 * Unifica o `ScrollableBox` encontrado com código idêntico em todos os 11
 * repos auditados (ver AUDITORIA.md — duplicação #1).
 */
export function ScrollArea({ children, offsetHeight = 206 }: ScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasOverflow(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  return (
    <Box
      ref={ref}
      sx={{
        maxHeight: `calc(100vh - ${offsetHeight}px)`,
        overflowY: "auto",
        paddingRight: hasOverflow ? "20px" : 0,
      }}
    >
      {children}
    </Box>
  );
}
