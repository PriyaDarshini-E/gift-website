import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Calendar, Bell, Plus, Trash2, Heart, Gift, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RemindersModal() {
  const { isRemindersModalOpen, closeRemindersModal } = useCart();
  
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('giftora_reminders');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Mom’s Birthday', date: 'September 15', relation: 'Family', icon: '🎂' },
        { id: 2, name: 'Anniversary', date: 'October 24', relation: 'Spouse', icon: '💍' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newRelation, setNewRelation] = useState('Family');

  useEffect(() => {
    try {
      localStorage.setItem('giftora_reminders', JSON.stringify(reminders));
    } catch (e) {}
  }, [reminders]);

  if (!isRemindersModalOpen) return null;

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDate) return;
    setReminders([
      ...reminders,
      {
        id: Date.now(),
        name: newName.trim(),
        date: newDate,
        relation: newRelation,
        icon: newRelation === 'Spouse' ? '💖' : '🎉'
      }
    ]);
    setNewName('');
    setNewDate('');
  };

  const handleRemove = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={closeRemindersModal}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-in border border-stone-200">
        
        <button 
          onClick={closeRemindersModal}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-gray-900">Occasion Reminders</h3>
            <p className="text-xs text-stone-500">Never miss a birthday or anniversary again</p>
          </div>
        </div>

        {/* Add Reminder Form */}
        <form onSubmit={handleAddReminder} className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 mb-6 space-y-3">
          <p className="text-xs font-bold text-amber-900 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5 text-amber-700" />
            Add New Reminder
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              placeholder="Occasion Name (e.g. Sister's Bday)..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-white"
              required
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-white font-medium"
              required
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <select
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none bg-white font-medium"
            >
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Spouse">Spouse</option>
              <option value="Colleague">Colleague</option>
            </select>

            <button
              type="submit"
              className="px-4 py-1.5 bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Save Reminder
            </button>
          </div>
        </form>

        {/* Reminders List */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          <p className="text-xs font-bold text-stone-700 mb-2">Upcoming Occasions ({reminders.length})</p>
          {reminders.length === 0 ? (
            <p className="text-xs text-stone-400 italic text-center py-4">No reminders saved yet.</p>
          ) : (
            reminders.map((r) => (
              <div 
                key={r.id}
                className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{r.name}</h4>
                    <p className="text-[11px] text-stone-500 font-medium">{r.date} • {r.relation}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(r.id)}
                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
