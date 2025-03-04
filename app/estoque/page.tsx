import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { EstoqueTable } from "@/components/estoque-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EstoquePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Estoque" text="Gerencie o estoque de produtos">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="baixo-estoque">Baixo Estoque</TabsTrigger>
          <TabsTrigger value="sem-estoque">Sem Estoque</TabsTrigger>
        </TabsList>
        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Produtos</CardTitle>
              <CardDescription>Lista completa de produtos no estoque</CardDescription>
            </CardHeader>
            <CardContent>
              <EstoqueTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="baixo-estoque" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produtos com Baixo Estoque</CardTitle>
              <CardDescription>Produtos que precisam ser reabastecidos em breve</CardDescription>
            </CardHeader>
            <CardContent>
              <EstoqueTable filter="baixo" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sem-estoque" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Sem Estoque</CardTitle>
              <CardDescription>Produtos que precisam ser reabastecidos imediatamente</CardDescription>
            </CardHeader>
            <CardContent>
              <EstoqueTable filter="zero" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

