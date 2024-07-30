import Branding from "@/components/branding";
import Stats from "@/components/stats";

export default function DashboardPage() {
    return (
        <main>
            <div className='flex items-center justify-between text-white py-8'>
                <Branding />
                <Stats
                    value={2}
                    label='Current guests'
                />
            </div>
        </main>
    );
}
