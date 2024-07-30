import Logo from "./logo";
import HeaderNavLink from "./header-nav-link";

const routes = [
    {
        label: "Dashboard",
        path: "/app/dashboard",
    },
    {
        label: "Account",
        path: "/app/account",
    },
];

export default function AppHeader() {
    return (
        <header className='flex justify-between items-center  border-b border-white/10 py-2'>
            <Logo />
            <nav>
                <ul className='flex gap-2 text-xs'>
                    {routes.map((route) => (
                        <li key={route.label}>
                            <HeaderNavLink
                                path={route.path}
                                label={route.label}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
