"use client";
import { FunctionComponent, useEffect, useState } from "react";

const Setting = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Setting")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default Setting;