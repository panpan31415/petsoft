import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import AddPetForm from "./add-pet-form";

export default function AddPetButton() {
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button
                    className='absolute right-4 bottom-4 rounded-full w-12 h-12'
                    size={"icon"}>
                    <PlusIcon className='w-6 h-6' />
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add a new pet</DialogTitle>
                </DialogHeader>
                <AddPetForm />
            </DialogContent>
        </Dialog>
    );
}
