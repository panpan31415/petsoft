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
import { useForm } from "react-hook-form";
import { PetFormData } from "@/lib/types";

export default function EditPetForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const petContext = usePetContext();
    const selectedPetId = petContext?.selectedPetId;
    const pets = petContext?.pets;
    const selectedPet: Pet | undefined = pets?.find((pet) => pet.id === selectedPetId);
    const {
        register,
        trigger,
        formState: { errors },
    } = useForm<PetFormData>();
    const formActionHandler = async (formData: FormData) => {
        const result = await trigger();
        if (!result) {
            return;
        }
        flushSync(() => setOpen(false));
        if (selectedPetId && petContext && selectedPet) {
            petContext.editPet({
                ...selectedPet,
                name: formData.get("name") as string,
                age: parseInt(formData.get("age") as string),
                imageUrl: formData.get("imageUrl") ? (formData.get("imageUrl") as string) : DEFAULT_PET_IMAGE,
                ownerName: formData.get("ownerName") as string,
                notes: formData.get("notes") as string,
            });
        }
    };

    return (
        selectedPet && (
            <form action={formActionHandler}>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-3'>
                        <Label
                            htmlFor='pet-name'
                            className='text-left col-span-full'>
                            Name
                        </Label>
                        <Input
                            id='pet-name'
                            defaultValue=''
                            placeholder='Your pet name'
                            className='col-span-full'
                            {...register("name", {
                                required: "please give pet a name",
                            })}
                        />
                        {errors.name && <p className='text-red-500 col-span-full'>{errors.name.message}</p>}
                    </div>
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='owner-name'
                            className='text-left col-span-full'>
                            Owner Name
                        </Label>
                        <Input
                            id='owner-name'
                            defaultValue=''
                            placeholder='owner name'
                            className='col-span-full'
                            {...register("ownerName", {
                                required: "please type owner name",
                            })}
                        />
                        {errors.ownerName && <p className='text-red-500 col-span-full'>{errors.ownerName.message}</p>}
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
                        />
                    </div>
                    {errors.imageUrl && <p className='text-red-500 col-span-full'>{errors.imageUrl.message}</p>}
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='pet-age'
                            className='text-left col-span-full'>
                            Pet Age
                        </Label>
                        <Input
                            id='pet-age'
                            defaultValue={0}
                            placeholder='pet age'
                            className='col-span-full'
                            type='number'
                            {...register("age", {
                                required: "please type pet age",
                            })}
                        />
                        {errors.age && <p className='text-red-500 col-span-full'>{errors.age.message}</p>}
                    </div>
                    <div className='grid grid-cols-4 items-center gap-2'>
                        <Label
                            htmlFor='pet-notes'
                            className='text-left col-span-full'>
                            Notes
                        </Label>
                        <Textarea
                            id='pet-notes'
                            defaultValue=''
                            placeholder='Add some pet notes here.'
                            className='col-span-full'
                            {...register("notes", {
                                required: "please leave some notes to your pet",
                            })}
                        />
                        {errors.notes && <p className='text-red-500 col-span-full'>{errors.notes.message}</p>}
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
