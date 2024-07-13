'use client'
import { KeyRound, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)

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
        <div className="flex flex-col gap-2 py-12">
          <div className="flex border border-black rounded-lg h-12 items-center gap-2 px-2">
            <label htmlFor="email"><User /></label>
            <input type="text" id="email" placeholder="E-mail" className="h-full w-48 bg-transparent outline-none" />
          </div>
          {/* <p className="text-sm px-2 text-red-500">Erro mensagem</p> */}
          <div className="flex border border-black rounded-lg h-12 items-center gap-2 pl-2">
            <label htmlFor="password"><KeyRound /></label>
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Senha" className="h-full bg-transparent outline-none" />
          </div>
          {/* <p className="text-sm px-2 text-red-500">Erro mensagem</p> */}
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
          <Link
            href="/dashboard/shopping"
            className="w-full flex items-center justify-center h-12 rounded-lg bg-sky-600 font-semibold text-white hover:bg-sky-700"
          >
            Entrar
          </Link>
        </div>
      </div>
      <div className="w-full h-24 flex flex-col items-center justify-center bg-gray-200">
        <p>Desenbolvido por <span className="font-semibold">Gadiego Noguiera</span> com 💙 <b>Versão:</b> teste.01</p>
        <div className="flex gap-2 items-center">
          <a href="#">Suporte</a>
          <div className="h-4 w-[2px] bg-black" />
          <a href="#">Manual</a>
        </div>
      </div>
    </main>
  );
}
