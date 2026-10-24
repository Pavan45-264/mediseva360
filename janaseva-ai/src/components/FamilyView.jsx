import React, { useState } from 'react';
import {
  Users, UserPlus, Shield, Activity, CheckCircle2,
  Clock, Plus, ArrowRight, Check
} from 'lucide-react';
import { FAMILY_MEMBERS, SAMPLE_ACTIVITY_LOG } from '../data/expiryData';

export default function FamilyView() {
  const [members, setMembers] = useState(FAMILY_MEMBERS);
  const [activityLog, setActivityLog] = useState(SAMPLE_ACTIVITY_LOG);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Contributor');

  const [tasks, setTasks] = useState([
    { id: 't-1', text: 'Dad: Check milk packet in fridge before making evening tea', assignedTo: 'Dad', done: true },
    { id: 't-2', text: 'Priya: Pick up replacement paracetamol strip from pharmacy', assignedTo: 'Priya', done: false },
    { id: 't-3', text: 'Rohit: Check bread packet date before opening', assignedTo: 'Rohit', done: false }
  ]);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newM = {
      id: `fm-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole,
      avatar: newMemberRole === 'Admin' ? '👨‍💼' : newMemberRole === 'Senior User' ? '👵' : '👩',
      itemsAdded: 0,
      tasksDone: 0
    };

    setMembers([...members, newM]);
    setNewMemberName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1400px] mx-auto pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>FAMILY COORDINATION HUB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Family Sharing & Kitchen Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Collaborate with family members. Keep everyone updated on what to eat first and assign grocery checks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
        >
          <UserPlus className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <form
            onSubmit={handleAddMember}
            className="bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-md w-full border border-emerald-500/40 shadow-2xl space-y-4 text-white"
          >
            <h3 className="text-lg font-black text-white">
              Add New Family Member
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Member Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh, Ananya"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Role & Permissions
              </label>
              <select
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Admin">Admin (Full Control)</option>
                <option value="Contributor">Contributor (Can Scan & Edit)</option>
                <option value="Senior User">Senior User (Simplified Big Text)</option>
                <option value="View-Only">View-Only (Can browse only)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md"
              >
                Save Member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Family Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl flex items-center gap-4 hover:border-emerald-500/40 transition-colors"
          >
            <div className="text-3xl p-3 rounded-2xl bg-slate-950 border border-slate-800">
              {m.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">{m.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {m.role}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {m.itemsAdded} items scanned · {m.tasksDone} tasks done
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section: Tasks on Left, Activity Log on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Household Expiry Tasks */}
        <div className="lg:col-span-6 bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-black text-white">
                Assigned Kitchen Checks
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Keep family members accountable for checking kitchen items
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  task.done
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-sm'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                    task.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-semibold ${task.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.text}
                  </span>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
                  {task.assignedTo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Stream */}
        <div className="lg:col-span-6 bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Recent Household Activity Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live feed of who used, scanned, or discarded items
            </p>
          </div>

          <div className="space-y-3">
            {activityLog.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-200">{act.text}</span>
                <span className="text-[10px] font-mono text-slate-400">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
