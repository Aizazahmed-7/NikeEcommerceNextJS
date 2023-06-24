"use client"
import { useState } from "react"
import Styles from "./product.module.css"

export const ImageSection = ({Images}) => {

    const [mainImage,setMainImage] = useState(Images[0].url)

    const changeMainImage = (imageUrl)=>{
        setMainImage(imageUrl)
      
    }

  return (
    <section className="col-span-1 grid grid-cols-12">
    <div className="ml-5 col-span-2 flex flex-col gap-2 mr-5">
        {
            Images.map((imageUrl,index)=>{
                return(
                    <div key={index} onMouseOver={()=>{changeMainImage(imageUrl.url)}} >
                        <img  src={imageUrl.url} className={"w-20 h-20 rounded-xl" + " " + Styles.img}  ></img>
                    </div>
                )
            })
        }
    </div>
    <div className=" col-span-10">
        <img src={mainImage} className="w-full h-full rounded-xl"></img>
    </div>
</section>
  )
}
