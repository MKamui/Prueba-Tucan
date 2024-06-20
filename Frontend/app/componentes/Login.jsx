"use client"
import React, {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Image from 'next/image'
import lista from "../../public/lista.png"

const Login = () => {
    const [inputValue, setInputValue] = useState('')

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const userData = {
        email: inputValue,
      };
      if(validateEmail(inputValue)){
        try {
          const response = await axios.post('http://localhost:3001/login', userData);
          if(response.data.message === `${userData.email} found`){
            Swal.fire({
              text: "Se encuentra en la lista!",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              text: "No está en la lista, largo",
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
          }
          setInputValue("")
        } catch (error) {
          console.error(error);
        }
      } else {
        Swal.fire({
          text: "Introduce algun correo válido",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
        setInputValue("")
      }
      }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-[80%] md:w-[60%] bg-white rounded-xl py-5 flex flex-col items-center'>
            <div className='w-[300px] md:w-[400px]'>
              <Image src={lista}/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='text-black flex flex-col items-center space-y-4'>
                    <label className='text-xl font-semibold'>Está en la lista de invitados?</label>
                    <input type="email" className='bg-gray-600 rounded-full w-full p-2 text-white' placeholder='Entre su email...' onChange={(event) => setInputValue(event.target.value)} value={inputValue}></input>
                    <button className='w-fit bg-blue-500 text-lg py-2 px-4 rounded-full hover:scale-105'>Verificar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login