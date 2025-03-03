"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { day: "11Feb", present: 186, absent: 80 },
  { day: "12Feb", present: 305, absent: 200 },
  { day: "13Feb", present: 237, absent: 120 },
  { day: "14Feb", present: 573, absent: 190 },
  { day: "15Feb", present: 209, absent: 130 },
  { day: "16Feb", present: 214, absent: 140 },
]

const chartConfig = {
  present: {
    label: "present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "absent",
    color: "hsl(var(--chart-2))",
  },
} 

export function AttendanceChart() {
  return (
    <Card className="mt-4 rounded-xl border border-gray-300 hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">Daily Attendance Overview - 6 days</CardTitle>
        <CardDescription>
        <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-black rounded-full"></span>
        <span className="text-gray-700 text-sm">Present</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-red-700 rounded-full"></span>
        <span className="text-gray-700 text-sm">Absent</span>
      </div>
    </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 20)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={12}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="absent"
              type="natural"
              fill="#b91c1c"
              fillOpacity={0.7}
              stroke="#b91c1c"
              stackId="a"
            />
            <Area
              dataKey="present"
              type="natural"
              fill="#000"
              fillOpacity={0.7}
              stroke="#000"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
