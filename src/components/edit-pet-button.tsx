import React from "react";
import { Button } from "./ui/button";

export default function EditPetButton() {
    return (
        <Button
            variant={"secondary"}
            className='rounded-full bg-zinc-200  hover:bg-zinc-300'>
            Edit
        </Button>
    );
}
