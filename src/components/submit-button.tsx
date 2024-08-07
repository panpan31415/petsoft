import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type SubmitFromButtonProps = {
    children: ReactNode;
    className?: ClassNameValue;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
};

export default function SubmitFromButton({ children, className, variant }: SubmitFromButtonProps) {
    return (
        <Button
            variant={variant}
            type='submit'
            className={cn(`rounded-full`, className)}>
            {children}
        </Button>
    );
}
