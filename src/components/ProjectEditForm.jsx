import React from "react";

export default function ProjectEditForm({ editingData, setEditingData, onSave, onCancel }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-3">
      <input
        value={editingData.name}
        onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
        className="w-full border px-2 py-1 rounded"
      />
      <textarea
        value={editingData.description}
        onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
        className="w-full border px-2 py-1 rounded"
      />
      <select
        value={editingData.status}
        onChange={(e) => setEditingData({ ...editingData, status: e.target.value })}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
