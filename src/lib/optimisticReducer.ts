import { Pet } from "@prisma/client";
import { PetFormData } from "./types";

type OptimisticAction<P> = {
    type: "add" | "edit" | "delete";
    payload: P;
};

type OptimisticActionCreator<P> = (payload: P) => OptimisticAction<P>;

export const addPetAction: OptimisticActionCreator<PetFormData> = (pet) => {
    return {
        type: "add",
        payload: {
            id: Date.now().toString(),
            ...pet,
        },
    };
};

export const editPetAction: OptimisticActionCreator<Pet> = (pet) => {
    return {
        type: "edit",
        payload: pet,
    };
};

export const deletePetAction: OptimisticActionCreator<string> = (petId) => {
    return {
        type: "edit",
        payload: petId,
    };
};

export const optimisticReducer: (state: Pet[], action: OptimisticAction<any>) => Pet[] = (state, action) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "edit":
            return state.map((pet) => {
                if (pet.id === action.payload.id) {
                    return action.payload;
                }
                return pet;
            });
        case "delete":
            return state.filter((pet) => pet.id !== action.payload.petId);
        default:
            return state;
    }
};
