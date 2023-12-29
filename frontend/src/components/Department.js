import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import UpdateDepartment from './UpdateDepartment';

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [modal_update, setModal_update] = useState(false); // Update modal state name


  const getDepartment = async () => {
    const response = await axios.get('http://localhost:8000/api/departments/');
    setDepartment(response.data);
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const deleteDepartment = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/departments/${id}/`);
    navigate('/');
  };

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

  const AddDepartmentInfo = async () => {
    try {
      let formField = new FormData();
      formField.append('name', name);

      const response = await axios.post('http://localhost:8000/api/departments/', formField);
      console.log(response.data);
      navigate('/department');
    } catch (error) {
      console.error('Error adding department:', error);
      // Handle the error as needed
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  let departmentToUpdate;  
  
  const UpdateDepartmentInfo = async (id) => {
    toggle_update();

    departmentToUpdate = department.find((dep) => dep.id === id);
    console.log('Department to update:', departmentToUpdate);
    if (id === null) {
      console.error('Invalid department id');
      return;
    }
  
    if (departmentToUpdate) {
      // setName(departmentToUpdate.name);
  
      try {
        let formField = new FormData();
        formField.append('name', departmentToUpdate.name);
  
        const response = await axios({
          method: 'put',
          url: `http://127.0.0.1:8000/api/departments/${id}/`,
          data: formField,
        });
  
        console.log(response.data);
        await getDepartment();
      } catch (error) {
        console.error('Error updating department:', error);
        console.log('Response:', error.response); // Log the response for more details
      }
    } else {
      console.error(`Department with id ${id} not found`);
    }
  };

const [modal_new, setModal_new] = useState(false);
const toggle_update = () => setModal_new(!modal_new);

const externalCloseBtn_new = (
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

{/* update */}

  <Modal isOpen={modal_new} toggle_update={toggle_update} external={externalCloseBtn_new}>
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
  {/* <Button color="primary" onClick={() => UpdateDepartmentInfo(departmentToUpdate.id)}>
    Update Department
  </Button>{' '} */}

{/* <Button color="primary" onClick={() => UpdateDepartmentInfo(departmentToUpdate ? departmentToUpdate.id : null)}>
    Update Department
  </Button> */}

<Button color="primary" onClick={() => departmentToUpdate && UpdateDepartmentInfo(departmentToUpdate.id)}>
  Update Department
</Button>

  <Button color="danger" onClick={toggle_update}>
    Cancel
  </Button>
</ModalFooter>

     </Modal>


{/* update */}

      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Add Department</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="text">Enter Department Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Department name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AddDepartmentInfo}>
            Add Department
          </Button>{' '}
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Table hover>
        <thead>
          <tr>
            <th>Department_Id</th>
            <th>Department Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
        {department.map((dept, index) => (
  <tr key={index}>
    <th scope="row">{dept.id}</th>
    <td>{dept.name}</td>
    <td>
      <button className="btn-md btn btn-info" onClick={() => UpdateDepartmentInfo(dept.id)}>
        Edit
      </button>
      <button className="btn-md btn btn-danger" onClick={() => deleteDepartment(dept.id)}>
        Delete
      </button>
    </td>
  </tr>
))}

        </tbody>
      </Table>

      <button className="btn btn-primary" onClick={toggle}>
        Add Department
      </button>
    </div>
  );
};

export default Department;
