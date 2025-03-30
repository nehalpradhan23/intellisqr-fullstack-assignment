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
const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript type from Zod schema
type RegisterFormValues = z.infer<typeof registerSchema>;

// API function to handle login
const registerUser = async (data: RegisterFormValues) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    data
  );

  return response.data;
};

const Signup = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Use the login function from auth context
      login(data.email);
      toast.success("Signup successful");
      // Clear any previous server errors
      setServerError(null);
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        // Handle API errors
        if (error.response) {
          setServerError(
            error.response.data.error || "Signup failed. Please try again."
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
      console.error("Register error:", error);
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // console.log(data);
    // return;
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
            Register
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
              placeholder="email" // Changed placeholder back to UID as per original code
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

            <InputBox
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              registerResult={register("confirmPassword")} // Pass the result of register
              error={errors.confirmPassword} // Pass the specific error object
              autoComplete="current-password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-950 hover:bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400 cursor-pointer"
            >
              {loginMutation.isPending ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <Link to={"/login"} className="underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
