import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentVendas() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Rodrigues</p>
          <p className="text-sm text-muted-foreground">maria.rodrigues@exemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+R$1.999,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JA</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">José Almeida</p>
          <p className="text-sm text-muted-foreground">jose.almeida@exemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+R$39,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>CP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carla Pereira</p>
          <p className="text-sm text-muted-foreground">carla.pereira@exemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+R$299,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Roberto Santos</p>
          <p className="text-sm text-muted-foreground">roberto.santos@exemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+R$99,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Ferreira</p>
          <p className="text-sm text-muted-foreground">ana.ferreira@exemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+R$149,00</div>
      </div>
    </div>
  )
}

