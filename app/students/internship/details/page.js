"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnswerDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)


  return (
    <div>
      Internship    </div>
  );
}
