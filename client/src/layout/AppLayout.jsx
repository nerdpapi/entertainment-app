import Sidebar from "../components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#10141E] text-[#FFFFFF]">
      {/* Fixed navigation (sidebar / topbar) */}
      <Sidebar />

      {/* Content */}
      <main className="w-full">
        {/* Desktop: sidebar on left */}
        <div className="hidden lg:block ml-[140px] px-10 py-8">
          {children}
        </div>

        {/* Mobile & Tablet: top navbar */}
        <div className="lg:hidden pt-[88px] px-4 sm:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
