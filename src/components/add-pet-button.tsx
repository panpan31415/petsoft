"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import AddPetForm from "./add-pet-form";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function AddPetButton() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild={true}>
                <Button
                    className='absolute right-4 bottom-4 rounded-full w-12 h-12'
                    size={"icon"}>
                    <PlusIcon className='w-6 h-6' />
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>Add a new pet</DialogTitle>
                </DialogHeader>
                <SessionProvider>
                    <AddPetForm setOpen={setOpen} />
                </SessionProvider>
            </DialogContent>
        </Dialog>
    );
}
