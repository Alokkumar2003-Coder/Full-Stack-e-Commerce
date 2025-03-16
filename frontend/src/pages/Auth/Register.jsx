import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='bg-blue-50 h-screen flex justify-around items-center'>
      <div className='flex flex-col border px-8 py-6 rounded-lg shadow-md bg-white w-96'>
        <h1 className='text-2xl font-bold mb-6 mt-2'>Register E-Sol</h1>
        <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Enter Username . . .' className='border rounded p-2'/>
          <input type="text" placeholder='Enter Email . . .' className='border rounded p-2'/>
          <input type="text" placeholder='Enter Password . . .' className='border rounded p-2'/>
          <Button className="cursor-pointer rounded p-5 bg-red-600 hover:bg-red-700">Register</Button>
          <p className='text-sm text-center'>Already have an account? <Link to="/login" className='text-blue-500 font-semibold'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register