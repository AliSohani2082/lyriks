/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import { FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const { isLogedIn, authData } = useSelector(state => state.user);
  console.log(isLogedIn, authData)
  return (
    <div className="bg-black mr-16 md:mr-0">
      <NavLink to="/auth">
        <div className='flex flex-row justify-center items-center w-full h-full'>
          {
            isLogedIn? (
              <><div className='flex justify-center items-center w-10 h-10 bg-gray-700 rounded-full m-5'>
                {authData?.profileImg ? (
                  <img />
                ):(
                  <FaUser size={22} />
                )
                }
              </div>
              <h2></h2></>
            ):(
              <NavLink
              className='flex justify-center items-center h-10 w-20 rounded-md bg-red-500 hover:scale-105'
              to="/auth"
              ><span>Sign in</span></NavLink>
            )
          }
        </div>
      </NavLink>
    </div>
  )
}

export default User