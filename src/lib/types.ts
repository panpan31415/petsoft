import { Pet } from "@prisma/client";
import { z } from "zod";
import { authFormSchema } from "./validation";

export type PetFormData = Omit<Pet, "id" | "createdAt" | "updatedAt" | "userId">;

export type AuthFormData = z.infer<typeof authFormSchema>;

export type FormState =
    | {
          errors?: {
              name?: string[];
              email?: string[];
              password?: string[];
          };
          message?: string;
      }
    | undefined;
