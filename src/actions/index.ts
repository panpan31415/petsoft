"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { FormState, PetFormData } from "@/lib/types";
import { Pet } from "@prisma/client";
import { authFormSchema, petFormSchema, petIdSchema } from "@/lib/validation";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { checkSession } from "@/lib/server-utils";
export async function addPet(pet: PetFormData) {
    const session = await checkSession();

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
                    connect: { id: session?.user?.id },
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
    const session = await checkSession();

    const pet = await prisma.pet.findUnique({
        where: {
            id: newPet.id,
        },
    });

    if (!pet) {
        return {
            ok: false,
            message: "no pet found",
        };
    }

    if (pet.userId !== session.user?.id) {
        return {
            ok: false,
            message: "Not authorized",
        };
    }

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

export async function deletePet(id: string) {
    const validatedPetId = await petIdSchema.parseAsync(id);
    const session = await checkSession();
    let response = {
        ok: false,
        message: "",
    };

    const pet = await prisma.pet.findUnique({
        where: {
            id: validatedPetId,
        },
    });

    if (!pet) {
        return {
            ok: false,
            message: "no pet found",
        };
    }

    if (pet.userId !== session?.user?.id) {
        return {
            ok: false,
            message: "Not authorized",
        };
    }

    try {
        await prisma.pet.delete({
            where: {
                id,
                userId: session.user.id,
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

export async function login(state: FormState, formData: FormData) {
    if (!(formData instanceof FormData)) {
        return {
            error: "Invalid form data",
        };
    }

    try {
        await signIn("credentials", formData);
        return {
            message: "sign in succeeded",
        };
    } catch (error) {
        return {
            error,
        };
    }
}

export async function signOutAction() {
    await signOut({
        redirectTo: "/",
    });
}

export async function signUp(state: FormState, formData: FormData) {
    const validatedFrom = await authFormSchema.safeParseAsync(formData);

    if (!validatedFrom.success) {
        return { error: "Invalid form data" };
    }
    const { email, password } = validatedFrom.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });
        return {
            message: "login succeeded",
        };
    } catch (error) {
        return {
            error,
        };
    }
}
