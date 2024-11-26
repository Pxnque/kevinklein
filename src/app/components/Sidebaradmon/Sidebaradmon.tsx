import Link from "next/link"
import { type LucideIcon, LayoutDashboard, BarChart2, Package, ShoppingCart, Receipt, MessageSquare, Star, Settings } from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admon/Dashboard", icon: LayoutDashboard },
  { title: "Estadísticas", href: "/admon/Estadisticas", icon: BarChart2 },
  { title: "Productos", href: "/admon/Productos", icon: Package },
  { title: "Ordenes", href: "/admon/Ordenes", icon: ShoppingCart },
  { title: "Transacciones", href: "/admon/Transacciones", icon: Receipt },
  { title: "Mensajes", href: "/admon/Mensajes", icon: MessageSquare },
  { title: "Reseñas", href: "/admon/Resenas", icon: Star },
  { title: "Configuración", href: "/admon/Configuracion", icon: Settings },
]


export function Sidebar() {
    return (
        <div className="w-64 border-r bg-white sticky top-16 h-[calc(100vh-64px)]">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-8">
                    <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="rounded-full" />
                    <div>
                        <h3 className="font-medium text-gray-900">Kevin Klein</h3>
                        <p className="text-sm text-gray-500">Verificado</p>
                    </div>
                </div>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
