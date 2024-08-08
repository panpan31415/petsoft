"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { PetFormData } from "@/lib/types";
import { Pet } from "@prisma/client";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { petFormSchema } from "@/lib/validation";
export async function addPet(pet: PetFormData) {
    let response = {
        ok: false,
        message: "",
    };
    const validatedPet = petFormSchema.safeParse(pet);
    if (!validatedPet.success) {
        return {
            ok: false,
            message: "Invalid pet data",
            error: validatedPet.error,
        };
    }
    await sleep(2000);

    try {
        await prisma.pet.create({
            data: {
                name: validatedPet.data.name,
                ownerName: validatedPet.data.ownerName,
                age: validatedPet.data.age,
                imageUrl: validatedPet.data.imageUrl,
                notes: validatedPet.data.notes,
            },
        });
        response = {
            ok: true,
            message: "Add pet successfully",
        };
    } catch (error) {
        response = {
            ok: false,
            message: "Could not add pet",
        };
    } finally {
        revalidatePath("/app", "layout");
        return response;
    }
}

export async function editPet(newPet: PetFormData & { id: Pet["id"] }) {
    let response = {
        ok: false,
        message: "",
    };
    const validatedPet = petFormSchema.safeParse(newPet);
    if (!validatedPet.success) {
        return {
            ok: false,
            message: "Invalid pet data",
            error: validatedPet.error,
        };
    }
    await sleep(2000);

    try {
        await prisma.pet.update({
            where: {
                id: newPet.id,
            },
            data: {
                name: validatedPet.data.name,
                ownerName: validatedPet.data.ownerName,
                age: validatedPet.data.age,
                imageUrl: validatedPet.data.imageUrl,
                notes: validatedPet.data.notes,
            },
        });
        response = {
            ok: true,
            message: "update pet successfully",
        };
    } catch (error) {
        console.log(error);
        response = {
            ok: false,
            message: "Could not update pet",
        };
    } finally {
        revalidatePath("/app", "layout");
        return response;
    }
}

export async function deletePet(id: Pet["id"]) {
    await sleep(2000);
    let response = {
        ok: false,
        message: "",
    };

    try {
        await prisma.pet.delete({
            where: {
                id,
            },
        });
        response = {
            ok: true,
            message: "delete pet successfully",
        };
    } catch (error) {
        response = {
            ok: false,
            message: "Could not delete pet",
        };
    } finally {
        revalidatePath("/app", "layout");
        return response;
    }
}
