import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/auth-context"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoadingContext } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoadingContext && !user) {
            router.push("/")
        }

    }, [user, isLoadingContext, router])

    if (isLoadingContext || !user) {
        return (
            <div className="w-screen h-screen bg-gray-400 flex justify-center items-center">
                <div className="size-12 border-2 border-t-0 rounded-full border-sky-700 animate-spin" />
            </div>
        )
    }

    return <>{children}</>
}