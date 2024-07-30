import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className='bg-[#5dc9a8] min-h-screen flex justify-center items-center gap-10 flex-col xl:flex-row'>
            <Image
                src={"https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"}
                alt='PetSoft preview'
                width={519}
                height={472}
            />
            <div>
                <Logo />
                <h1 className='text-5xl font-semibold my-6 max-w-[500px]'>
                    Manage your <span className='font-extrabold'>pet daycare</span> with ease
                </h1>
                <p className='text-2xl font-medium max-w-[600px]'>
                    Use PetSoft to easily keep track of pets under your care. Get lifetime access for $299.
                </p>
                <div className='mt-10 space-x-4'>
                    <Button
                        className='rounded-full bg-red-500'
                        asChild>
                        <Link href={"/signup"}>Get started</Link>
                    </Button>
                    <Button
                        variant={"secondary"}
                        className='rounded-full'
                        asChild>
                        <Link href={"/login"}>Log in</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
