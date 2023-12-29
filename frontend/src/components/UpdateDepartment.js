import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const UpdateDepartment = ({ updateDepartmentInfo }) => {
  
 const [name,setName]=useState("")

 const navigate = useNavigate();
 const {id}=useParams();
  
  const loadDepartments=async()=>{
  
   const {data}=await axios.get(`http://127.0.0.1:8000/api/departments/${id}/`) 
   console.log(data)
   setName(data.name)
  }
  
  useEffect(()=>{
    loadDepartments();
  },[id])
  



  const UpdateDepartmentInfo = async () => {
    try {
      let formField = new FormData();
      formField.append('name', name);
  
      const response = await axios({
        method: 'put',
        url: `http://127.0.0.1:8000/api/departments/${id}/`,
        data: formField,
      });
  
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  
  
const [modal, setModal] = useState(false);

const toggle_update = () => setModal(!modal);

const externalCloseBtn = (
  <button
    type="button"
    className="close"
    style={{ position: 'absolute', top: '15px', right: '15px' }}
    onClick={toggle_update}
  >
    &times;
  </button>
);

  
  
    return (
    <div>

        <Modal isOpen={modal} toggle_update={toggle_update} external={externalCloseBtn}>
        <ModalHeader>Update Department</ModalHeader>
        <ModalBody>

  <div className='container'>
  <div className='form-group'>
    <div className='form-control'>
      
    <label htmlFor="text">Enter Department Name</label> 

      <input 
      type="text" 
      className="form-control form-control-lg" 
      placeholder='Enter Department name'
      name='name'
      value={name}
      onChange={(e)=>setName(e.target.value)} />
</div>
  </div>
  </div>

        </ModalBody>
       
       <ModalFooter>
         <Button color="primary" onClick={UpdateDepartmentInfo}>
           Update Department
         </Button>{' '}
         <Button color="danger" onClick={toggle_update}>
           Cancel
         </Button>
       </ModalFooter>
     </Modal>
      
    </div>
  )
}

export default UpdateDepartment
