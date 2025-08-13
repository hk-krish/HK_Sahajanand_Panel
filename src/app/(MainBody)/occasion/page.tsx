"use client";
import { FunctionComponent, useEffect, useState } from "react";

const Occasion = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Occasion")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default Occasion;