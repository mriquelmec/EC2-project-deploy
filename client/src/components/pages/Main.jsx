import React, {useState, useEffect} from 'react'
import List from '../../components/molecula/List'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Main = () => {
    const [pet, setPet] = useState([])

    useEffect(()=>{
        axios.get('https://13.60.193.203:8000/pet/getPets')
        .then((res)=>{
            console.log(res.data)
            setPet(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    
    
    return (
        <div>
            <div className='col-6 mx-auto d-flex flex-row'>
        <h2 >These pet's are looking for a good home!</h2>
        <h5 className='ms-5 mt-2'>
        <Link to={`/pet/create/`}>add a pet to the shelter</Link>
        </h5>
            </div>
            <List pet={pet} setPet={setPet} />
        </div>
    )
}

export default Main;



