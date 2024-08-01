"use client";
import PetListItem from "./pet-list-item";
import usePets from "@/hooks/usePets";

export default function PetList() {
    const [pets] = usePets();
    return (
        <ul className='bg-white border-b border-light'>
            {pets.map((pet) => (
                <PetListItem
                    key={pet.id}
                    pet={pet}
                />
            ))}
        </ul>
    );
}
