"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
const chartData = [{ term: "term5", pass: 64, fail: 46 }]

const chartConfig = {
  pass: {
    label: "pass",
    color: "#b91c1c",
  },
  fail: {
    label: "fail",
    color: "#fcd5cd",
  },
} 

export function PassChart() {

  return (
    <>
    <Card className="flex flex-col h-[220px] ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Students Performance</CardTitle>
        <CardDescription>T-29 Batch in Term 5 </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 mt-4 h-full">
        <ChartContainer
          config={chartConfig}
          className=" aspect-square w-full "
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData[0].pass.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Stundent Passed
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="fail"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-pass)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pass"
              fill="var(--color-fail)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    <Card className="flex flex-col  h-[200px] mt-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>ReSeat Data</CardTitle>
        <CardDescription>T-29 Batch in Term 5 </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 mt-2 h-full">
        <ChartContainer
          config={chartConfig}
          className=" aspect-square w-full "
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData[0].pass.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Stundent Passed
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="fail"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-pass)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pass"
              fill="var(--color-fail)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </>
  )
}
