import { type LucideIcon } from 'lucide-react'

interface MetricCardProps {
    title: string
    value: number
    icon: LucideIcon
    color: string
  }
  
  export function MetricCard({ title, value, icon: Icon, color }: MetricCardProps) {
    return (
        <div className={`rounded-lg p-6 flex items-center gap-4 ${color} text-white shadow-md`}>
            <Icon className="w-8 h-8" />
            <div>
                <p className="text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
        </div>
    )
}

  

