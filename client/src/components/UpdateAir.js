import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router';
function UpdateAir() {
    const {id} = useParams();
    const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [size_btu, setSize_btu] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

 

useEffect(()=>{
    axios.get('http://localhost:3001/edit/'+id)
    .then(res => {
       
      setName(res.data[0].name)
      setType(res.data[0].type)
      setBrand(res.data[0].brand)
      setSize_btu(res.data[0].size_btu)
      setPrice(res.data[0].price)
      
    })
    .catch(err => console.log(err));
  },[])

  const hanldeSubmit = (e)=>{
    e.preventDefault();
    axios.put('http://localhost:3001/update/'+id,{
      name,
      type,
      brand,
      size_btu,
      price
    }).then(res =>{
      if(res.data.updated){
        navigate('/')
      }else{
        alert("Not updated");
      }
    })
  }

  return (
    <div>
       <div className=" px-60 mt-10 ">
        <div className=" bg-white p-5 px-20 rounded-lg">
          <h1 className="text-4xl text-center">air conditioner</h1>
          <div className="grid grid-cols-2 gap-10 ">
            <div className="mt-10 ">
              <label htmlFor="small-input" className="block mb-2   text-2xl">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div className="mt-10">
              <label htmlFor="small-input" className="block mb-2 text-2xl">
                Type
              </label>
              <input
                type="text"
                value={type}
                onChange={(e)=>{setType(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div className=" ">
              <label htmlFor="small-input" className="block mb-2  text-2xl">
                Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e)=>{setBrand(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div class="">
              <label htmlFor="small-input" className="block mb-2  text-2xl">
                Size_btu
              </label>
              <input
                type="number"
                value={size_btu}
                onChange={(e)=>{setSize_btu(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div className="">
              <label htmlFor="small-input" className="block mb-2  text-2xl">
                price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e)=>{setPrice(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
          </div>
          <button
            type="button"
            onClick={hanldeSubmit}
            class="mt-10 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            อัพเดต
          </button>

         
          </div>
        </div>
      </div>
  )
}

export default UpdateAir
