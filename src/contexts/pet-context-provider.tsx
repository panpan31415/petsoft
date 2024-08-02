"use client";
import { Pet } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type PetContextValue = {
    pets: Pet[];
    numberOfPets: number;
    selectedPetId: string;
    selectedPet: Pet | undefined;
    setPets: (pets: Pet[]) => void;
    setSelectedPetId: (petId: string) => void;
    searchText: string;
    setSearchText: (text: string) => void;
} | null;

export const PetContext = createContext<PetContextValue>(null);

type PetContextProviderProps = {
    children: ReactNode;
    data: Pet[];
};
export default function PetContextProvider({ children, data }: PetContextProviderProps) {
    const [pets, setPets] = useState<Pet[]>(data);
    const [selectedPetId, setSelectedPetId] = useState("");
    const [searchText, setSearchText] = useState("");
    const selectedPet = useMemo(() => pets.find((pet) => pet.id === selectedPetId), [selectedPetId, pets]);
    const numberOfPets = pets.length;
    return (
        <PetContext.Provider
            value={{
                pets,
                setPets,
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
