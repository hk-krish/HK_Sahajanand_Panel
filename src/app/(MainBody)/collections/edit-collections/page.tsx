"use client";
import { FunctionComponent, useEffect, useState } from "react";

const EditCollection = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Collections/CollectionDataForm/EditCollection")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default EditCollection;