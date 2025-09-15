"use client";
import { useState, useEffect } from "react";

export default function Watch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="bg-gray-100 px-4 py-2 rounded">
      <span className=" text-gray-600 text-leading">{formattedTime}</span>
    </div>
  );
}
