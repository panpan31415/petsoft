import Image from "next/image";
import Link from "next/link";
import logoImg from "../assets/images/logo.svg";

export default function Logo() {
    return (
        <Link href={"/"}>
            <Image
                src={logoImg}
                alt='PetSoft Logo'
            />
        </Link>
    );
}
