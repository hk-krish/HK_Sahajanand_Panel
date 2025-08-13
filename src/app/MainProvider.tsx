"use client";
import { store } from "@/ReduxToolkit/Store";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import Loading from "./loading";

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
