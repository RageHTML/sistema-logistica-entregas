import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-[#1e293b] text-white p-4 rounded-b-lg mb-6 flex items-center gap-4">
      <Link href="/logistica">
        <span className="font-semibold hover:text-gray-300 cursor-pointer">📦 Logística</span>
      </Link>
      <Link href="/dashboard">
        <span className="font-semibold hover:text-gray-300 cursor-pointer">📊 Dashboard</span>
      </Link>
    </nav>
  );
}
