import { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Can't be empty";
    if (!form.email.trim()) newErrors.email = "Can't be empty";
    if (!form.password) newErrors.password = "Can't be empty";
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Can't be empty";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await signupUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setErrors({
        form: err.response?.data?.message || "Signup failed",
      });
    }
  };

  const inputClass = (hasError) => `
    w-full bg-transparent
    text-base sm:text-lg
    text-white
    placeholder-white/50
    outline-none
    border-b
    ${hasError ? "border-[#FC4747]" : "border-white/20"}
    focus:border-[#FFFFFF]
    pb-3
    caret-[#FC4747]
  `;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#10141E] text-white px-4 relative">
      {/* Logo */}
      <div className="absolute top-8 sm:top-34">
        <img src="/vite.svg" alt="App Logo" className="w-10 h-10" />
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-[360px]
          bg-[#161D2F]
          rounded-xl
          px-6 sm:px-8
          py-8 sm:py-10
          shadow-xl
        "
      >
        <h2 className="text-3xl font-light mb-8">Sign Up</h2>

        {/* Form-level error */}
        {errors.form && (
          <p className="text-[#FC4747] text-sm mb-4">{errors.form}</p>
        )}

        {/* Full Name */}
        <div className="mb-6 relative">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass(errors.name)}
          />
          {errors.name && (
            <span className="absolute right-0 -bottom-5 text-xs text-[#FC4747]">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mb-6 relative">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <span className="absolute right-0 -bottom-5 text-xs text-[#FC4747]">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={inputClass(errors.password)}
          />
          {errors.password && (
            <span className="absolute right-0 -bottom-5 text-xs text-[#FC4747]">
              {errors.password}
            </span>
          )}
        </div>

        {/* Repeat Password */}
        <div className="mb-8 relative">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={inputClass(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <span className="absolute right-0 -bottom-5 text-xs text-[#FC4747]">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full bg-[#FC4747]
            hover:bg-[#ff5c5c]
            text-white
            py-3
            rounded-lg
            font-medium
            transition
            text-sm sm:text-base
          "
        >
          Create an account
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-white/70">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FC4747] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
