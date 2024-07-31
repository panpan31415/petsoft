"use client";
import { Pet } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

type PetContextValue = {
    pets: Pet[];
    selectedPetId: string;
    setPets: (pets: Pet[]) => void;
    setSelectedPetId: (petId: string) => void;
} | null;

export const PetContext = createContext<PetContextValue>(null);

type PetContextProviderProps = {
    children: ReactNode;
    data: Pet[];
};
export default function PetContextProvider({ children, data }: PetContextProviderProps) {
    const [pets, setPets] = useState<Pet[]>(data);
    const [selectedPetId, setSelectedPetId] = useState("");
    return (
        <PetContext.Provider
            value={{
                pets,
                setPets,
                selectedPetId,
                setSelectedPetId,
            }}>
            {children}
        </PetContext.Provider>
    );
}
