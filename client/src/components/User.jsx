/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const { isLogedIn, authData } = useSelector(state => state.user);
  console.log(isLogedIn, authData)
  return (
    <div className="bg-black mr-16 md:mr-0">
      <NavLink>
        
      </NavLink>
    </div>
  )
}

export default User