import type { ReactNode } from "react";
import { ResidentSidebar } from "./ResidentSidebar.tsx";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/toaster";

interface ResidentLayoutProps {
  children: ReactNode;
  title: string;
}

export function ResidentLayout({ children, title }: ResidentLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <ResidentSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
