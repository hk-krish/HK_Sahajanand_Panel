"use client";

import { NoSsrProps } from "@/Types/CoreComponents";
import dynamic from "next/dynamic";
import { FC, Fragment } from "react";

const NoSsr: FC<NoSsrProps> = (props) => <Fragment>{props.children}</Fragment>;

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
