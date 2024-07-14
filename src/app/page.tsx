'use client'
import { Footer } from "@/components/footer";
import { AuthContext, AuthProvider } from "@/context/auth-context";
import { KeyRound, User } from "lucide-react";
import Image from "next/image";
import { FormEvent, useContext, useState } from "react";

export default function Home() {

  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoadingContext } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    await login({ email, password })

  }

  return (
    <main className="flex w-full flex-col min-h-screen justify-between items-center bg-white">
      <div className="py-12">
        <h1 className="text-4xl font-bold">App de Requisições</h1>
      </div>
      <div className="flex h-full justify-around items-center w-6/12 gap-4">
        <div>
          <Image
            src="/hero-illustration.svg"
            alt="Imagem de pessoa codando"
            // className="dark:invert"
            width={300}
            height={300}
            priority
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-12">
          <div className="flex border border-black rounded-lg h-12 items-center gap-2 px-2">
            <label htmlFor="email"><User /></label>
            <input required type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="E-mail" className="h-full w-48 bg-transparent outline-none" />
          </div>
          <div className="flex border border-black rounded-lg h-12 items-center gap-2 pl-2">
            <label htmlFor="password"><KeyRound /></label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              placeholder="Senha"
              className="h-full bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm px-2 text-red-500">{error}</p>}
          <label className="flex gap-2 items-center px-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              name="showPassword"
              id="showPassword"
              className="size-4 rounded-lg"
            />
            Mostrar senha
          </label>
          <button
            type="submit"
            disabled={isLoadingContext}
            className="w-full flex items-center justify-center h-12 rounded-lg bg-sky-600 font-semibold text-white hover:bg-sky-700"
          >
            {isLoadingContext ? "Logging in..." : "Entrar"}
          </button>
        </form>
      </div>
      <Footer />
    </main>
  )
}
