"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import usePetContext from "@/hooks/usePetContext";
import SubmitFromButton from "./submit-button";

export default function AddPetForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const petContest = usePetContext();
    const addPetAction = async (formData: FormData) => {
        if (petContest) {
            await petContest.addPet(formData);
        }
        setOpen(false);
    };

    return (
        <form action={addPetAction}>
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
                        required
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
                        required
                    />
                </div>
                <div className='grid grid-cols-4 items-center gap-2'>
                    <Label
                        htmlFor='pet-image-url'
                        className='text-left col-span-full'>
                        Image Url
                    </Label>
                    <Input
                        name={"imageUrl"}
                        id='pet-image-url'
                        defaultValue=''
                        placeholder='pet image URL'
                        className='col-span-full'
                    />
                </div>
                <div className='grid grid-cols-4 items-center gap-2'>
                    <Label
                        htmlFor='pet-age'
                        className='text-left col-span-full'>
                        Pet Age
                    </Label>
                    <Input
                        name={"age"}
                        id='pet-age'
                        defaultValue={0}
                        placeholder='pet age'
                        className='col-span-full'
                        type='number'
                        required
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
                    />
                </div>
            </div>
            <DialogFooter>
                <SubmitFromButton>Add a new pet</SubmitFromButton>
            </DialogFooter>
        </form>
    );
}
