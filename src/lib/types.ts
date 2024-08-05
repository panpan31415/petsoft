import { Pet } from "@prisma/client";

export type PetFormData = Omit<Pet, "id" | "createdAt" | "updatedAt">;
