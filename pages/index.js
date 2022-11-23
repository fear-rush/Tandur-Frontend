import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Index = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        router.push("/dashboard");
      } else if (!user) {
        router.push("/login");
      }
    };
    getUser();
    // console.log(user);
  }, []);

  useEffect(() => {}, []);
  return <div></div>;
};

export default Index;
