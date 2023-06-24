"use client"
import Link from "next/link"
import React from "react"
import Script from 'next/script'
import { useState , useEffect } from "react"
import axios from "axios"
import { KeywordContext } from "../Componets/ContextApi/Keyword"



export default function Shoes ({searchParams}){

    const [category, setCategory] = useState(searchParams.category)
    const [categorydd, setCategorydd] = useState(true);
    const [pricedd , setPricedd] = useState(true);
    const [branddd, setBranddd] = useState(true);
    const [hidefilters,setHidefilters] = useState(false);
    const [products, setProducts] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const {keyword} = React.useContext(KeywordContext)
    
    const toggleDD = (variable,setter)=>{
        setter(!variable);
    }

    const toggleHF = ()=>{
        setHidefilters(!hidefilters);
    }

    const setPrice = (min,max)=>{
        setMinPrice(min);
        setMaxPrice(max);
    }


    useEffect(()=>{
        
        const fetchProducts = async ()=>{
            try {
                const {data} = await axios.get(`http://localhost:5001/api/products/searchProduct?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&keyword=${keyword}`)
                setProducts(data.products)
            } catch (error) {
                setProducts(null)
            }
        }
        fetchProducts();
    } , [category,minPrice,maxPrice,keyword])
    
    
    useEffect(()=>{
        setCategory(searchParams.category)
    },[searchParams.category])
 

    return (<>
        <Script src="https://kit.fontawesome.com/49216970f8.js" crossorigin="anonymous"/>
        <div className="bg-white">
            {
                products && (
                    <div className="bg-white font-oswald">
                        <section className="p-10 bg-white ">
                            <div className="flex justify-between">
                                <h1 className="text-2xl">{'Mens Products'} ({products.length})</h1>
                                <div className="flex gap-10">
                                    <button onClick = {()=>toggleHF()}><span className="flex text-lg gap-2"><p>Hide Filters</p>   <svg aria-hidden="true" class="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M21 8.25H10m-5.25 0H3"></path><path stroke="currentColor" stroke-width="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd"></path><path stroke="currentColor" stroke-width="1.5" d="M3 15.75h10.75m5 0H21"></path><path stroke="currentColor" stroke-width="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd"></path></svg></span></button>
                                    <button ><span className="text-lg">Sort By <i class="fa-sharp fa-solid fa-chevron-down"></i></span></button>
                                </div>
                            </div>
                        </section>
                        <section className='grid grid-cols-2 md:grid-cols-4 pr-10'>
                            {
                                hidefilters==false? (
                                    <div className={`col-span-1`}>
                                        <div className="p-10 flex flex-col gap-5">
                                        <span className="flex justify-between"><h1>Shop by Category </h1><button onClick={()=>toggleDD(categorydd,setCategorydd)}><i class={`fa-sharp fa-solid fa-chevron-${categorydd?'up':'down'}`}></i></button></span>
                                        {
                                            categorydd && (
                                                <div>
                                                    <div className="flex gap-3"><input onChange={()=>{setCategory('Shoes')}} checked={category==='Shoes' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Shoes</p></div>
                                                    <div className="flex gap-3"><input onChange={()=>{setCategory('Clothing')}} checked={category==='Clothing' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Clothing</p></div>
                                                    <div className="flex gap-3"><input onChange={()=>{setCategory('Apperal')}} checked={category==='Apperal' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Apparel</p></div>
                                                    <div className="flex gap-3"><input onChange={()=>{setCategory('Accessories')}} checked={category==='Accessories' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Accessories</p></div>
                                                </div>
                                                
                                            )
                                        }
                                        
                                        </div>
                                        <hr className="ml-10 mr-10"/>
                                        <div className="p-10 flex flex-col gap-5">
                                            <span className="flex justify-between"><h1>Shop by Price</h1><button onClick={()=>toggleDD(pricedd,setPricedd)}><i class={`fa-sharp fa-solid fa-chevron-${pricedd?'up':'down'}`}></i></button></span>
                                            {
                                                pricedd && (
                                                    <div>
                                                        <div className="flex gap-3"><input onChange={()=>{setPrice(20,50)}} checked={minPrice===20} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>20$ - $50</p></div>
                                                        <div className="flex gap-3"><input onChange={()=>{setPrice(50,100)}} checked={minPrice===50} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>$50 - $100</p></div>
                                                        <div className="flex gap-3"><input onChange={()=>{setPrice(100,1000000)}} checked={minPrice===100} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Over $100</p></div>
                                                    </div>
                                                )
                                            }
                                            
                                        </div>
                                        <hr className="ml-10 mr-10"/>
                                        <div className="p-10 flex flex-col gap-5">
                                            <span className="flex justify-between"><h1>Brand </h1><button onClick={()=>toggleDD(branddd,setBranddd)}><i class={`fa-sharp fa-solid fa-chevron-${branddd?'up':'down'}`}></i></button></span>
                                            {
                                                branddd && (
                                                    <div>
                                                        <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Air</p></div>
                                                        <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Mercurial</p></div>
                                                    </div>
                                                )
                                            }
                                            
                                        </div>
                                        <hr className="ml-10 mr-10"></hr>
                                    </div>
                                ):(
                                    <div className="hidden"></div>
                                )   
                            }
                            <div className={`text-center md:text-left ${hidefilters ? 'col-span-2 md:col-span-4 md:ml-8' : 'col-span-1 md:col-span-3'}  grid ${hidefilters ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
                                {
                                  products.length > 0 ?  products.map((item,index)=>{
                                        return (
                                            <div className="flex justify-center items-center md:items-start md:justify-start">
                                                <Link href={`/Product/${item._id}`} key = {index} className="flex flex-col gap-3">
                                                    <img src={item.images[0].url} className="h-72 w-72"></img>
                                                    <div className="flex flex-col lg:text-start text-center">
                                                        <p className="text-orange-500">{item.stock > 0 ? 'AVAILABLE' : 'Out Of Stock'}</p>
                                                        <p className="font-bold">{item.name}</p>
                                                        <p className="text-gray-500">{item.category}</p>
                                                        <p>${item.price}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    }) :  <div className="col-span-3 flex justify-center items-center text-4xl text-center font-bold">No Product Found</div> 
                                    

                                }
                            </div>
                        </section>
                    </div>
                    
                )
            }
            
        </div>
    </>
    )
}



// 