import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

type ContentBlockProps = {
    children: ReactNode;
    className?: ClassNameValue;
};
export default function ContentBlock({ children, className }: ContentBlockProps) {
    return (
        <div className={cn("bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden w-full h-full", className)}>
            {children}
        </div>
    );
}
