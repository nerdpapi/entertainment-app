import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  BookmarkIcon, 
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const [open, setOpen] = useState(false);

  const baseIcon =
    "w-6 h-6 text-[#5A698F] hover:text-[#FFFFFF] transition-colors";
  const activeIcon = "text-[#FFFFFF]";

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (
      parts[0][0]?.toUpperCase() +
      parts[parts.length - 1][0]?.toUpperCase()
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const Avatar = ({ size = 40 }) => (
    user ? (
      <div
        onClick={() => setOpen(!open)}
        style={{ width: size, height: size }}
        className="
          cursor-pointer rounded-full
          bg-[#FC4747] text-[#FFFFFF]
          flex items-center justify-center
          font-semibold border border-[#FFFFFF]
          select-none
        "
      >
        {getInitials(user.name)}
      </div>
    ) : (
      <img
        src="/avatar.svg"
        alt="Guest"
        style={{ width: size, height: size }}
        className="rounded-full border border-[#FFFFFF] cursor-pointer"
        onClick={() => navigate("/login")}
      />
    )
  );

  const Dropdown = () =>
    open && user && (
      <div className="absolute bottom-14 left-1/2 -translate-x-[40%] w-32 z-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 cursor-pointer text-left px-4 py-2 text-sm text-red-500 hover:text-red-400"
        ><PowerIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex fixed left-6 top-6 bottom-6 w-[96px] rounded-[20px] bg-[#161D2F] flex-col items-center py-8">
        {/* Logo */}
        <div className="mb-10">
          <img src="/vite.svg" alt="App Logo" className="w-8 h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-8 flex-1">
          <NavLink to="/" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <HomeIcon />
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <FilmIcon />
          </NavLink>
          <NavLink to="/tv" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <TvIcon />
          </NavLink>
          <NavLink to="/bookmarks" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <BookmarkIcon />
          </NavLink>
        </nav>

        {/* Avatar + Dropdown */}
        <div className="relative mt-auto">
          <Avatar size={40} />
          <Dropdown />
        </div>
      </aside>

      {/* ================= MOBILE / TABLET TOP BAR ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#161D2F] h-[72px] flex items-center justify-between px-6">
        {/* Logo */}
        <img src="/vite.svg" alt="App Logo" className="w-8 h-8" />

        {/* Nav Icons */}
        <nav className="flex gap-6">
          <NavLink to="/" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <HomeIcon />
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <FilmIcon />
          </NavLink>
          <NavLink to="/tv" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <TvIcon />
          </NavLink>
          <NavLink to="/bookmarks" className={({ isActive }) => `${baseIcon} ${isActive ? activeIcon : ""}`}>
            <BookmarkIcon />
          </NavLink>
        </nav>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <Avatar size={32} />
          <Dropdown />
        </div>
      </header>
    </>
  );
}
