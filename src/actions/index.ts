"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { PetFormData } from "@/lib/types";
import { Pet } from "@prisma/client";
import { petFormSchema } from "@/lib/validation";
import { auth, signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
export async function addPet(pet: PetFormData) {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }
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
                user: {
                    connect: { id: session.user.id },
                },
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

export async function login(formData: FormData) {
    // this signIn will pass authData to credential function in authorize function of auth module
    await signIn("credentials", formData);
}

export async function signOutAction() {
    await signOut({
        redirectTo: "/",
    });
}

export async function signUp(formData: FormData) {
    const email = formData.get("email") as string;
    const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10);
    try {
        await prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });
        await signIn("credentials", formData);
    } catch (error) {
        console.log(error);
    }
}
