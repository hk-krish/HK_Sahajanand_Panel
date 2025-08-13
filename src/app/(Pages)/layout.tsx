"use client";
import { ChildrenType } from "@/Types/Layout";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: ChildrenType) {
  return (
    <Fragment>
      {children}
      <ToastContainer />
    </Fragment>
  );
}
