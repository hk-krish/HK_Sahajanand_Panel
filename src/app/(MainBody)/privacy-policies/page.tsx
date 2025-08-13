"use client";
import { FunctionComponent, useEffect, useState } from "react";

const PrivacyPolicies = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/PrivacyPolicies")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default PrivacyPolicies;
