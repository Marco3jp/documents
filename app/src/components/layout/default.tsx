import {ThemeToggler} from "@/components/ThemeToggler";

export default function Default({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <ThemeToggler />
        </>
    )
}
