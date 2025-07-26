import React, { useState } from "react";
import { X } from "lucide-react";

export default function CreateSprintPage({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow border border-neutral-100 mt-8 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
        <X size={20} />
      </button>
      <h2 className="text-2xl font-bold mb-4">Create New Sprint</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sprint Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2" />
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Sprint</button>
      </div>
    </div>
  );
} 