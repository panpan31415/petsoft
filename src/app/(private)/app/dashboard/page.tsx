import Branding from "@/components/branding";
import ContentBlock from "@/components/content-bock";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchFrom from "@/components/search-form";
import Stats from "@/components/stats";

export default function DashboardPage() {
    return (
        <main>
            <div className='flex items-center justify-between text-white py-8 h-full w-full'>
                <Branding />
                <Stats
                    value={2}
                    label='Current guests'
                />
            </div>
            <div className='grid grid-cols-3 grid-rows-[45px_1fr] gap-4 h-[600px]'>
                <div className='row-start-1 row-end-2 col-start-1 col-end-2'>
                    <SearchFrom />
                </div>
                <div className='row-start-2 row-span-1 col-start-1 col-span-1'>
                    <ContentBlock>
                        <PetList />
                    </ContentBlock>
                </div>

                <div className='row-start-1 row-span-2 col-start-2 col-span-2'>
                    <ContentBlock>
                        <PetDetails />
                    </ContentBlock>
                </div>
            </div>
        </main>
    );
}
