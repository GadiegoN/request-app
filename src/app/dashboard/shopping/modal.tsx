'use client'
import { api } from "@/services/api";
import { request } from "@/services/request";
import { Banknote, Boxes, Calendar, FileQuestion, FileWarning, Trash2, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";

interface RequestModalProps {
    closeRequestModal: () => void;
    onRequestClose: () => void;
    onSuccess: () => void;
}

export function Modal({ closeRequestModal, onRequestClose, onSuccess }: RequestModalProps) {
    const [company, setCompany] = useState('');
    const [department, setDepartment] = useState('');
    const [approver, setApprover] = useState('');
    const [requiredDate, setRequiredDate] = useState('');
    const [internalNote, setInternalNote] = useState('');
    const [externalNote, setExternalNote] = useState('');
    const [product, setProduct] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!company || !department || !approver || !requiredDate || !product || (!unitPrice && !quantity)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        const mutation = useMutation(request, {
            onSuccess: () => {
                onSuccess()
                onRequestClose()
            },
            onError: (error) => {
                alert('Erro ao criar requisiçao' + error)
            }
        })

        function handleSubmit(e: FormEvent) {
            e.preventDefault()

            if (!company || !department || !approver || !requiredDate || !internalNote || !externalNote || !product || (!unitPrice || !quantity)) {
                alert('Todos os campos obrigatórios devem ser preenchidos.');
                return;
            }
        }

        const requestData = {
            company,
            department,
            approver,
            requiredDate,
            product,
            unitPrice,
            quantity,
        };

        mutation.mutate(requestData);
    };

    return (
        <div className="fixed flex flex-col space-y-8 top-2 bottom-2 left-2 right-2 mx-auto bg-gray-200 shadow-xl rounded-lg p-10">
            <div className="w-full flex justify-between">
                <h1 className="font-semibold text-xl">Nova Requisição</h1>
                <button onClick={closeRequestModal}>
                    <X />
                </button>
            </div>
            <div className="">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4">
                        <input className="w-full rounded-lg h-12 outline-none bg-transparent px-4" type="text" placeholder="Empresa" value={company} onChange={(e) => setCompany(e.target.value)} required />
                    </div>
                    <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4">
                        <input className="w-full rounded-lg h-12 outline-none bg-transparent px-4" type="text" placeholder="Departamento" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                    </div>
                    <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4">
                        <input className="w-full rounded-lg h-12 outline-none bg-transparent px-4" type="text" placeholder="Aprovador" value={approver} onChange={(e) => setApprover(e.target.value)} required />
                    </div>
                    <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4">
                        <label htmlFor="dateNec"><Calendar /></label>
                        <input id="dateNec" className="w-full rounded-lg h-12 outline-none bg-transparent px-4" type="date" placeholder="Data de Necessidade" value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} required />
                    </div>
                    <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4">
                        <label><FileQuestion /></label>
                        <input placeholder="Observação Interna:" className="w-full rounded-lg h-12 outline-none bg-transparent px-4" value={internalNote} onChange={(e) => setInternalNote(e.target.value)} />
                    </div>
                    <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4">
                        <label><FileWarning /></label>
                        <input placeholder="Observação Externa:" className="w-full rounded-lg h-12 outline-none bg-transparent px-4" value={externalNote} onChange={(e) => setExternalNote(e.target.value)} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="quotation" id="quotation" />
                        <label htmlFor="quotation" className="text-xs">Precisa de Cotação?</label>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="bg-slate-200 flex items-center border border-black rounded-lg px-4 w-10/12 truncate">
                            <input placeholder="Produto" className="w-full rounded-lg h-12 outline-none bg-transparent px-4" type="text" value={product} onChange={(e) => setProduct(e.target.value)} required />
                        </div>
                        <div className="bg-slate-200 flex items-center border border-black rounded-lg px-2 w-3/12">
                            <Banknote className="" />
                            <input placeholder="Preço Unit." className="rounded-lg h-12 outline-none bg-transparent px-2" type="text" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />
                        </div>
                        <div className="bg-slate-200 flex items-center border border-black rounded-lg px-2 w-3/12">
                            <Boxes />
                            <input placeholder="Quant" className="rounded-lg h-12 outline-none bg-transparent px-2" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                        </div>
                        <button className="bg-red-500 flex items-center rounded-lg px-4 hover:bg-red-600">
                            <Trash2 className="text-white" />
                        </button>
                    </div>
                    <div className="w-full pt-10 flex justify-end gap-4">
                        <button className="bg-red-500 p-4 rounded-lg text-white font-semibold hover:bg-red-600" onClick={onRequestClose}>cancelar</button>
                        <button className="bg-sky-700 p-4 rounded-lg text-white font-semibold hover:bg-sky-600" type="submit">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}