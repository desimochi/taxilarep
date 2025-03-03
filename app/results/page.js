"use client"
import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PassChart } from "@/components/PassChart"
const chartData = [
  { month: "Python", desktop: 186, mobile: 80 },
  { month: "SQL", desktop: 305, mobile: 200 },
  { month: "Finance", desktop: 237, mobile: 120 },
  { month: "MArketing", desktop: 73, mobile: 190 },
  { month: "HRM", desktop: 209, mobile: 130 },
  { month: "Supply Chain", desktop: 214, mobile: 140 },
  
  { month: "Supply Chain", desktop: 214, mobile: 140 },
  
  { month: "Supply Chain", desktop: 214, mobile: 140 },
  
  { month: "Supply Chain", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "passed",
    color: "#b91c1c",
  },
  mobile: {
    label: "failed",
    color: "#fcd5cd",
  },
} 

export default function Page(){
    return (
        <div className="py-2 px-5">
            <div>
            <div className="w-full">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-4 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/5">
                <h5 className="text-2xl font-bold">Exam Results</h5>
                <span className="text-sm text-gray-300">Taxila Business School</span>
                </div>
                <div className="w-1/5">
  <select id="batch"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="2024-25">T-29</option>
    <option value="t-28">T-28</option>
    <option value="t-27">T-27</option>
    <option value="t-26">T-26</option>
  </select>
                </div>
                <div className="w-1/5">
  <select id="term" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Term</option>
    <option  value="Term5">Term 5</option>
    <option value="Term4">Term 4</option>
    <option value="Term3">Term 3</option>
    <option value="Term2">Term 2</option>
    <option value="Term1">Term 1</option>
  </select>
                </div>
                <div className="w-1/5">
                <button className="bg-red-500 hover:bg-red-600 rounded-sm w-full py-2 text-white" >Submit</button>
                </div>
                </div>
                
                
 
  
  
            </div>
        </div>
            </div>
            <div className="flex gap-3 mt-2">
       
        <div className="w-full">
            <div className="flex gap-4">
                <div className="w-4/5 ">
                <Card >
      <CardHeader>
        <CardTitle>Term-5 - Subject Wise</CardTitle>
        <CardDescription>No. of Passed and Failed Stundents in Each Subject</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 100)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        </div>
      </CardFooter>
    </Card>
                </div>
                <div className="w-1/5">
                    <PassChart />
                </div>
            </div>
        
        </div>
    </div>
    <div className="rounded-xl border border-gray-300 mt-4 ">
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Roll No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Python
                </th>
                <th scope="col" className="px-6 py-3">
                    SQL
                </th>
                <th scope="col" className="px-6 py-3">
                    Marketing
                </th>
                <th scope="col" className="px-6 py-3">
                    Human Resource
                </th>
                <th scope="col" className="px-6 py-3">
                    Supply Chain
                </th>
                <th scope="col" className="px-6 py-3">
                    Man Com
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
            <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="row" className="flex items-center px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4">
                    Rajat Singh
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                         78 - Pass
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                         48 - Fail
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                         41 - Fail
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                         87 - Pass
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                         53 - Pass
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                         64 - Pass
                    </div>
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">See Details</a>
                </td>
              
            </tr>
        </tbody>
    </table>
    </div>
        </div>
    )
}