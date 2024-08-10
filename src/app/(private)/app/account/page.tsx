import ContentBlock from "@/components/content-bock";
import H1 from "@/components/h1";
import SignOutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    // auth must be used in server components
    // useSession must be used in client components
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }
    return (
        <main>
            <H1 className={"my-8 text-white"}>Your Account</H1>

            <ContentBlock className='h-[500px] flex justify-center items-center flex-col'>
                <p>Logged in as {session.user.email}</p>
                <SignOutButton />
            </ContentBlock>
        </main>
    );
}
