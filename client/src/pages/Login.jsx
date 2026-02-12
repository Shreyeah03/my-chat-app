import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-[400px]">

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back 👋
        </h1>

        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded-lg font-semibold text-white"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          New user?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:underline"
          >
            Create Account
          </Link>
        </p>


      </div>
    </div>
  );
  return (
  <div className="min-h-full flex items-center justify-center">

    {/* Tailwind Test */}
    <div className="text-purple-500 text-4xl font-bold">
      Tailwind Working
    </div>

  </div>
);

}
