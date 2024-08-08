import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "PetSoft - Sign Up",
};

export default function SignUpPage() {
    return (
        <main>
            <H1 className={"text-center "}>Sign Up</H1>
            <AuthForm type='Sign Up' />
            <p className='mt-6 text-sm text-zinc-500'>
                Have an account already?{" "}
                <Link
                    href={"/login"}
                    className='font-medium'>
                    Sign up
                </Link>
            </p>
        </main>
    );
}
