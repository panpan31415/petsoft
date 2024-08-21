import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type SubmitFromButtonProps = {
    children: ReactNode;
    className?: ClassNameValue;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    disabled?: boolean;
};

export default function SubmitFromButton({ children, className, variant, disabled = false }: SubmitFromButtonProps) {
    return (
        <Button
            disabled={disabled}
            variant={variant}
            type='submit'
            className={cn(`rounded-full`, className)}>
            {children}
        </Button>
    );
}
