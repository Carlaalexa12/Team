import { useMemo, useState } from "react";
import TeamMemberCard from "../components/TeamMemberCard";

const fakeTeamMembers = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  name: `Member ${i + 1}`,
  role: ["Developer", "Designer", "Product Manager"][i % 3],
  avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
}));

const PAGE_SIZE = 8;

export default function Team() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return fakeTeamMembers.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  const totalPages = Math.ceil(fakeTeamMembers.length / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Our Team</h1>
        <p className="text-gray-500">Meet the amazing people behind our product.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {paginatedMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg border text-sm transition-all ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

