"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/validation";
import { AuthFormData, FormState } from "@/lib/types";
import SubmitFromButton from "./submit-button";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

type AuthFormProps = {
    type: "Log In" | "Sign Up";
    action: (
        state: FormState,
        formData: FormData,
    ) => Promise<
        | {
              message: string;
              error?: undefined;
          }
        | {
              error: unknown;
              message?: undefined;
          }
    >;
};
export default function AuthForm({ type, action }: AuthFormProps) {
    const {
        register,
        formState: { errors },
    } = useForm<AuthFormData>({
        resolver: zodResolver(authFormSchema),
    });
    const [state, formAction, pending] = useFormState(action, undefined);
    const router = useRouter();
    if (state?.error) {
        type === "Sign Up" && router.push("/login");
    }

    return (
        <form
            action={formAction}
            className='w-[250px] flex flex-col gap-y-2 mt-5 mb-6'>
            <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    className='border-zinc-400'
                    required
                    autoComplete='username'
                    {...register("email")}
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input
                    id='password'
                    type='password'
                    required
                    autoComplete='current-password'
                    className='border-zinc-400'
                    {...register("password")}
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>
            <div className='mt-4'>
                <SubmitFromButton
                    disabled={pending}
                    className='w-[150px]'>
                    {type}
                </SubmitFromButton>
            </div>
        </form>
    );
}
