import { deletePet } from "@/actions";
import usePetContext from "@/hooks/usePetContext";
import SubmitFromButton from "./submit-button";
import { flushSync } from "react-dom";

export default function CheckoutPetButton() {
    const petContext = usePetContext();
    const selectedPetId = petContext?.selectedPetId;
    const onClickHandler = () => {
        if (selectedPetId) {
            petContext.setSelectedPetId("");
            petContext.deletePet(selectedPetId);
        }
    };
    return (
        <form
            action={onClickHandler}
            className='inline-block'>
            <SubmitFromButton
                variant={"secondary"}
                className='rounded-full bg-zinc-200 hover:bg-zinc-300'>
                Checkout
            </SubmitFromButton>
        </form>
    );
}
