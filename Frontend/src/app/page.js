import "server-only"
import Image from "next/image";
import Carosel from "./Componets/carosel/Carosel";
import Link from "next/link";



async function getLatestProducts() {

  try {
    const res = await fetch('http://localhost:5001/api/products/getLatestProducts',{ next : {tags : ['HomePage']} })
    const data = await res.json()
    return data

  } catch (err) {
    console.log(err)
    return new Error("Internal server Error")
  }
  
  }

export default async function Home() {

  const {products} = await getLatestProducts()
  return (
      <div className="m-5" >

        <div style={{borderWidth : '12px'}} className=" h-screen grid  grid-cols-1 md:grid-cols-2 border-orange-700">

        <div className="relative">
          <Image className="object-cover" src="/nike1.avif" fill alt="nike1" />
        </div>
        <div className="relative" >
          <Image className="object-cover" src="/nike2.avif" fill alt="nike1" />
        </div>
        </div>
        
        <h1 className="mt-20 text-3xl " > Shop the Essentials</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 h-screen " >

          <div className={"relative h-full col-span-1 md:row-span-2"} >
          <Link href="/Search?category=Clothing">
                <Image className="object-cover " src="/nike9.avif" fill alt="nike1" />
                <div className="absolute bottom-5 left-5 rounded-full w-20 p-2 bg-black text-white items-center flex justify-center hover:bg-gray-700" >Shop</div>
                <h1 className="absolute left-6 bottom-24  text-2xl" >Clothing</h1>
          </Link>
          </div>
          <div className="h-full  relative col-span-1 ">
            <Link href="/Search?category=Shoes">
              <Image className="object-cover" src="/nike7.avif" fill alt="nike1" />
              <div className="absolute bottom-5 left-5 rounded-full w-20 p-2 bg-black text-white items-center flex justify-center hover:bg-gray-700" >Shop</div>
                <h1 className="absolute left-6 bottom-24  text-2xl" >Shoes</h1>
            </Link>
          </div>
          <div className="h-full relative  col-span-1 ">
            <Link href="/Search?category=Accessories">
              <Image className="object-cover" src="/nike8.avif" fill alt="nike1" />
              <div className="absolute bottom-5 left-5 rounded-full w-20 p-2 bg-black text-white items-center flex justify-center hover:bg-gray-700" >Shop</div>
                <h1 className="absolute left-6 bottom-24  text-2xl" >Accessories</h1>
            </Link>
          </div>

        </div>

        
          <h1 className="mt-20 text-3xl" > Popular Right Now </h1>

          <div className="mt-5" >
            <Carosel products={products}/>
          </div>

          <h1 className="mt-20 mb-5 font-bold text-2xl" >Trending</h1>
          <div className="grid h-screen gap-5 grid-cols-1 md:grid-cols-2">
              <div className="relative">
              <Link href="/Search?category=Shoes">
                <Image className="object-cover" src="/nike6.avif" fill alt="nike1" />
                <div className="absolute bottom-5 left-5 rounded-full w-20 p-2 bg-black text-white items-center flex justify-center hover:bg-gray-700" >Shop</div>
                <h1 className="absolute left-6 bottom-24 text-white  text-2xl" >Work Essentials</h1>
              </Link>
              </div>
              <div className="relative">
              <Link href="/Search?category=Accessories">
                <Image className="object-cover" src="/nike8.avif" fill alt="nike1" />
                <div className="absolute bottom-5 left-5 rounded-full w-20 p-2 bg-black text-white items-center flex justify-center hover:bg-gray-700" >Shop</div>
                <h1 className="absolute left-6 bottom-24  text-2xl" >The Latest & Greatest</h1>
              </Link>
              </div>
          </div>

      </div>
  )
}
