import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type SubmitFromButtonProps = {
    children: ReactNode;
    className?: ClassNameValue;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
};

// The useFormStatus hook must be used within a component that is a child of a form element.
export default function SubmitFromButton({ children, className, variant }: SubmitFromButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button
            disabled={pending}
            variant={variant}
            type='submit'
            className={cn(`rounded-full`, className)}>
            {children}
        </Button>
    );
}
