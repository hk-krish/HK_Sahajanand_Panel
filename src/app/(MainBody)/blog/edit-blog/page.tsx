"use client";
import { FunctionComponent, useEffect, useState } from "react";

const EditBlog = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Blog/BlogDataForm/EditBlog")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default EditBlog;