type StatsProps = {
    value: number;
    label: string;
};
export default function Stats({ value, label }: StatsProps) {
    return (
        <section className='text-center'>
            <p className='text-2xl font-bold leading-6'>{value}</p>
            <p className='opacity-80'>{label}</p>
        </section>
    );
}
