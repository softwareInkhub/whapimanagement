import React, { useState } from "react";
import { X, User, Mail, Phone, Building, MapPin, Calendar, Crown, Shield, Users, MessageSquare } from "lucide-react";

const departments = ["Management", "Engineering", "Design", "Marketing", "Sales", "Support", "HR"];
const roles = ["Project Manager", "Developer", "Designer", "Marketing Specialist", "Sales Representative", "Support Engineer", "HR Manager"];
const statuses = ["Online", "Away", "Offline", "Busy"];
const locations = ["New York, NY", "San Francisco, CA", "London, UK", "Berlin, DE", "Tokyo, JP", "Remote"];

export default function CreateUserPage({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: roles[0],
    department: departments[0],
    status: statuses[0],
    location: locations[0],
    hireDate: "",
    salary: "",
    whatsappNumber: "",
    timezone: "EST",
    skills: [] as string[],
    groups: [] as string[],
    notes: ""
  });

  const [newSkill, setNewSkill] = useState("");
  const [newGroup, setNewGroup] = useState("");

  const availableSkills = [
    "Project Management", "Agile", "Scrum", "Leadership", "JavaScript", "React", "Node.js",
    "Python", "Java", "UI/UX Design", "Graphic Design", "Marketing", "Sales", "Customer Support"
  ];

  const availableGroups = [
    "Management Team", "Project Leads", "Development Team", "Design Team", "Marketing Team",
    "Sales Team", "Support Team", "HR Team", "Executive Board"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating user:", formData);
    onClose?.();
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addGroup = () => {
    if (newGroup && !formData.groups.includes(newGroup)) {
      setFormData(prev => ({
        ...prev,
        groups: [...prev.groups, newGroup]
      }));
      setNewGroup("");
    }
  };

  const removeGroup = (group: string) => {
    setFormData(prev => ({
      ...prev,
      groups: prev.groups.filter(g => g !== group)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow border border-neutral-100 mt-8 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
        <X size={20} />
      </button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create New User</h2>
        <p className="text-slate-600">Add a new user to the Whapi Management system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <User size={16} className="inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@whapi.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone size={16} className="inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1-555-0123"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MessageSquare size={16} className="inline mr-2" />
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={e => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1-555-0123"
            />
          </div>
        </div>

        {/* Role and Department */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Crown size={16} className="inline mr-2" />
              Role
            </label>
            <select
              value={formData.role}
              onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Building size={16} className="inline mr-2" />
              Department
            </label>
            <select
              value={formData.department}
              onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Shield size={16} className="inline mr-2" />
              Status
            </label>
            <select
              value={formData.status}
              onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location and Hire Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Calendar size={16} className="inline mr-2" />
              Hire Date
            </label>
            <input
              type="date"
              value={formData.hireDate}
              onChange={e => setFormData(prev => ({ ...prev, hireDate: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Annual Salary
          </label>
          <input
            type="text"
            value={formData.salary}
            onChange={e => setFormData(prev => ({ ...prev, salary: e.target.value }))}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$75,000"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Skills
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Groups */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Users size={16} className="inline mr-2" />
            Groups
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newGroup}
              onChange={e => setNewGroup(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add to a group"
            />
            <button
              type="button"
              onClick={addGroup}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.groups.map((group, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
              >
                {group}
                <button
                  type="button"
                  onClick={() => removeGroup(group)}
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
            placeholder="Additional notes about the user..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Create User
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