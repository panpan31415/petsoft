import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function AddPetButton() {
    return (
        <Button
            className='absolute right-4 bottom-4 rounded-full w-12 h-12'
            size={"icon"}>
            <PlusIcon className='w-6 h-6' />
        </Button>
    );
}
