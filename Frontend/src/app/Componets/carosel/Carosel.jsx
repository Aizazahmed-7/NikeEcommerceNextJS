"use client";
import Slider from "react-slick"
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Cards from "../HomaPageCards/Cards";
import Link from "next/link";




const Carosel = ({products}) => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        prevArrow:<LeftArrow/>,
        nextArrow:<RightArrow/>,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    
      };

  return (
    
    <Slider {...settings}>
    
     { products.map((item,index) =>(
      <Link href={`/Product/${item._id}`} key={index} >
      <Cards price={item.price} name={item.name} description={item.description} key={index} url={item.images[0].url} />
      </Link>
     ))  
     }      
      

    </Slider>
    )
}

export default Carosel