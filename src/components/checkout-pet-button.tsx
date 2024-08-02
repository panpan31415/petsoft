import { Button } from "./ui/button";
import usePetContext from "@/hooks/usePetContext";

export default function CheckoutPetButton() {
    const petContext = usePetContext();
    const selectedPetId = petContext?.selectedPetId;
    const deletePet = petContext?.deletePet;
    const onClickHandler = () => {
        if (selectedPetId && deletePet) {
            deletePet(selectedPetId);
            petContext.setSelectedPetId("");
        }
    };
    return (
        <Button
            onClick={onClickHandler}
            variant={"secondary"}
            className='rounded-full bg-zinc-200 hover:bg-zinc-300'>
            Checkout
        </Button>
    );
}
