import { PetContext, PetContextValue } from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";
import { useContext } from "react";

export default function usePetContext(): PetContextValue {
    const petContext = useContext(PetContext);
    if (petContext) {
        return petContext;
    } else {
        throw new Error("component should be wrapped in a context provider");
    }
}
