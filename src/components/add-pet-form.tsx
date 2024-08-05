"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import usePetContext from "@/hooks/usePetContext";
import SubmitFromButton from "./submit-button";
import { addPet } from "@/actions";
import { toast } from "sonner";
import { PetFormData } from "@/lib/types";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";

export default function AddPetForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const petContext = usePetContext();
    const formActionHandler = async (formData: FormData) => {
        if (petContext) {
            const pet: PetFormData = {
                name: formData.get("name") as string,
                ownerName: formData.get("ownerName") as string,
                age: parseInt(formData.get("age") as string),
                imageUrl: (formData.get("imageUrl") as string) || DEFAULT_PET_IMAGE,
                notes: formData.get("notes") as string,
            };
            const response = await addPet(pet);
            response.ok
                ? toast.success(response.message, { position: "top-center" })
                : toast.warning(response.message, { position: "top-center" });
        }
        setOpen(false);
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
