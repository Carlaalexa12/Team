import { memo } from "react";

const TeamMemberCard = memo(({ member }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
      <img
        src={member.avatar}
        alt={member.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.role}</p>
      </div>
    </div>
  );
});

export default TeamMemberCard;
