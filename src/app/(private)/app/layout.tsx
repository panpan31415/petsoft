import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <BackgroundPattern />
            <div className='flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen'>
                <AppHeader />
                {children}
                <AppFooter />
            </div>
        </>
    );
}
