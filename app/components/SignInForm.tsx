"use client";

import React, { useEffect, useState } from "react";
import { signUp } from "../actions/users/signUp";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const SignInForm = () => {
  const router = useRouter();

  const { status } = useSession();

  const [uNo, setUNo] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const handleSubmit = async () => {
    setMessage("Signing in...");

    try {
      const signInResponse = await signIn("credentials", {
        uNo,
        password,

        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid credential",
        });
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }

    setMessage(message);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
      router.refresh();
    }
  }, [router, status]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          {/* Left Side */}

          <div
            className="hidden md:block md:w-1/2 bg-cover "
            style={{
              backgroundImage:
                "url(https://cdn.dribbble.com/users/21928/screenshots/550592/picture_1.png) ",
            }}
          >
            <div className="p-12 ">
              <h2 className="text-2xl font-bold text-white text-shadow">
                Welcome to Erp
              </h2>
              <p className="mt-2 text-white text-shadow">
                Embark on a stylish web journey with Erp.com, where design meets
                innovation in one seamless line of code.
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center ">SignIn To ERP</h2>
            <div className="mt-6">
              <input type="hidden" />
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={uNo}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setUNo(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <p>{message}</p>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
