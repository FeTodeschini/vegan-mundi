import DarkBackground from "@/_components/DarkBackground"
import { ChildrenProps } from "@/_types/global"

export default function Layout({ children }: ChildrenProps) {
    return (
        <>
            <DarkBackground />
            { children }
        </>
    )
}