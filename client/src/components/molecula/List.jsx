import React from 'react';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const List = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        axios.get('https://13.60.193.203/pet/getPets')
            .then((res) => {
                const sortedList = res.data.sort((a, b) => a.type.localeCompare(b.type));
                setList(sortedList);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

return (
    <div className='tbl'>
        <table className="table table-dark mt-3 p-2 mx-auto ">
            <thead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Options</th>
                </tr>
            </thead>
            <tbody>
                {list.map((pet)=>{
                    return (
                        <tr className='table-secondary' key={pet._id}>
                            <td className='table-secondary' >{pet.name}</td>
                            <td className='table-secondary' >{pet.type}</td>
                            <td className='table-secondary' >
                                <Link to={`/pet/${pet._id}`}>Details</Link>
                                <span> | </span>
                                <Link to={`/pet/update/${pet._id}`}> edit</Link>
                            </td>
                        </tr>
                )
            })
        }
        </tbody>
    </table>
    </div>
)
    
}

export default List;


 