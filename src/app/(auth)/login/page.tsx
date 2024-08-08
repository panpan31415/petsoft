import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main>
            <H1 className={"text-center"}>Sign Up</H1>
            <AuthForm type='Sign Up' />
            <p className='mt-6 text-sm text-zinc-500'>
                No account yet?{" "}
                <Link
                    href={"/signup"}
                    className='font-medium'>
                    Sign up
                </Link>
            </p>
        </main>
    );
}
