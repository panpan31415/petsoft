import { PetContext } from "@/contexts/pet-context-provider";
import { useContext } from "react";

export default function useSelectedPetId() {
    const petContext = useContext(PetContext);
    if (petContext) {
        return [petContext.selectedPetId, petContext.setSelectedPetId];
    } else {
        throw new Error("component should be wrapped in a context provider");
    }
}
