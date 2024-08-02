"use client";
import React, { FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import usePetContext from "@/hooks/usePetContext";
import { Pet } from "@/lib/types";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";

export default function EditPetForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const petContext = usePetContext();
    const selectedPetId = petContext?.selectedPetId;
    const pets = petContext?.pets;
    const selectedPet: Pet | undefined = pets?.find((pet) => pet.id === selectedPetId);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (petContext && selectedPet) {
            petContext.editPet(selectedPet);
        }
        setOpen(false);
    };
    return (
        selectedPet && (
            <form onSubmit={onSubmit}>
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
                            value={selectedPet?.name || ""}
                            required
                            onChange={(event) => {
                                petContext?.editPet({ ...selectedPet, name: event.target.value });
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
                            value={selectedPet.ownerName}
                            required
                            onChange={(event) => {
                                petContext?.editPet({ ...selectedPet, ownerName: event.target.value });
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
                            value={selectedPet?.imageUrl || ""}
                            onChange={(event) => {
                                petContext?.editPet({
                                    ...selectedPet,
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
                            value={selectedPet?.age || 0}
                            onChange={(event) => {
                                petContext?.editPet({ ...selectedPet, age: Number(event.target.value) });
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
                            value={selectedPet?.notes || ""}
                            onChange={(event) => {
                                petContext?.editPet({ ...selectedPet, notes: event.target.value });
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
