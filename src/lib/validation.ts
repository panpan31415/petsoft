import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petFormSchema = z
    .object({
        name: z.string().trim().min(1, { message: "please fill pet name" }),
        ownerName: z.string().trim().min(1, { message: "please fill owner name" }),
        age: z.coerce
            .number({ message: "age should be a number" })
            .int()
            .positive({ message: "age should greater than 0" }),
        imageUrl: z.union([z.literal(""), z.string().trim().url()]),
        notes: z.union([z.literal(""), z.string().trim().max(1000)]),
    })
    .transform((formData) => {
        return {
            ...formData,
            imageUrl: formData.imageUrl || DEFAULT_PET_IMAGE,
        };
    });
