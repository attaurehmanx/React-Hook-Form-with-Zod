'use client'
import React from 'react'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Zodformschema, Inputs } from '@/lib/Zodschema'
import { useRef } from 'react'


const zodform = () => {

    const resetform = useRef <HTMLFormElement>(null)
    // Reacthook form 
    const {register, handleSubmit,setError, getValues, formState:{ errors,isSubmitting}} = useForm<Inputs>({resolver: zodResolver(Zodformschema)})

    // to send data to server
    const onSubmit:SubmitHandler<Inputs> = async (data: Inputs) =>{
    const response = await fetch('/api/zodform', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name:data.name,
          email:data.email,
          password:data.password,
          confirmpassword:data.confirmpassword
        })
    })

    if(!response.ok){
      alert("try again")
    }

    const result = await response.json();
    if(result.errors){
      if(result.errors.name){
        setError("name", {type:"server", message:result.errors.name})
      }
      else if(result.errors.email){
        setError("email", {type:"server", message:result.errors.email})
      }
      else if(result.errors.password){
        setError("password", {type:"server", message:result.errors.password})
      }
      else if(result.errors.confirmpassword){
        setError("confirmpassword", {type:"server", message:result.errors.confirmpassword})
      }
      else {
        alert("something wrong")
      }
    }else{
      alert("submit successfully")
      resetform.current?.reset()
    }
}
  return (
    <main className='flex items-center justify-center h-screen'>
    <form onSubmit={handleSubmit(onSubmit)} ref={resetform}
      className=' rounded-md bg-blue-100 w-1/4 text-center shadow-sm hover:shadow-lg'
    >
        
            <h1 className='my-10 text-xl font-semibold '>React Hook Form(with Zod)</h1>
        <div className='mb-10'>        
      <input
      {...register("name")}
      name='name'
      type='text'
      placeholder='Name'
      className=' rounded-md pl-2 h-10 '
      />
      {errors.name && (
        <p className='text-red-500 text-xs'>{errors.name.message}</p>
      )}
      </div>
      <div className='mb-10'>
      <input
      {...register("email")}
      name='email'
      type='email'
      placeholder='Email'
      className=' rounded-md pl-2 h-10 '
      />
      {errors.email && (
        <p className='text-red-500 text-xs'>{errors.email.message}</p>
      )}
      </div>
      <div className='mb-10'>
        <input
        {...register("password")}
           name='password'
           type='password'
           placeholder='Password'
           className=' rounded-md pl-2 h-10 '
      />
      {errors.password && (
        <p className='text-red-500 text-xs'>{errors.password.message}</p>
      )}
      </div>
      <div className='mb-10'>
        <input
        {...register("confirmpassword")}
      name='confirmpassword'
      type='password'
      placeholder='Confirm Password'
      className='  rounded-md pl-2 h-10 '
      />
      {errors.confirmpassword && (
        <p className='text-red-500 text-xs'>{errors.confirmpassword.message}</p>
      )}
      </div>
      <div>
        <button 
        className={`text-lg rounded-md ${isSubmitting? 'opacity-50 cursor-none': 'opacity-100'} bg-blue-500 text-white px-4 py-2 mb-5`}
        type="submit"
        disabled={isSubmitting}
        >Submit</button>
      </div>
     
      
      </form>
     </main>
  )
}

export default zodform
