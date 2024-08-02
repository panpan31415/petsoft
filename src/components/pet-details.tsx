"use client";
import usePetContext from "@/hooks/usePetContext";
import usePets from "@/hooks/usePets";
import useSelectedPetId from "@/hooks/useSelectedPetId";
import Image from "next/image";
import EditPetButton from "./edit-pet-button";
import CheckoutPetButton from "./checkout-pet-button";

export default function PetDetails() {
    const petContext = usePetContext();
    return petContext?.selectedPet ? (
        <section className='h-full w-full flex flex-col'>
            <TopBar
                imageUrl={petContext.selectedPet.imageUrl}
                petName={petContext.selectedPet.name}
            />
            <OtherInfo
                ownerName={petContext.selectedPet.ownerName}
                petAge={petContext.selectedPet.age}
            />
            <PetNotes notes={petContext.selectedPet.notes} />
        </section>
    ) : (
        <EmptyPetView />
    );
}

type TopBarProps = {
    imageUrl: string;
    petName: string;
};
function TopBar({ imageUrl, petName }: TopBarProps) {
    return (
        <section className='flex items-center bg-white px-8 py-5 border-b border-light'>
            <Image
                src={imageUrl}
                alt={"Selected Pet Image"}
                width={75}
                height={75}
                className={" rounded-full w-[75px] h-[75px] object-cover"}
            />
            <h2 className='font-semibold leading-7 text-3xl ml-5'>{petName}</h2>
            <div className='ml-auto space-x-2'>
                <EditPetButton />
                <CheckoutPetButton />
            </div>
        </section>
    );
}
type OtherInfoProps = {
    ownerName: string;
    petAge: number;
};
function OtherInfo({ ownerName, petAge }: OtherInfoProps) {
    return (
        <div className='flex justify-around py-10 px-5 text-center '>
            <div>
                <div>
                    <h3 className='text-[13px] font-medium uppercase text-zin-600'>Owner name</h3>
                    <p className='mt-1 text-lg text-zinc-800'>{ownerName}</p>
                </div>
            </div>
            <div>
                <div>
                    <h3 className='text-[13px] font-medium uppercase text-zin-600'>Age</h3>
                    <p className='mt-1 text-lg text-zinc-800'>{petAge}</p>
                </div>
            </div>
        </div>
    );
}

function PetNotes({ notes }: { notes: string }) {
    return <section className='flex-1 bg-white px-7 pt-5 rounded-md mb-9 mx-8 border border-light'>{notes}</section>;
}

function EmptyPetView() {
    return (
        <div className='flex h-full justify-center place-items-center'>
            <p className='text-2xl font-medium'>No pet selected</p>
        </div>
    );
}
