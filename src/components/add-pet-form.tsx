"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import usePetContext from "@/hooks/usePetContext";
import SubmitFromButton from "./submit-button";
import { PetFormData } from "@/lib/types";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { flushSync } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/validation";

export default function AddPetForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const petContext = usePetContext();
    const {
        register,
        formState: { errors },
        trigger,
        getValues,
    } = useForm<PetFormData>({ resolver: zodResolver(petFormSchema) });

    const formActionHandler = async () => {
        const result = await trigger();
        if (!result) {
            return;
        }
        flushSync(() => setOpen(false));
        if (petContext) {
            const pet = getValues();
            petContext.addPet({
                ...pet,
                imageUrl: pet.imageUrl || DEFAULT_PET_IMAGE,
            });
        }
    };

    return (
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
                        placeholder='Your pet name'
                        className='col-span-full'
                        {...register("name")}
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
                        className='col-span-full'
                        defaultValue=''
                        placeholder='owner name'
                        type='text'
                        {...register("ownerName")}
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
                        id='pet-image-url'
                        className='col-span-full'
                        defaultValue=''
                        placeholder='pet image'
                        type='text'
                        {...register("imageUrl")}
                    />
                    {errors.imageUrl && <p className='text-red-500 col-span-full'>{errors.imageUrl.message}</p>}
                </div>
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
                        {...register("age")}
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
                        placeholder='Add your pet notes here.'
                        className='col-span-full'
                        {...register("notes")}
                    />
                    {errors.notes && <p className='text-red-500 col-span-full'>{errors.notes.message}</p>}
                </div>
            </div>
            <DialogFooter>
                <SubmitFromButton>Add a new pet</SubmitFromButton>
            </DialogFooter>
        </form>
    );
}
