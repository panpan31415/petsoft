import AddPetButton from "@/components/add-pet-button";
import Branding from "@/components/branding";
import ContentBlock from "@/components/content-bock";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchFrom from "@/components/search-form";
import Stats from "@/components/stats";

export default async function DashboardPage() {
    return (
        <main>
            <div className='flex items-center justify-between text-white py-8 h-full w-full'>
                <Branding />
                <Stats />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]'>
                <div className='md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2'>
                    <SearchFrom />
                </div>
                <div className='md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1'>
                    <ContentBlock className='relative'>
                        <PetList />
                        <AddPetButton />
                    </ContentBlock>
                </div>

                <div className='md:row-start-1 md:row-span-2 md:col-start-2 md:col-span-2'>
                    <ContentBlock>
                        <PetDetails />
                    </ContentBlock>
                </div>
            </div>
        </main>
    );
}
