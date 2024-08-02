"use client";
import usePetContext from "@/hooks/usePetContext";

export default function SearchFrom() {
    const petContext = usePetContext();

    return (
        <form className='w-full h-full bg-transparent'>
            <input
                className='w-full h-full bg-white/20 rounded-md px-5 outline-none focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50'
                placeholder='search pets'
                type='search'
                onChange={(event) => petContext?.setSearchText(event.target.value)}
            />
        </form>
    );
}
