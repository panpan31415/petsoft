import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

export default function H1({ children, className }: { children: ReactNode; className?: ClassNameValue }) {
    return <h1 className={cn("font-medium text-2xl leading-6", className)}>{children}</h1>;
}
