/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import Sidebar from "@/Layout/Sidebar";
import TapTop from "@/Layout/TapTop";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { addSidebarTypes, setSideBarToggle } from "@/ReduxToolkit/Slice/Layout/ThemeCustomizerSlice";
import { ChildrenType } from "@/Types/Layout";
import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: ChildrenType) {
  const dispatch = useAppDispatch();
  const { sidebarTypes, sideBarToggle } = useAppSelector((state) => state.themeCustomizer);

  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (sidebarTypes === "compact-wrapper") {
      if (windowWidth <= 1200) dispatch(setSideBarToggle(true));
      else dispatch(setSideBarToggle(false));
    } else if (sidebarTypes === "horizontal-wrapper") {
      if (windowWidth <= 992) {
        dispatch(setSideBarToggle(true));
        dispatch(addSidebarTypes("compact-wrapper"));
      } else {
        dispatch(setSideBarToggle(false));
        dispatch(addSidebarTypes("horizontal-wrapper"));
      }
    }
  };
  useEffect(() => {
    updateSidebarBasedOnWidth();
    window.addEventListener("resize", () => updateSidebarBasedOnWidth());
  }, [sidebarTypes]);

  return (
    <Fragment>
      <div className={`page-wrapper ${sideBarToggle ? "compact-wrapper" : sidebarTypes}`}>
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </div>
      <TapTop />
      <ToastContainer />
    </Fragment>
  );
}
