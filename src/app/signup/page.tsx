"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const SingnupPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log('response---', response.data)

            if (response.data.statusCode === '000') {
                toast.success(response.data.message)
                setLoading(false)
                router.push('/login')
            }
            else {
                console.log('else---', response.data.message)
                toast.error(response.data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {loading ? "Loading ..." : "Sign Up"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                User Name
                            </label>
                            <div className="mt-2">
                                <input
                                    name="username"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    placeholder='User name'
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    placeholder='email'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    placeholder='password'
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={onSignup}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already User{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Visit Login
                        </a>
                    </p>
                </div>
            </div>

        </>
    )
}

export default SingnupPage