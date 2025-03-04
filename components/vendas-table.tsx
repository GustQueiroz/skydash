"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dados de exemplo
const data: Venda[] = [
  {
    id: "1",
    cliente: "Maria Rodrigues",
    data: "2023-06-15T14:30:00",
    valor: 1999.99,
    itens: 2,
    status: "Concluída",
    pagamento: "Cartão de Crédito",
  },
  {
    id: "2",
    cliente: "José Almeida",
    data: "2023-06-15T10:15:00",
    valor: 39.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Dinheiro",
  },
  {
    id: "3",
    cliente: "Carla Pereira",
    data: "2023-06-14T16:45:00",
    valor: 299.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Pix",
  },
  {
    id: "4",
    cliente: "Roberto Santos",
    data: "2023-06-14T09:20:00",
    valor: 99.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Cartão de Débito",
  },
  {
    id: "5",
    cliente: "Ana Ferreira",
    data: "2023-06-13T15:10:00",
    valor: 149.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Cartão de Crédito",
  },
  {
    id: "6",
    cliente: "Paulo Oliveira",
    data: "2023-06-13T11:25:00",
    valor: 599.99,
    itens: 3,
    status: "Concluída",
    pagamento: "Cartão de Crédito",
  },
  {
    id: "7",
    cliente: "Fernanda Lima",
    data: "2023-06-12T14:50:00",
    valor: 1299.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Pix",
  },
  {
    id: "8",
    cliente: "Ricardo Gomes",
    data: "2023-06-12T09:30:00",
    valor: 79.99,
    itens: 2,
    status: "Concluída",
    pagamento: "Dinheiro",
  },
  {
    id: "9",
    cliente: "Juliana Costa",
    data: "2023-06-11T16:15:00",
    valor: 349.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Cartão de Débito",
  },
  {
    id: "10",
    cliente: "Marcelo Souza",
    data: "2023-06-11T10:45:00",
    valor: 199.99,
    itens: 1,
    status: "Concluída",
    pagamento: "Cartão de Crédito",
  },
]

export type Venda = {
  id: string
  cliente: string
  data: string
  valor: number
  itens: number
  status: "Concluída" | "Pendente" | "Cancelada"
  pagamento: "Cartão de Crédito" | "Cartão de Débito" | "Dinheiro" | "Pix" | "Boleto"
}

export function VendasTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Venda>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar tudo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "cliente",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("cliente")}</div>,
    },
    {
      accessorKey: "data",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("data"))
        const formatted = new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(date)

        return <div>{formatted}</div>
      },
    },
    {
      accessorKey: "valor",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("valor"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)

        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "itens",
      header: "Itens",
      cell: ({ row }) => <div className="text-center">{row.getValue("itens")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge variant={status === "Concluída" ? "default" : status === "Pendente" ? "warning" : "destructive"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "pagamento",
      header: "Pagamento",
      cell: ({ row }) => <div>{row.getValue("pagamento")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const venda = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(venda.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Imprimir comprovante</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancelar venda</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("cliente")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("cliente")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s)
          selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

