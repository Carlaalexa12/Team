import React from "react";
import { useMemo, lazy, Suspense } from "react";

const ChartPanel = lazy(() => import("../components/ChartPanel"));

const getUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

export default function Dashboard() {
  const stats = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 100 + 20),
    }));
  }, []);

  const user = getUser();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-1">
          {user ? `Welcome back, ${user.name} 👋` : "Welcome to Dashboard"}
        </h1>
        <p className="text-lg">Here’s what’s happening with your team this week.</p>
      </div>

      <Suspense fallback={<div>Loading chart...</div>}>
        <ChartPanel data={stats} />
      </Suspense>
    </div>
  );
}
