"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import usePetContext from "@/hooks/usePetContext";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { Pet } from "@prisma/client";
import { flushSync } from "react-dom";

export default function EditPetForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const petContext = usePetContext();
    const selectedPetId = petContext?.selectedPetId;
    const pets = petContext?.pets;
    const selectedPet: Pet | undefined = pets?.find((pet) => pet.id === selectedPetId);
    const [editedPet, setEditedPet] = useState(selectedPet);
    const formActionHandler = async () => {
        if (selectedPetId && petContext && selectedPet && editedPet) {
            flushSync(() => setOpen(false));
            flushSync(() => petContext.editPet(editedPet));
        }
    };
    return (
        editedPet && (
            <form action={formActionHandler}>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-3'>
                        <Label
                            htmlFor='pet-name'
                            className='text-left col-span-full'>
                            Name
                        </Label>
                        <Input
                            name={"name"}
                            id='pet-name'
                            defaultValue=''
                            placeholder='Your pet name'
                            className='col-span-full'
                            value={editedPet?.name || ""}
                            required
                            onChange={(event) => {
                                editedPet && setEditedPet({ ...editedPet, name: event.target.value });
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='owner-name'
                            className='text-left col-span-full'>
                            Owner Name
                        </Label>
                        <Input
                            name={"ownerName"}
                            id='owner-name'
                            defaultValue=''
                            placeholder='owner name'
                            className='col-span-full'
                            value={editedPet.ownerName}
                            required
                            onChange={(event) => {
                                editedPet && setEditedPet({ ...editedPet, ownerName: event.target.value });
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='pet-image-url'
                            className='text-left col-span-full'>
                            Image Url
                        </Label>
                        <Input
                            name='imageUrl'
                            id='pet-image-url'
                            defaultValue=''
                            placeholder='pet image URL'
                            className='col-span-full'
                            value={editedPet?.imageUrl || ""}
                            onChange={(event) => {
                                editedPet &&
                                    setEditedPet({
                                        ...editedPet,
                                        imageUrl: event.target.value || DEFAULT_PET_IMAGE,
                                    });
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='pet-age'
                            className='text-left col-span-full'>
                            Pet Age
                        </Label>
                        <Input
                            name='age'
                            id='pet-age'
                            defaultValue={0}
                            placeholder='pet age'
                            className='col-span-full'
                            type='number'
                            value={editedPet?.age || 0}
                            onChange={(event) => {
                                editedPet && setEditedPet({ ...editedPet, age: Number(event.target.value) });
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='pet-notes'
                            className='text-left col-span-full'>
                            Notes
                        </Label>
                        <Textarea
                            name={"notes"}
                            id='pet-notes'
                            defaultValue=''
                            placeholder='Add some pet notes here.'
                            className='col-span-full'
                            value={editedPet?.notes || ""}
                            onChange={(event) => {
                                editedPet && setEditedPet({ ...editedPet, notes: event.target.value });
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type='submit'
                        className='rounded-full'>
                        Save Pet
                    </Button>
                </DialogFooter>
            </form>
        )
    );
}
