'use client'
import React,{useState}  from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';

const AddProduct = () => {
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [image,setImage]=useState('');
    const [error,setError]=useState('');
    const router=useRouter();

    const addProduct=async()=>{
      if(!name || !price || !category || !company || !image)
      {
        setError(true)
        return false;
      }
        const userId=JSON.stringify(localStorage.getItem('user'))._id
        console.log(userId)
        
        console.log(name,price,category,company,image)
       const formData=new FormData()
       formData.append('name',name)
       formData.append('price',price)
       formData.append('category',category)
       formData.append('company',company)
       formData.append('image',image)
       formData.append('userId',userId)
      await axios.post("http://localhost:5000/add-product", formData ,
      {
        headers: { 
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`      }
      } 
        )
      .then(async(resp) => {
        const result=await resp.data
        console.log(result)
        router.push('/product')
      });
    }

  return (
    <div className='product'>
      <input className='inputbox' value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter product Name'/>
      {error && !name && <span className='invalid-input'>enter valid name</span>}
      <input className='inputbox' value={price} onChange={(e)=>setPrice(e.target.value)} type="text" placeholder='Enter product Price'/>
      {error && !price && <span className='invalid-input'>enter valid price</span>}
      <input className='inputbox' value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Enter product category'/>
      {error && !category && <span className='invalid-input'>enter valid category</span>}
      <input className='inputbox' value={company} onChange={(e)=>setCompany(e.target.value)} type="text" placeholder='Enter product company'/>
      {error && !company && <span className='invalid-input'>enter valid company</span>}
      <input className='inputbox' type="file" onChange={(e)=>setImage(e.target.files[0])}  placeholder='Enter product image'/>
      
      {error && !image && <span className='invalid-input'>enter valid image</span>}
      <button className='appbutton' onClick={addProduct} type='button'>Add Product</button>
    </div>
  )
}

export default AddProduct
