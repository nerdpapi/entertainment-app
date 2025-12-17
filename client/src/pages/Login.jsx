import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/authApi";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", form: "" }); // clear field + form error
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Can't be empty";
    if (!form.password) newErrors.password = "Can't be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const data = await loginUser(form);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      setErrors({
        form: "Invalid email or password",
      });
    }
  };

  const inputClass = (hasError) => `
    w-full bg-transparent
    text-base sm:text-lg
    text-[#FFFFFF]
    placeholder-[#FFFFFF]/50
    outline-none
    border-b
    ${hasError ? "border-[#FC4747]" : "border-[#FFFFFF]/20"}
    focus:border-[#FFFFFF]
    pb-3
    caret-[#FC4747]
  `;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#10141E] text-[#FFFFFF] px-4 relative">
      {/* Logo */}
      <div className="absolute top-8 sm:top-52">
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
        <h2 className="text-3xl font-light mb-8">Login</h2>

        {/* Form-level error */}
        {errors.form && (
          <p className="text-[#FC4747] text-sm mb-4">
            {errors.form}
          </p>
        )}

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
        <div className="mb-8 relative">
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

        {/* Button */}
        <button
          type="submit"
          className="
            w-full bg-[#FC4747]
            hover:bg-[#ff5c5c]
            text-[#FFFFFF]
            py-3
            rounded-lg
            font-medium
            transition
            text-sm sm:text-base
          "
        >
          Login to your account
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-[#FFFFFF]/70">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#FC4747] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
