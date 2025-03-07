"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Em Estoque", value: 324 },
  { name: "Baixo Estoque", value: 12 },
  { name: "Sem Estoque", value: 8 },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

export function EstoqueStatus() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} produtos`, ""]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

