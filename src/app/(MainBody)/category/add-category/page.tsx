"use client";
import { FunctionComponent, useEffect, useState } from "react";

const AddCategory = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Category/CategoryDataForm/AddCategory")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default AddCategory;