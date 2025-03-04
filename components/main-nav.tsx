"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">EstoqueMax</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/estoque"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/estoque") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Estoque
        </Link>
        <Link
          href="/vendas"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/vendas") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Vendas
        </Link>
        <Link
          href="/relatorios"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/relatorios") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Relatórios
        </Link>
      </nav>
    </div>
  )
}

