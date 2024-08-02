import React, { ReactNode } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export default function AddPetForm() {
    return (
        <form>
            <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-2'>
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
                    />
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
                    />
                </div>
                <div className='grid grid-cols-4 items-center gap-2'>
                    <Label
                        htmlFor='pet-image-url'
                        className='text-left col-span-full'>
                        Image Url
                    </Label>
                    <Input
                        id='pet-image-url'
                        defaultValue=''
                        placeholder='pet image URL'
                        className='col-span-full'
                    />
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
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type='submit'>Save changes</Button>
            </DialogFooter>
        </form>
    );
}
