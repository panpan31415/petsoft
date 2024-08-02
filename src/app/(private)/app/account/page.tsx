import ContentBlock from "@/components/content-bock";
import H1 from "@/components/h1";

export default function AccountPage() {
    return (
        <main>
            <H1 className={"my-8 text-white"}>Your Account</H1>

            <ContentBlock className='h-[500px] flex justify-center items-center'>
                <p>Logged in as ...</p>
            </ContentBlock>
        </main>
    );
}
