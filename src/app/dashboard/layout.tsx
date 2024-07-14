'use client'
import { ReactNode, useState } from "react";
import { Hammer, Menu, ShoppingBag, Truck, Wrench } from "lucide-react";
import PrivateRoute from "@/components/private-route";
import { AuthProvider } from "@/context/auth-context";
import { Footer } from "@/components/footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isOpenAside, setIsOpenAside] = useState(true)

    return (
        <AuthProvider>
            <PrivateRoute>
                <section className="flex flex-col min-h-screen overflow-hidden">
                    <main className="flex">
                        <div className={isOpenAside ? "w-60 space-y-4 p-4 bg-sky-700 min-h-screen" : "w-20 flex flex-col items-center space-y-4 p-4 bg-sky-700 min-h-screen"}>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsOpenAside(!isOpenAside)}
                                    className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md h-12 px-4">
                                    <Menu />
                                </button>
                            </div>
                            <button className="min-w-full flex items-center bg-gray-200 hover:bg-gray-300 rounded-md h-12 px-4 gap-2">
                                <ShoppingBag className="size-6" />
                                {isOpenAside && <p className="font-semibold text-sm">Compras</p>}
                            </button>
                            <button className="min-w-full flex items-center bg-gray-200 hover:bg-gray-300 rounded-md h-12 px-4 gap-2">
                                <Wrench />
                                {isOpenAside && <p className="font-semibold text-sm">Serviços</p>}
                            </button>
                            <button className="min-w-full flex items-center bg-gray-200 hover:bg-gray-300 rounded-md h-12 px-4 gap-2">
                                <Truck />
                                {isOpenAside && <p className="font-semibold text-sm">Fretes</p>}
                            </button>
                            <button className="min-w-full flex items-center bg-gray-200 hover:bg-gray-300 rounded-md h-12 px-4 gap-2">
                                <Hammer />
                                {isOpenAside && <p className="font-semibold text-sm truncate">Manutenção interna</p>}
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="h-16 bg-sky-700 flex justify-between items-center px-4">
                                <h1 className="text-white font-semibold text-xl">Requisições de compras</h1>
                                <img src="https://www.github.com/gadiegon.png" alt="avatar do usuario" className="size-10 rounded-full" />
                            </div>
                            <div className="flex-1 p-8">
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </main>
                </section>
            </PrivateRoute>
        </AuthProvider>
    )
}