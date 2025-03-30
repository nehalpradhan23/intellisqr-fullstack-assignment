// src/pages/Login.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";

// Define Zod schema for login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript type from Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

// API function to handle login
const loginUser = async (data: LoginFormValues) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    data
  );

  return response.data;
};

const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Use the login function from auth context
      login(data.email);
      toast.success("Login successful");
      // Clear any previous server errors
      setServerError(null);
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        // Handle API errors
        if (error.response) {
          setServerError(
            error.response.data.error || "Login failed. Please try again."
          );
        } else if (error.request) {
          setServerError(
            "No response from server. Please check your connection."
          );
        } else {
          setServerError("An error occurred. Please try again.");
        }
      } else {
        setServerError("An unexpected error occurred.");
      }
      console.error("Login error:", error);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // console.log(data);
    // return;
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[300px] space-y-4 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
            Welcome back!
          </h2>
        </div>

        {/* Display server errors */}
        {serverError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{serverError}</div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <InputBox
              id="email"
              type="email"
              placeholder="UID" // Changed placeholder back to UID as per original code
              registerResult={register("email")} // Pass the result of register
              error={errors.email} // Pass the specific error object
              autoComplete="email"
            />

            <InputBox
              id="password"
              type="password"
              placeholder="Password"
              registerResult={register("password")} // Pass the result of register
              error={errors.password} // Pass the specific error object
              autoComplete="current-password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-950 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 disabled:bg-gray-400 cursor-pointer"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <Link
            to={"/signup"}
            className="text-center underline text-sm font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
