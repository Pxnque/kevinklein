interface IndicatorProps {
    label: string
    value: string
    color: string
  }
  
  function Indicator({ label, value, color }: IndicatorProps) {
    return (
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    )
  }
  
  export function PerformanceIndicators() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium text-black">Desempeño de Tienda</h3>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-blue-600 rounded-full" />
                </div>
                <div className="text-right text-sm text-black-500">85%</div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-black">Indicadores</h4>
                <div className="grid grid-cols-2 gap-4 text-black">
                    <Indicator label="Mensajes Recibidos" value="15/15" color="bg-blue-100 text-blue-700" />
                    <Indicator label="Mensajes Respondidos" value="10/15" color="bg-green-100 text-green-700" />
                    <Indicator label="Orden Regular" value="15/15" color="bg-emerald-100 text-emerald-700" />
                    <Indicator label="Tiendas Verificadas" value="20/20" color="bg-orange-100 text-orange-700" />
                </div>
            </div>
        </div>
    )
}
