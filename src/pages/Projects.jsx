import React, { useState, useEffect, lazy, Suspense } from "react";
import ProjectCard from "../components/ProjectCard";

const ProjectEditForm = lazy(() => import("../components/ProjectEditForm"));

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [newProject, setNewProject] = useState({ name: "", description: "", status: "Pending" });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", description: "", status: "" });

  const updateStatus = (id, newStatus) => {
    const updated = projects.map((proj) =>
      proj.id === id
        ? { ...proj, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] }
        : proj
    );
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const addProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description) return;

    const newEntry = {
      ...newProject,
      id: Date.now(),
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updated = [...projects, newEntry];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setNewProject({ name: "", description: "", status: "Pending" });
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditingData({
      name: project.name,
      description: project.description,
      status: project.status,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: "", description: "", status: "" });
  };

  const saveEdit = () => {
    const updated = projects.map((proj) =>
      proj.id === editingId
        ? { ...proj, ...editingData, updatedAt: new Date().toISOString().split("T")[0] }
        : proj
    );
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    cancelEdit();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <p className="text-gray-500">A list of projects your team is working on.</p>
      </div>

      {/* ADD NEW PROJECT FORM */}
      <form onSubmit={addProject} className="bg-gray-100 p-5 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Add New Project</h2>
        <input
          type="text"
          placeholder="Project name"
          className="w-full border px-3 py-2 rounded"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <textarea
          placeholder="Project description"
          className="w-full border px-3 py-2 rounded"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={newProject.status}
          onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Project
        </button>
      </form>

      {/* PROJECT LIST */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id}>
            {editingId === project.id ? (
              <Suspense fallback={<div>Loading edit form...</div>}>
                <ProjectEditForm
                  editingData={editingData}
                  setEditingData={setEditingData}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />
              </Suspense>
            ) : (
              <>
                <ProjectCard project={project} />
                <div className="mt-2 flex gap-2 flex-wrap text-sm">
                  {["Pending", "In Progress", "Completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(project.id, status)}
                      className={`px-2 py-1 rounded border ${
                        project.status === status
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                  <button
                    onClick={() => startEdit(project)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const initialProjects = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Project ${i + 1}`,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu erat lacus.",
  status: ["In Progress", "Completed", "Pending"][i % 3],
  updatedAt: `2025-08-${(i % 28) + 1}`.padStart(10, "0"),
}));



