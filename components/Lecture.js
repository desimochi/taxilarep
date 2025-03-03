"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
  { month: "January", lecture: 186 },
  { month: "February", lecture: 305 },
  { month: "March", lecture: 237 },
  { month: "April", lecture: 273 },
  { month: "May", lecture: 209 },
  { month: "June", lecture: 214 },
]

const chartConfig = {
    lecture: {
      label: "lecture",
      color: "#b91c1c",
    },
  };
  

export function LecComponent() {
  return (
    <Card className="mt-4 border border-gray-300 rounded-xl hover:shadow-xl transition-shadow">
      <CardHeader className="items-center">
        <CardTitle>Lecture Done - 6 Months</CardTitle>
        <CardDescription className="text-gray-600">
          Showing total lectures for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="lecture"
              fill="var(--color-lecture)"
              fillOpacity={0.7}
              dot={{
                r: 4,
                fillOpacity: 1,
                fill:"black"
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
