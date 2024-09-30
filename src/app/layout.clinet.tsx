"use client";
import SessionProvider from "@/provider/SessionProvider";
import { FC, ReactNode } from "react";

interface LayoutType {
  children: ReactNode;
}
const LayoutClient: FC<LayoutType> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default LayoutClient;
