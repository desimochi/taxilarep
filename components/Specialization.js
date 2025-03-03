"use client"

import { Chrome, TrendingUp } from "lucide-react"
import { PolarGrid, RadialBar, RadialBarChart } from "recharts"

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
  { browser: "Marketing", count: 275, fill: "var(--color-chrome)" },
  { browser: "International Business", count: 200, fill: "var(--color-safari)" },
  { browser: "SupplyChain", count: 187, fill: "var(--color-firefox)" },
  { browser: "Operations", count: 173, fill: "var(--color-edge)" },
  { browser: "HumanResource", count: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  chrome: {
    label: "Marketing",
    color: "#e80101",
  },
  safari: {
    label: "InternationalBusiness",
    color: "#ef4343",
  },
  firefox: {
    label: "Firefox",
    color: "#ee5e5e",
  },
  edge: {
    label: "Edge",
    color: "#f17b7b",
  },
  other: {
    label: "Other",
    color: "#f29191",
  },
}

export default function Specialization() {
  return (
    <Card className="flex flex-col mt-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">Specialization Details</CardTitle>
        <CardDescription>T-28 Batch</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
  <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="browser" />} />
  <PolarGrid gridType="circle" />
  <RadialBar dataKey="count" nameKey="browser" label={{ position: "insideStart", fill: "#fff" }} />
</RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-center">
          All Stundents in PGDM+Business Analytics has Business Analytics specialization
        </div>
      </CardFooter>
    </Card>
  )
}
