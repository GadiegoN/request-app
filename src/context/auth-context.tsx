'use client'

import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface UserProps {
    email: string
    token: string
}

interface LoginProps {
    email: string
    password: string
}

export type AuthContextProps = {
    user: UserProps | null
    login: ({ email, password }: LoginProps) => Promise<void>
    logout: () => void
    isLoadingContext: boolean
}

const queryClient = new QueryClient()

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<UserProps | null>(null)
    const [isLoadingContext, setIsLoadingContext] = useState(true)

    useEffect(() => {
        const loadUserFromStorage = () => {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
            setIsLoadingContext(false)
        }
        loadUserFromStorage()
    }, [])

    async function login({ email, password }: LoginProps) {
        try {

            setIsLoadingContext(true)

            const response = await api.post('/token/',
                { email, password }
            )

            const { access } = response.data
            const user = { email, token: access }
            console.log(access)
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
            router.push('/dashboard/shopping')

        } catch (error) {
            console.error('Login Falhou:', error)
        } finally {
            setIsLoadingContext(false)
        }
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/login')
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ user, login, logout, isLoadingContext }}>
                {children}
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}