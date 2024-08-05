"use client";
import usePetContext from "@/hooks/usePetContext";
import PetListItem from "./pet-list-item";

export default function PetList() {
    const petContext = usePetContext();
    if (petContext) {
        const pets = petContext.pets;
        const searchText = petContext.searchText || "";
        const filteredPets = pets.filter((pet) => pet.name.toLowerCase().includes(searchText.toLowerCase()));
        return (
            <ul className='bg-white border-b border-light'>
                {filteredPets.map((pet) => (
                    <PetListItem
                        key={pet.id}
                        pet={pet}
                    />
                ))}
            </ul>
        );
    }
    return null;
}
