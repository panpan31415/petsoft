import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type SubmitFromButtonProps = {
    children: ReactNode;
    className?: ClassNameValue;
};

// The useFormStatus hook must be used within a component that is a child of a form element.
export default function SubmitFromButton({ children, className }: SubmitFromButtonProps) {
    const { pending } = useFormStatus();
    console.log("pending", pending);
    return (
        <Button
            disabled={pending}
            type='submit'
            className={cn(`rounded-full`, className)}>
            {children}
        </Button>
    );
}
