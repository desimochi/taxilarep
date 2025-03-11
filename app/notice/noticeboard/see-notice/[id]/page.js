"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    async function fetchNotice() {
      const res = await authFetch(`noticeboard-viewset/${id}`);
      const data = await res.json();

      setNotice(data.data);
    }

    if (id) {
      fetchNotice();
    }
  }, [id]);

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{notice.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: notice.description }} />
      <p className="text-gray-500">
        {new Date(notice.date).toLocaleDateString()} -{" "}
        {new Date(notice.valid_date).toLocaleDateString()}
      </p>
    </div>
  );
}
