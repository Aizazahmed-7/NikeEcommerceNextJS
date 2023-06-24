"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {

    const router = useRouter()

    useEffect(() => {
        const CartItems = localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : []
        localStorage.setItem("CartItems",JSON.stringify([]))
        router.push('/')
    },[])


  return (
    <div></div>
  )
}

export default page