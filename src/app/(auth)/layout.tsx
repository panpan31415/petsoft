import Logo from "@/components/logo";
import React, { ReactNode } from "react";

type AuthLayoutProps = {
    children: ReactNode;
};
export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className='flex justify-center items-center min-h-screen flex-col gap-y-5'>
            <Logo />
            {children}
        </div>
    );
}
