import { Pet } from "@/app/lib/types";
import Image from "next/image";
import PetListItem from "./pet-list-item";

type PetListProps = {
    pets: Pet[];
};
export default function PetList({ pets }: PetListProps) {
    return (
        <ul className='bg-white border-b border-black/[0.08]'>
            {pets.map((pet) => (
                <PetListItem
                    key={pet.id}
                    pet={pet}
                />
            ))}
        </ul>
    );
}
