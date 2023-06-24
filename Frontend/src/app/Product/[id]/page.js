import Script from 'next/script'
import { ImageSection } from "./ImageSection"
import AddToBagButton  from "../../Componets/AddToBagButton"


async function getData(id){
    
    const res = await fetch(`https://nikebackend.vercel.app/api/products/getSingleProduct/${id}`)
    const data = await res.json()
    return data
}



const ProductPage = async ({params})=>{
    const {id} = params
    const {product} = await getData(id)
    return (
        <div>
            <Script src="https://kit.fontawesome.com/49216970f8.js" crossorigin="anonymous"/>
            <section className="p-10 pr-0 grid grid-cols-2">
               <ImageSection Images={product.images}/>
                <section className="px-16 py-0 flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-3xl">{product.title}</h1>
                        <h3 className="font-medium text-xl">{product.category}</h3>
                        <h3 className="text-xl">${product.price}</h3>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold my-4">Select Size</h1>
                        {
                            <ul className="grid grid-cols-5 gap-3">
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">6.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">7.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">8.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">9.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">10.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">11.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">12.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">13.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">14.0</li>
                                <li className="px-8 py-4 border-2 border-gray-300 hover:border-black rounded-lg">15.0</li>
                            </ul>
                        }
                    </div>
                    <div className="flex flex-col text-center">
                        <p>4 interest-free payments of $40.00 with Klarna. <a href="#" className="underline">Learn More</a></p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <AddToBagButton id={product._id} name={product.name} price={product.price} image={product.images[0]} size={6} />
                        <button className="border-2 border-gray-300 px-8 py-5 w-3/4 rounded-full font-bold hover:border-black">Favourite <i class="fa-regular fa-heart"></i></button>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default ProductPage