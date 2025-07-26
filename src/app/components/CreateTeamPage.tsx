import React, { useState } from "react";
import { X } from "lucide-react";

const members = ["Alice", "Bob", "Charlie", "David", "Emma"];

export default function CreateTeamPage({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMember = (member: string) => {
    setSelectedMembers(prev => prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow border border-neutral-100 mt-8 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
        <X size={20} />
      </button>
      <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Team Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Members</label>
          <div className="flex flex-wrap gap-2">
            {members.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => toggleMember(m)}
                className={`px-3 py-1 rounded-lg border ${selectedMembers.includes(m) ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-neutral-100 border-neutral-200 text-neutral-700'} transition`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Team</button>
      </div>
    </div>
  );
} 