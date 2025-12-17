import { useSelector } from "react-redux";

export default function UserAvatar({ size = 32 }) {
  const user = useSelector((state) => state.auth?.user);

  // Get initials from name
  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (
      parts[0][0]?.toUpperCase() +
      parts[parts.length - 1][0]?.toUpperCase()
    );
  };

  // NOT logged in → default avatar
  if (!user) {
    return (
      <img
        src="/default-avatar.png" // put in public/
        alt="Guest"
        style={{ width: size, height: size }}
        className="rounded-full border border-[#FFFFFF] object-cover"
      />
    );
  }

  // Logged in → initials
  return (
    <div
      style={{ width: size, height: size }}
      className="
        rounded-full
        bg-[#FC4747]
        text-[#FFFFFF]
        flex items-center justify-center
        font-semibold
        border border-[#FFFFFF]
        select-none
      "
    >
      {getInitials(user.name)}
    </div>
  );
}
