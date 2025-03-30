// src/pages/Home.tsx
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome to your Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You are now logged in successfully.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
