'use client'
import { api } from '@/services/api'
import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    RowData,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select'
    }
}

interface DepartmentProps {
    id: string
    name: string
}

interface AproverProps {
    id: string,
    name: string,
    email: string
}

interface ProductDetails {
    id: string;
    code: string;
    un: string;
    description: string;
}

interface Product {
    product: ProductDetails;
    quantity: string;
    price: string;
    status: string;
}


type PurchaseProps = {
    id: string,
    requester: {
        id: string,
        name: string,
        email: string
    },
    approver: AproverProps,
    department: DepartmentProps,
    products: Product[],
    company: string,
    created_at: string,
    request_date: string,
    motive: string,
    obs: string,
    status: string,
    approval_date: string,
    has_quotation: boolean,
    quotation_emails: string,
    quotation_date: string,
    control_number: number
}

export function Table() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [listPurchase, setListPurchase] = useState<PurchaseProps[]>(() => [])

    const columns = useMemo<ColumnDef<PurchaseProps, any>[]>(
        () => [
            {
                accessorFn: row => row.company,
                id: 'company',
                header: 'Empresa',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.department.name,
                id: 'department',
                header: 'Departamento',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.control_number,
                accessorKey: 'control_number',
                header: () => 'Numero de controle',
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorKey: 'created_at',
                header: () => <span>Data</span>,
                meta: {
                    filterVariant: 'text',
                },
            },
            {
                accessorKey: 'request_date',
                header: () => <span>Data de solicitação</span>,
                meta: {
                    filterVariant: 'text',
                },
            },
            {
                accessorKey: 'status',
                header: () => <span>Status</span>,
                meta: {
                    filterVariant: 'select',
                },
            },
            {
                accessorFn: row => row.products[0].price,
                accessorKey: 'products',
                header: () => <span>Preço Total</span>,
                meta: {
                    filterVariant: 'text',
                },
            },
            {
                accessorFn: row => row.obs,
                accessorKey: 'obs',
                header: () => <span>Obsercações</span>,
                meta: {
                    filterVariant: 'text',
                },
            }
        ],
        []
    )

    const [_data, setData] = useState(() => [...listPurchase])
    const table = useReactTable({
        data: listPurchase,
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    async function getPurchases() {
        try {
            const response = await api.get('/purchases/')

            const purchaseParams: PurchaseProps[] = response.data.results
            setListPurchase(purchaseParams)


            console.log(response.data.results[0])
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getPurchases()
    }, [])

    return (
        <>
            <table className="border-collapse">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="h-2" />
        </>
    )
}

function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}

    return filterVariant === 'range' ? (
        <div>
            <div className="flex space-x-2">
                {/* See faceted column filters example for min max values functionality */}
                <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min`}
                    className="w-24 border shadow rounded"
                />
                <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max`}
                    className="w-24 border shadow rounded"
                />
            </div>
            <div className="h-1" />
        </div>
    ) : filterVariant === 'select' ? (
        <select
            onChange={e => column.setFilterValue(e.target.value)}
            value={columnFilterValue?.toString()}
        >
            {/* See faceted column filters example for dynamic select options */}
            <option value="">All</option>
            <option value="Quotation">Cotações</option>
            <option value="Opened">Em Aberto</option>
            <option value="Approved">Aprovadas</option>
            <option value="Denied">Recusadas</option>
            <option value="Canceled">Canceladas</option>

        </select>
    ) : (
        <DebouncedInput
            className="w-36 border shadow rounded"
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search...`}
            type="text"
            value={(columnFilterValue ?? '') as string}
        />
        // See faceted column filters example for datalist search suggestions
    )
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}
