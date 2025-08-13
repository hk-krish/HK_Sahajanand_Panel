"use client";
import { FunctionComponent, useEffect, useState } from "react";

const Color = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Color")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default Color;