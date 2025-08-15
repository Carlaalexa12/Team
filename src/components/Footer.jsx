import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-6">
      <p className="text-sm">© {new Date().getFullYear()} TeamTrack. All rights reserved.</p>
    </footer>
  );
}