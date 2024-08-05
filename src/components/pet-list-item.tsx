import useSelectedPetId from "@/hooks/useSelectedPetId";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PetListItemProps = {
    pet: Pet;
};
export default function PetListItem({ pet }: PetListItemProps) {
    const [selectedPetId, setSelectedPetId] = useSelectedPetId();
    return (
        <li>
            <button
                onClick={() => setSelectedPetId(pet.id)}
                className={cn(
                    "h-[70px] w-full cursor-pointer flex items-center gap-3 px-5 text-base hover:bg-primary/20 focus:bg-primary/20 transition",
                    {
                        "bg-primary/20": selectedPetId === pet.id,
                    },
                )}>
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
