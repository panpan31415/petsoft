"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { PetFormData } from "@/lib/types";
import { Pet } from "@prisma/client";
export async function addPet(pet: PetFormData) {
    await sleep(2000);
    let response = {
        ok: false,
        message: "",
    };
    try {
        await prisma.pet.create({
            data: pet,
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
    await sleep(2000);
    let response = {
        ok: false,
        message: "",
    };
    try {
        await prisma.pet.update({
            where: {
                id: newPet.id,
            },
            data: {
                name: newPet.id,
                ownerName: newPet.ownerName,
                age: newPet.age,
                imageUrl: newPet.imageUrl,
                notes: newPet.notes,
            },
        });
        response = {
            ok: true,
            message: "update pet successfully",
        };
    } catch (error) {
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
