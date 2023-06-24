"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);



  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {

      setIsLoading(false);
    }
  };




  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/Admin");
  }



  return (
    <div className={styles.container}>
      
      <h2 className={styles.subtitle}>Please sign in to see the Admin dashboard.</h2>

  
      <button
        onClick={loginWithGoogle}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button> 
    </div>
  );
};

export default Login;