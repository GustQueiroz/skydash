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
const data: Product[] = [
  {
    id: "1",
    nome: "Notebook Dell Inspiron",
    codigo: "NB-DELL-001",
    categoria: "Eletrônicos",
    preco: 3499.99,
    estoque: 15,
    status: "Em Estoque",
  },
  {
    id: "2",
    nome: "Smartphone Samsung Galaxy",
    codigo: "SM-SAM-001",
    categoria: "Eletrônicos",
    preco: 1999.99,
    estoque: 23,
    status: "Em Estoque",
  },
  {
    id: "3",
    nome: "Monitor LG 24 polegadas",
    codigo: "MN-LG-001",
    categoria: "Eletrônicos",
    preco: 899.99,
    estoque: 8,
    status: "Baixo Estoque",
  },
  {
    id: "4",
    nome: "Teclado Mecânico Logitech",
    codigo: "TC-LOG-001",
    categoria: "Periféricos",
    preco: 349.99,
    estoque: 0,
    status: "Sem Estoque",
  },
  {
    id: "5",
    nome: "Mouse Gamer Razer",
    codigo: "MS-RZR-001",
    categoria: "Periféricos",
    preco: 249.99,
    estoque: 5,
    status: "Baixo Estoque",
  },
  {
    id: "6",
    nome: "Cadeira Gamer ThunderX3",
    codigo: "CG-TX3-001",
    categoria: "Móveis",
    preco: 1299.99,
    estoque: 3,
    status: "Baixo Estoque",
  },
  {
    id: "7",
    nome: "Headset HyperX Cloud",
    codigo: "HS-HYP-001",
    categoria: "Periféricos",
    preco: 399.99,
    estoque: 12,
    status: "Em Estoque",
  },
  {
    id: "8",
    nome: "Webcam Logitech C920",
    codigo: "WC-LOG-001",
    categoria: "Periféricos",
    preco: 499.99,
    estoque: 0,
    status: "Sem Estoque",
  },
  {
    id: "9",
    nome: "Impressora HP LaserJet",
    codigo: "IP-HP-001",
    categoria: "Eletrônicos",
    preco: 1499.99,
    estoque: 7,
    status: "Baixo Estoque",
  },
  {
    id: "10",
    nome: "Roteador TP-Link Archer",
    codigo: "RT-TPL-001",
    categoria: "Redes",
    preco: 299.99,
    estoque: 18,
    status: "Em Estoque",
  },
]

export type Product = {
  id: string
  nome: string
  codigo: string
  categoria: string
  preco: number
  estoque: number
  status: "Em Estoque" | "Baixo Estoque" | "Sem Estoque"
}

export function EstoqueTable({ filter }: { filter?: "baixo" | "zero" }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  // Filtrar dados com base no parâmetro filter
  const filteredData =
    filter === "baixo"
      ? data.filter((item) => item.status === "Baixo Estoque")
      : filter === "zero"
        ? data.filter((item) => item.status === "Sem Estoque")
        : data

  const columns: ColumnDef<Product>[] = [
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
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("nome")}</div>,
    },
    {
      accessorKey: "codigo",
      header: "Código",
      cell: ({ row }) => <div className="font-medium">{row.getValue("codigo")}</div>,
    },
    {
      accessorKey: "categoria",
      header: "Categoria",
      cell: ({ row }) => <div>{row.getValue("categoria")}</div>,
    },
    {
      accessorKey: "preco",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Preço
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("preco"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)

        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "estoque",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Estoque
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("estoque")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge variant={status === "Em Estoque" ? "default" : status === "Baixo Estoque" ? "warning" : "destructive"}>
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Editar produto</DropdownMenuItem>
              <DropdownMenuItem>Ajustar estoque</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Excluir produto</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredData,
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
          placeholder="Filtrar produtos..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("nome")?.setFilterValue(event.target.value)}
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

