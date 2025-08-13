"use client";

import { RouteList } from "@/Constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => router.push(RouteList.Default), [router]);
  return <main></main>;
};

export default Home;