import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const { isLogedIn } = useSelector(state => state.user.isLogedIn)
  useEffect(() => {
    if(isLogedIn){
      navigate('/')
    }
  }, [])

  const signIn = (e) => {
    e.preventDefault();
    
  }
  
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-start max-w-[600px] w-full h-30 bg-black p-10 rounded-md'>
        <h1 className='text-gray-400 font-medium text-3xl cursor-default mb-3'>Sign in</h1>
        <form className='w-full'>
          <div className='flex flex-col w-full mb-5'>
            <label className='text-lg text-gray-200 mb-2'>user name</label>
            <input type="text" className='p-2 rounded-md opacity-40 w-full'/>
          </div>
          <div className='flex flex-col w-full mb-5'>
            <label className='text-lg text-gray-200 mb-2'>password</label>
            <input type="password" className='p-2 rounded-md opacity-40 w-full'/>
          </div>
          <div className='flex flex-col w-full mb-5'>
            <label className='text-lg text-gray-200 mb-2'>email</label>
            <input type="email" className='p-2 rounded-md opacity-40 w-full'/>
          </div>
          <hr className='mb-5'/>
          <input
            className='w-70 h-10 px-5 font-medium text-gray-100 cursor-pointer bg-red-500 rounded-md'
            type="submit"
            value="sign in"
            onSubmit={(e)=>singIn(e)}
          />
        </form>
      </div>
    </div>
  )
}

export default Auth