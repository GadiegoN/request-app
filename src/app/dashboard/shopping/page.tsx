'use client'
import { AuthContext } from '@/context/auth-context'

import { LogOut } from 'lucide-react'
import { useContext, useState } from 'react'
import { Table } from './table'
import { Modal } from './modal'

export default function Page() {
    const { logout, user } = useContext(AuthContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requests, setRequests] = useState<any[]>([]);

    function handleOpenModal() {
        setModalIsOpen(true);
    };

    function handleCloseModal() {
        setModalIsOpen(false);
    };

    function handleSaveRequest(data: any) {
        setRequests([...requests, data]);
    };

    function closeRequestModal() {
        setModalIsOpen(false);
    };

    return (
        <div className="p-8 max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <h2 className="text-2xl font-bold select-none">Olá, {user?.email}</h2>
                    <button onClick={logout} className='flex items-center gap-2 border text-sky-900 border-sky-700 p-2 hover:bg-gray-300 rounded-lg'>
                        <LogOut className="size-5" />
                        Sair
                    </button>
                </div>
                <button onClick={handleOpenModal} className="flex items-center justify-center h-12 rounded-lg bg-sky-600 font-semibold text-white hover:bg-sky-700 px-4">
                    Nova Requisição
                </button>
            </div>
            <div className='p-2 px-10 w-11/12 overflow-x-scroll'>
                <Table />
            </div>

            {modalIsOpen && (
                <Modal
                    closeRequestModal={closeRequestModal}
                    onRequestClose={handleCloseModal}
                    onSave={handleSaveRequest}
                />
            )}
        </div>
    )
}

