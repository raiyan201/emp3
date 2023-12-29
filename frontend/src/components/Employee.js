import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Table } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Employee = () => {  
  const[employee,setEmployee]=useState([])
  // const [department, setDepartment] = useState([]);

  const getEmployee = async ()=>{
    const response=await axios.get('http://localhost:8000/api/employees/')
    setEmployee(response.data)
}

  const getDepartment=async ()=>{
    const response=await axios.get('http://localhost:8000/api/departments/')
    setDepartment(response.data)
  }



  useEffect(()=>{   
    getEmployee();
    getDepartment();
 },[]);


 const [modal, setModal] = useState(false);

 const toggle = () => setModal(!modal);

 const externalCloseBtn = (
   <button
     type="button"
     className="close"
     style={{ position: 'absolute', top: '15px', right: '15px' }}
     onClick={toggle}
   >
     &times;
   </button>
 );

 const deleteEmployee=async(id)=>{
  await axios.delete(`http://127.0.0.1:8000/api/employees/${id}/`)
  navigate('/employee')
 }
    
  const [employee_id,setEmployee_id]=useState("")  
  const [employee_name,setEmployee_name]=useState("")  
  const [date_of_joining,setDate_of_joining]=useState("")  
  const [department,setDepartment]=useState([])  
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const navigate = useNavigate();

  const AddEmployeeInfo= async()=>{
    try {
    let formField=new FormData()

    formField.append('employee_id',employee_id)
    formField.append('employee_name',employee_name)
    formField.append('date_of_joining',date_of_joining)
    formField.append('department',selectedDepartment)


    // code1
  //   await axios({
  //     method:'post',
  //     url:'http://localhost:8000/api/',
  //     data: formField
  //   }).then((response)=>{
  //     console.log(response.data)
  //     navigate('/'); 
  //   })
  // } catch (error) {
  //   console.error('Error adding employee:', error);


  // code2
    
    try {
        const response = await axios.post('http://localhost:8000/api/employees/', formField);
        console.log(response.data);
        navigate('/');
      } catch (error) {
        console.error('Error adding employee:', error);
        // Handle the error as needed
      
    
  
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      }
    }catch (error) {
        // Handle other errors outside the Axios block if needed
        console.error('Other error:', error);
      }
    };


    return (

<div>
      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Add Employee</ModalHeader>
        <ModalBody>

<div className='container'>
  <div className='form-group'>
    <div className='form-control'>
      
    <label htmlFor="text">Enter Employee Id</label> 

      <input 
      type="text" 
      className="form-control form-control-lg" 
      placeholder='Enter Employee Id'
      name='employee_id'
      value={employee_id}
      onChange={(e)=>setEmployee_id(e.target.value)} />

<label htmlFor="text">Enter Employee Name</label> 

    <input 
      type="text" 
      className="form-control form-control-lg" 
      placeholder='Enter Employee Name'
      name='employee_name'
      value={employee_name}
      onChange={(e)=>setEmployee_name(e.target.value)} />

<label htmlFor="DOJ">Select DOJ</label> 

    <input 
      type="date" 
      className="form-control form-control-lg" 
      placeholder='Select Date of Joining'
      name='date_of_joining'
      value={date_of_joining}
      onChange={(e)=>setDate_of_joining(e.target.value)} />

      <label htmlFor="department">Select Department</label> 

      <select value={selectedDepartment} 
      onChange={(e)=>setSelectedDepartment(e.target.value)} >
        
      <option value="">Select Department</option>
      {department.map((dep) => (

      <option key={dep.id} value={dep.id}>{dep.name}</option>
      ))}
   
  </select>

  </div>
  </div>
  </div>
        
        </ModalBody>
       
        <ModalFooter>
          <Button color="primary" onClick={AddEmployeeInfo}>
            Add Employee
          </Button>{' '}
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

  
<Table hover>
  <thead>
    <tr>
      
      <th>
        Employee_Id
      </th>
      <th>
        Employee Name
      </th>
      <th>
        DOJ
      </th>
      <th>
      Department

      </th>
      <th>
        Options
      </th>
    </tr>
  </thead>
  
  
  <tbody>
      
  {
      employee.map((employee,index)=>(       
  <tr> 
    <th scope="row"> {employee.employee_id} 
    </th> <td> {employee.employee_name} </td> 
    <td> {employee.date_of_joining} </td>
     {/* <td> {employee.department} </td>  */}
{/* <td>{department.find((dep) => dep.id === employee.department)?.name || 'Unknown Department'}</td> */}
    <td>{department.find((dep)=>dep.id===employee.department)?.name||'None'}</td>
     <td> 
    <button className="btn-md btn btn-info" onClick={""}>Edit</button> 
     <button className="btn-md btn btn-danger" onClick={()=>deleteEmployee(employee.id)}>Delete</button> 
     </td> </tr>
     ))
}  
  </tbody>
</Table>


<button className="btn btn-primary" onClick={toggle}>Add Employee</button>    

    </div>
    
  )
}

export default Employee
