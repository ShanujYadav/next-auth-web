"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const AllProfilePage = () => {
  const route=useRouter()
  const onLogout =async () => {
    try {
      const response=await axios.get('/api/users/logout')
      console.log("response---",response.data)
      route.push('/login')
    } catch (error: any) {
      console.log("error---", error)
    }

  }

  return (
    <div className='text-center'>
      <h2>AllProfilePage</h2>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm  w-auto'>
        <button
          onClick={onLogout}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default AllProfilePage;
