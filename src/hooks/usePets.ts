import { PetContext } from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";
import { useContext } from "react";

export default function usePets(): [Pet[], (pets: Pet[]) => void] {
    const petContext = useContext(PetContext);
    if (petContext) {
        return [petContext.pets, petContext.setPets];
    } else {
        throw new Error("component should be wrapped in a context provider");
    }
}
