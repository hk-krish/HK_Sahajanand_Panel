"use client";
import { FunctionComponent, useEffect, useState } from "react";

const EditCategory = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Category/CategoryDataForm/EditCategory")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default EditCategory;