export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded border dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded border dark:bg-gray-700 dark:text-white"
        />

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
          Sign In
        </button>

        <div className="flex justify-between text-sm mt-4 text-gray-600 dark:text-gray-400">
          <span className="cursor-pointer">Forgot password?</span>
          <span className="cursor-pointer">Create account</span>
        </div>
      </div>
    </div>
  );
}
