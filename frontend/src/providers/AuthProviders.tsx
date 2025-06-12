import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosConfig from "../lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  /** Update API Authorization Header */
  const updateApiToken = useCallback((token: string | null) => {
    if (token) {
      axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosConfig.defaults.headers.common["Authorization"];
    }
  }, []);

  /** Initialize Authentication */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        checkAdminStatus();
      } catch (error) {
        console.error("Error Fetching Token:", error);
        updateApiToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken, checkAdminStatus, updateApiToken]); 

  /** Show Loader While Authentication is in Progress */
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProviders;