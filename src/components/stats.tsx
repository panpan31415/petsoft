"use client";

import usePetContext from "@/hooks/usePetContext";

export default function Stats() {
    const petContext = usePetContext();

    return (
        <section className='text-center'>
            <p className='text-2xl font-bold leading-6'>{petContext?.numberOfPets || 0}</p>
            <p className='opacity-80'>current guests</p>
        </section>
    );
}
