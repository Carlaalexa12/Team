import { memo } from "react";

const statusStyles = {
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Pending: "bg-gray-100 text-gray-700",
};

const ProjectCard = memo(({ project }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-md font-medium ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">{project.description}</p>
      <div className="text-xs text-gray-400 mt-auto pt-2">
        Last updated: {project.updatedAt}
      </div>
    </div>
  );
});

export default ProjectCard;
