"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToBagButton = ({id,name,price,image,size}) => {
    
    const handleAddToBag = async () => {
        const CartItems = localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : []
        console.log('add to bag')
        console.log(id,name,price,image, size)
        const {url} = image
        const item = {  id,name,price, url , size }
        CartItems.push(item)
        localStorage.setItem("CartItems",JSON.stringify(CartItems))
        toast.success("Item added to bag")
    }


  return (<>
    <button onClick={handleAddToBag} className="bg-black px-8 py-5 w-3/4 text-white rounded-full font-bold hover:bg-gray-600">Add to Bag</button>
    <ToastContainer />
  </>
  )
}

export default AddToBagButton