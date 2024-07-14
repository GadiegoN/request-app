export function Footer() {
    return (
        <div className="w-full h-24 flex flex-col items-center justify-center bg-gray-200">
            <span>Desenvolvido por <a target="_blank" href="https://gadiego.com.br/" className="font-semibold">Gadiego Noguiera</a> com 💙 <b>Versão:</b> teste.01</span>
            <div className="flex gap-2 items-center">
                <a href="#">Suporte</a>
                <div className="h-4 w-[2px] bg-black" />
                <a href="#">Manual</a>
            </div>
        </div>
    )
}