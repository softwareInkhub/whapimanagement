import React, { useState } from "react";
import { X } from "lucide-react";

const companies = ["whapi project management", "Acme Corp", "Globex Inc."];
const statuses = ["Active", "On Hold", "Completed"];

export default function CreateProjectPage({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState(companies[0]);
  const [status, setStatus] = useState(statuses[0]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow border border-neutral-100 mt-8 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
        <X size={20} />
      </button>
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Company</label>
            <select value={company} onChange={e => setCompany(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2">
              {companies.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Project</button>
      </div>
    </div>
  );
} 