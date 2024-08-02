import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import EditPetForm from "./edit-pet-form";

export default function EditPetButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"secondary"}
                    className='rounded-full bg-zinc-200  hover:bg-zinc-300'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit pet</DialogTitle>
                </DialogHeader>
                <EditPetForm />
            </DialogContent>
        </Dialog>
    );
}
