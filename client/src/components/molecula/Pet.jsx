import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Pet = () => {
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://13.60.193.203/pet/${id}`)
            .then((res) => {
                setPet(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteHandler = () => {
        axios.delete(`https://13.60.193.203/pet/delete/${id}`)
            .then((res) => {
                navigate('/pet/getPets');
            }).catch((err) => {
                console.log(err);
                console.log("ESTO ES ERROR DE FRONTEND");
            });
    };

    const likeHandler = () => {
        setCount(count + 1);
        setDisabled(true); // Desactivar el botón después de un clic
    };

    return (
        <div>
            <div className='bg-white d-flex flex-row justify-content-between col-6 mx-auto'>
                <h1>Details About: {pet.name ? pet.name : 'Loading...'}</h1>
                <button className='btn btn-danger' onClick={deleteHandler}>Adopt {pet.name}</button>
            </div>
            <div className='card'>
                <p className='p-2'><strong>Pet Type:</strong> {pet.type}</p>
                <p className='p-2'><strong>Description:</strong> {pet.description}</p>
                <p className='p-2'><strong>Skills:</strong> {pet.skillOne}</p>
                <p className='p-2'>{pet.skillTwo}</p>
                <p className='p-2'>{pet.skillThree}</p>
                <button
                    className='btn btn-success d-flex col-0 mx-auto'
                    disabled={disabled}
                    onClick={likeHandler}
                >
                    Like {pet.name} 
                </button>
                <div className='d-flex flex-row justify-content-end col-6 mx-auto'>
                    <p><strong>Likes: </strong> {count} Like(s)</p>
                </div>
            </div>
        </div>
    );
};

export default Pet;






 