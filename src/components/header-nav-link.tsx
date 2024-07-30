"use client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderNavLinkProps = {
    path: string;
    label: string;
};
export default function HeaderNavLink({ path, label }: HeaderNavLinkProps) {
    const activePath = usePathname();
    return (
        <Link
            className={cn("text-white/70  rounded-sm px-2 py-1 hover:text-white focus:text-white transition", {
                "bg-black/10 text-white": path === activePath,
                "text-white/70": path !== activePath,
            })}
            href={path}>
            {label}
        </Link>
    );
}
