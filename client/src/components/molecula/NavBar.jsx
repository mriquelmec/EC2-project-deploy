import React from 'react'
import { Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='bg-white d-flex flex-row  justify-content-between col-6 mx-auto'>
            <h1>Pet Shelter</h1>
            <Link to={`pet/getPets`}>home</Link>
        </div>
)
}

export default NavBar


 