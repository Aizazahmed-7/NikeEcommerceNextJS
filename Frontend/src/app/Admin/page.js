"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";



const Admin = () => {

  const [ProductName, setProductName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState([]);
  const [Description, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);

  const session = useSession();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {

    return <p>Access Denied</p>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    const formData = new FormData();
    formData.append("name", ProductName);
    formData.append("stock", Quantity);
    formData.append("price", Price);
    formData.append("category", Category);
    formData.append("description", Description);
    for (const file of Image) {
      formData.append("file", file);
  }
try {
    const {data} = await axios.post(`http://localhost:5001/api/products/createProduct`, formData , {
      headers: {
        "Content-Type": "multipart/form-data",
      },

    });
    if(data.success){
      toast.success(data.message)
    }

}
catch (error) {
    console.log(error);
    toast.error(error.response.data.message)

  } finally {
    setLoading(false);
  }
try{
  const {data} =  axios.get('http://localhost:3000/api/revalidate?tag=HomePage');
} catch (error) {
  console.log(error);
}

  };
  const onChangeImage = (e) => {

    const newImageArray = []

    for (const file of e.target.files) {   
      newImageArray.push(file)
    }
    setImage(newImageArray);
  };


  return (<>

<div className='container m-2 grid gap-5 grid-cols-2 ' >
<div>

    <h1 className='text-xl font-bold mb-5' > Orders </h1>
    
      <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Color
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Category
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Price
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Apple MacBook Pro 17"
                      </th>
                      <td class="px-6 py-4">
                          Silver
                      </td>
                      <td class="px-6 py-4">
                          Laptop
                      </td>
                      <td class="px-6 py-4">
                          $2999
                      </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Microsoft Surface Pro
                      </th>
                      <td class="px-6 py-4">
                          White
                      </td>
                      <td class="px-6 py-4">
                          Laptop PC
                      </td>
                      <td class="px-6 py-4">
                          $1999
                      </td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Magic Mouse 2
                      </th>
                      <td class="px-6 py-4">
                          Black
                      </td>
                      <td class="px-6 py-4">
                          Accessories
                      </td>
                      <td class="px-6 py-4">
                          $99
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
</div>
  <div>
    <h1 className='text-xl font-bold mb-5' > Create new Product </h1>
    
<form onSubmit={handleSubmit} >
  <div class="mb-6">
    <label for="ProductName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
    <input onChange={(e)=>{setProductName(e.target.value)}} type="text" id="ProductName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required/>
  </div>
  <div class="mb-6">
    <label for="Quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
    <input onChange={(e)=>{setQuantity(e.target.value)}} type="number" id="Quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
    
  <div class="mb-6">
    <label for="Price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input onChange={(e)=>{setPrice(e.target.value)}} type="number" id="Price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div class="mb-6">
    <label for="Description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
    <input onChange={(e)=>{setDescription(e.target.value)}} type="text" id="Description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required/>
  </div>

  <div class="mb-6">
    <label for="Cover Image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Image</label>
    <input multiple onChange={onChangeImage} type="file" id="Cover-image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required/>
  </div> 

  <div class="mb-6">
    <label for="Category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
    <input onChange={(e)=>{setCategory(e.target.value)}} type="text" id="Category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required/>
  </div>
  {Loading && <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center' >
    <div className='bg-white p-5 rounded-lg' >  
      <h1 className='text-xl font-bold mb-5' > Loading... </h1>
      <div className='flex justify-center items-center' >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  </div>
  }

  <button  disabled={Loading ? true : false } type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
</form>

  </div>
</div>

    <button className='bg-red-600 text-white p-2 shadow rounded-lg' onClick={signOut} > Sign out </button>
    <ToastContainer />

  </>
  )
}

export default Admin