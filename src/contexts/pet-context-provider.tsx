"use client";
import { addPet, deletePet, editPet } from "@/actions";
import { addPetAction, deletePetAction, editPetAction, optimisticReducer } from "@/lib/optimisticReducer";
import { PetFormData } from "@/lib/types";
import { Pet } from "@prisma/client";
import React, { createContext, ReactNode, useMemo, useOptimistic, useState } from "react";
import { toast } from "sonner";

export type PetContextValue = {
    pets: Pet[];
    numberOfPets: number;
    selectedPetId: Pet["id"];
    selectedPet: Pet | undefined;
    setSelectedPetId: (petId: Pet["id"]) => void;
    searchText: string;
    setSearchText: (text: string) => void;
    addPet: (pet: PetFormData) => Promise<void>;
    editPet: (pet: Pet) => Promise<void>;
    deletePet: (petId: Pet["id"]) => Promise<void>;
} | null;

export const PetContext = createContext<PetContextValue>(null);

type PetContextProviderProps = {
    children: ReactNode;
    pets: Pet[];
};

export default function PetContextProvider({ children, pets }: PetContextProviderProps) {
    const [optimisticPets, setOptimisticPets] = useOptimistic(pets, optimisticReducer);
    const [selectedPetId, setSelectedPetId] = useState("");
    const [searchText, setSearchText] = useState("");

    const numberOfPets = optimisticPets.length;
    const selectedPet = useMemo(() => {
        return optimisticPets.find((pet) => pet.id === selectedPetId);
    }, [selectedPetId, optimisticPets]);

    const addPetHandler = async (pet: PetFormData) => {
        setOptimisticPets(addPetAction(pet));
        const response = await addPet(pet);
        if (!response.ok) {
            toast.warning(response.message, { position: "top-center" });
        }
    };

    const editPetHandler = async (pet: Pet) => {
        setOptimisticPets(editPetAction(pet));
        const response = await editPet(pet);
        if (!response.ok) {
            toast.warning(response.message, { position: "top-center" });
        }
    };

    const deletePetHandler = async (petId: Pet["id"]) => {
        setOptimisticPets(deletePetAction(petId));
        const response = await deletePet(petId);
        if (!response.ok) {
            toast.warning(response.message, { position: "top-center" });
        }
    };

    return (
        <PetContext.Provider
            value={{
                pets: optimisticPets,
                selectedPetId,
                setSelectedPetId,
                selectedPet,
                numberOfPets,
                searchText,
                setSearchText,
                addPet: addPetHandler,
                editPet: editPetHandler,
                deletePet: deletePetHandler,
            }}>
            {children}
        </PetContext.Provider>
    );
}
