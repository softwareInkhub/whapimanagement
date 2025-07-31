import React, { useState } from "react";
import { X, Users, UserPlus, MessageSquare, Shield, Crown, Settings, Globe, Building, Tag, Calendar, MapPin } from "lucide-react";

const groupTypes = ["Team", "Department", "Project", "Role-based", "Location-based", "Temporary"];
const privacyLevels = ["Public", "Private", "Restricted"];
const locations = ["New York, NY", "San Francisco, CA", "London, UK", "Berlin, DE", "Tokyo, JP", "Remote", "Global"];

const availableMembers = [
  "Sarah Johnson",
  "Mike Chen", 
  "Alex Rodriguez",
  "Emily Davis",
  "David Wilson",
  "Lisa Thompson",
  "James Brown",
  "Maria Garcia",
  "John Smith",
  "Anna Lee"
];

export default function CreateGroupPage({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: groupTypes[0],
    privacy: privacyLevels[0],
    location: locations[0],
    maxMembers: "",
    whatsappGroup: "",
    members: [] as string[],
    tags: [] as string[],
    notes: ""
  });

  const [newTag, setNewTag] = useState("");
  const [newMember, setNewMember] = useState("");

  const availableTags = [
    "Development", "Design", "Marketing", "Sales", "Support", "Management", 
    "Frontend", "Backend", "Mobile", "Web", "AI/ML", "DevOps", "QA", "UX"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating group:", formData);
    onClose?.();
  };

  const addMember = () => {
    if (newMember && !formData.members.includes(newMember)) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, newMember]
      }));
      setNewMember("");
    }
  };

  const removeMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m !== member)
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow border border-neutral-100 mt-8 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
        <X size={20} />
      </button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create New Group</h2>
        <p className="text-slate-600">Create a new group for team collaboration and WhatsApp integration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Users size={16} className="inline mr-2" />
              Group Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter group name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Building size={16} className="inline mr-2" />
              Group Type
            </label>
            <select
              value={formData.type}
              onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {groupTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Describe the purpose and goals of this group..."
            required
          />
        </div>

        {/* Privacy and Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Shield size={16} className="inline mr-2" />
              Privacy Level
            </label>
            <select
              value={formData.privacy}
              onChange={e => setFormData(prev => ({ ...prev, privacy: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {privacyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MapPin size={16} className="inline mr-2" />
              Location
            </label>
            <select
              value={formData.location}
              onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Max Members
            </label>
            <input
              type="number"
              value={formData.maxMembers}
              onChange={e => setFormData(prev => ({ ...prev, maxMembers: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50"
              min="1"
              max="1000"
            />
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <MessageSquare size={16} className="inline mr-2" />
            WhatsApp Group Link
          </label>
          <input
            type="url"
            value={formData.whatsappGroup}
            onChange={e => setFormData(prev => ({ ...prev, whatsappGroup: e.target.value }))}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://chat.whatsapp.com/..."
          />
        </div>

        {/* Members */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <UserPlus size={16} className="inline mr-2" />
            Add Members
          </label>
          <div className="flex gap-2 mb-3">
            <select
              value={newMember}
              onChange={e => setNewMember(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a member</option>
              {availableMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={addMember}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.members.map((member, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
              >
                {member}
                <button
                  type="button"
                  onClick={() => removeMember(member)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Tag size={16} className="inline mr-2" />
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-green-500 hover:text-green-700"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Additional notes about the group..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            Create Group
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 