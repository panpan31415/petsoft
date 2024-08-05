"use client";
import { addPet } from "@/actions";
import { Pet } from "@prisma/client";
import React, { createContext, ReactNode, useMemo, useState } from "react";

export type PetContextValue = {
    pets: Pet[];
    numberOfPets: number;
    selectedPetId: string;
    selectedPet: Pet | undefined;
    setSelectedPetId: (petId: string) => void;
    searchText: string;
    setSearchText: (text: string) => void;
} | null;

export const PetContext = createContext<PetContextValue>(null);

type PetContextProviderProps = {
    children: ReactNode;
    pets: Pet[];
};
export default function PetContextProvider({ children, pets }: PetContextProviderProps) {
    const [selectedPetId, setSelectedPetId] = useState("");
    const [searchText, setSearchText] = useState("");

    const numberOfPets = pets.length;
    const selectedPet = useMemo(() => {
        return pets.find((pet) => pet.id === selectedPetId);
    }, [selectedPetId, pets]);

    return (
        <PetContext.Provider
            value={{
                pets,
                selectedPetId,
                setSelectedPetId,
                selectedPet,
                numberOfPets,
                searchText,
                setSearchText,
            }}>
            {children}
        </PetContext.Provider>
    );
}
