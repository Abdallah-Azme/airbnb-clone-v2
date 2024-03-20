"use client";
import React from "react";
import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex flex-col h-[70vh] justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
}
