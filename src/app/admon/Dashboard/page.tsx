import { Package, ShoppingBag, MessageSquare, Star } from 'lucide-react'
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon"
import { MetricCard } from "../../components/MetricCard/MetricCard"
import { PerformanceIndicators } from "../../components/Performance-indicators/Performance-indicators"

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 space-y-6 overflow-y-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Home Page Administración
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <MetricCard title="Nuevos Ordenes" value={5} icon={ShoppingBag} color="bg-blue-500" />
                            <MetricCard title="Lista para entregar" value={2} icon={Package} color="bg-orange-500" />
                            <MetricCard title="Nuevo Mensaje" value={3} icon={MessageSquare} color="bg-emerald-500" />
                            <MetricCard title="Reseñas" value={4} icon={Star} color="bg-purple-500" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 bg-white border rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-gray-900">Datos de los productos</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">Cambiar Anuncios</span>
                                    </div>
                                </div>
                                <div className="h-[300px] flex items-center justify-center border rounded bg-gray-100">
                                    Chart placeholder
                                </div>
                            </div>
                            <div className="p-6 bg-white border rounded-lg shadow-sm">
                                <PerformanceIndicators />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}