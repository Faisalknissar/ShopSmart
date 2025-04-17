"use client";

import { useEffect } from "react";

export function TempoInit() {
  useEffect(() => {
    const init = async () => {
      try {
        if (process.env.NEXT_PUBLIC_TEMPO) {
          // Add a small delay to ensure other scripts are loaded first
          await new Promise((resolve) => setTimeout(resolve, 100));
          const { TempoDevtools } = await import("tempo-devtools");
          TempoDevtools.init();
        }
      } catch (error) {
        console.error("Failed to initialize Tempo Devtools:", error);
      }
    };

    init();
  }, []);

  return null;
}
