import { Pet } from "@/lib/types";
import Image from "next/image";

type PetListItemProps = {
    pet: Pet;
};
export default function PetListItem({ pet }: PetListItemProps) {
    return (
        <li>
            <button className='h-[70px] w-full cursor-pointer flex items-center gap-3 px-5 text-base hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition'>
                <Image
                    src={pet.imageUrl}
                    alt={pet.name}
                    width={45}
                    height={45}
                    className='rounded-full object-cover w-[45px] h-[45px]'
                />
                <p className='font-semibold'>{pet.name}</p>
            </button>
        </li>
    );
}
