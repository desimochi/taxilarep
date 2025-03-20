"use client"
import ShowComponents from "@/components/ShowComponents";
import Table from "@/components/Table";
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  return (
 
      <div className="p-5">
        <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-8 mb-8">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-bold">Component Manager</h5>
           
            <div className="flex gap-2">
            <Link href="/exam-components/component-manager/create-component" className="bg-red-500 py-1.5 px-6 rounded-sm">Create Component</Link>
            </div>
          </div>
        </div>
        <ShowComponents/>
      </div>
  );
};
