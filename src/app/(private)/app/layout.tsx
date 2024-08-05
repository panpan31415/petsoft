import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { ReactNode } from "react";
import PetContextProvider from "@/contexts/pet-context-provider";
import prisma from "@/lib/db";

type LayoutProps = {
    children: ReactNode;
};
export default async function Layout({ children }: LayoutProps) {
    const pets = await prisma.pet.findMany();
    return (
        <>
            <BackgroundPattern />
            <div className='flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen'>
                <AppHeader />
                <PetContextProvider data={pets}>{children}</PetContextProvider>
                <AppFooter />
            </div>
        </>
    );
}
