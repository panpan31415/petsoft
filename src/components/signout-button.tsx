"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOutAction } from "@/actions";

export default function SignOutButton() {
    return (
        <Button
            onClick={() => signOutAction()}
            className='mt-10'>
            Sign out
        </Button>
    );
}
