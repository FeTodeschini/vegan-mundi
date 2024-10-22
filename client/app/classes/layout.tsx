import DarkBackground from "@/_components/DarkBackground"
import { ChildrenProps } from "@/_types/global"

export default function Page({ children }: ChildrenProps) {
    return (
        <>
            <DarkBackground />
            { children }
        </>
    )
}