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
    <div className=" col-span-12 md:col-span-10">
        <img src={mainImage} className="w-full h-full object-cover rounded-xl"></img>
    </div>
    <div className="md:ml-5  col-span-12 md:col-span-2 flex md:flex-col flex-row flex-wrap  md:flex-nowrap  mt-5 md:mt-0 gap-2 md:mr-5">
        {
            Images.map((imageUrl,index)=>{
                return(
                    <div key={index} onMouseOver={()=>{changeMainImage(imageUrl.url)}} >
                        <img  src={imageUrl.url} className={"w-20 h-20 object-cover rounded-xl" + " " + Styles.img}  ></img>
                    </div>
                )
            })
        }
    </div>
</section>
  )
}
