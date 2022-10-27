import {Link} from 'react-router-dom'
import React, {useEffect,useState} from 'react'
import './Home.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Home = () => {

  const[data,setData] = useState([]);

  const loadData = async () =>{
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  }

  useEffect (() =>{
      loadData();
  },[]);

  const deleteContact = (id) =>{
    if(window.confirm("Are you sure you want to delete contact?")){
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact Deleted Successfully",{position:toast.POSITION.TOP_CENTER});
      setTimeout(() => loadData(), 500);
    }
  }

  return (
    <div style={{marginTop:'150px'}}>
      <Link to="/Addcontact">
      <button className='btn btn-contact'>Add Contact</button>
      </Link>
      <TableContainer component={Paper} className="styled-table">
        <Table  aria-label="caption table">
          <caption>Contact data in database</caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">{index+1}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.contact}</TableCell>
                <TableCell align="right">
                <Link to={`/update/${item.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Delete</button>
                  <Link to={`/view/${item.id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home

