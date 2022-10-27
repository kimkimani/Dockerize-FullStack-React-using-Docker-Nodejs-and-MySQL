import React ,{useState,useEffect}from 'react'
import {useParams, Link} from 'react-router-dom'
import './View.css'
import axios from 'axios'

const View = () => {
  
  const[user,setUser] = useState({})  
  const{id} = useParams()

  useEffect(() =>{
    axios
    .get(`http://localhost:5000/api/get/${id}`)
    .then((resp) => setUser({...resp.data[0]}));
  },[id]) 

  return (
    <div style={{marginTop:'150px'}}>
        <div className='card'>
            <div className='card-header'>
                <p>User Contact Details</p>
            </div>
            <div className='conatiner'>
                <strong>ID: </strong>
                <span>{id}</span>
                <br />
                <br />
                <strong>Name: </strong>
                <span>{user.name}</span>
                <br />
                <br />
                <strong>Email: </strong>
                <span>{user.email}</span>
                <br />
                <br />
                <strong>Contact: </strong>
                <span>{user.contact}</span>
                <br />
                <br />
                <Link to="/">
                    <button className='btn btn-edit'>Go Back</button>
                  </Link>
            </div>
        </div>
    </div>
  )
}

export default View