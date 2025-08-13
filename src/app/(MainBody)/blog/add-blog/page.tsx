"use client";
import { FunctionComponent, useEffect, useState } from "react";

const AddBlog = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Blog/BlogDataForm/AddBlog")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default AddBlog;