import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Home = () => {


  //1 state difined
  const[data,setData]=useState({fullName:'', email:'',contactNumber:'',course:'',batchCode:'',joiningDate:'',remarks:''})

   const nav = useNavigate();


//4
const dataHandler=(e)=>{
 console.log(e.target.value)
 console.log(e.target.name)

 //set data
setData({...data,[e.target.name]:e.target.value})
}

//5
const saveForm= async(e)=>{
  try{
e.preventDefault()
  alert("congrats dear")
  console.log(data)

   await axios.post('http://localhost:3000/students',data)
   setData({fullName:'', email:'',contactNumber:'',course:'',batchCode:'',joiningDate:'',remarks:''})
    
   //redirect to /userdata after successfully submitting form
   nav('/student_data')


}
catch(err){
console.log("failed to register",err)
}

}
  return (
 <>
 
 
      <div className="container-fluid shadow-lg  fw-bold p-5" >
        <h3 className="text-center mb-3 text-primary">Student Registration </h3>

        <form onSubmit={(e)=>saveForm(e)}>

          <div className="row">
       
          <div className="col-md-6 mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control"
              
              name="fullName"
              value={data.fullName}
              onChange={dataHandler}
              placeholder="Enter full name"
              required 
            />
          </div>

         
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control"
              id="email"
              name="email"
              value={data.email}
              onChange={dataHandler}
              placeholder="Enter email address"
              required 
            />
          </div>
        </div>

        <div className="row">
        
          <div className="col-md-6 mb-3">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input 
              type="number"
              className="form-control"
              id="contactNumber"
              name="contactNumber"
              value={data.contactNumber}
              onChange={dataHandler}
              placeholder="Enter contact number"
              required 
            />
          </div>

     
          <div className="col-md-6 mb-3">
            <label htmlFor="course" className="form-label">Course</label>
            <select 
              className="form-control"
              id="course"
              name="course"
              value={data.course}
              onChange={dataHandler}
              required
            >
              <option value="">Select a course</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
            </select>
          </div>
        </div>

        <div className="row">
   
          <div className="col-md-6 mb-3">
            <label htmlFor="batchCode" className="form-label">Batch Code</label>
            <input 
              type="text" 
              className="form-control"
              id="batchCode"
              name="batchCode"
              value={data.batchCode}
              onChange={dataHandler}
              placeholder="Enter batch code"
              required 
            />
          </div>

     
          <div className="col-md-6 mb-3">
            <label htmlFor="joiningDate" className="form-label">Joining Date</label>
            <input 
              type="date"
              className="form-control"
              id="joiningDate"
              name="joiningDate"
              value={data.joiningDate}
              onChange={dataHandler}
              required 
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="remarks" className="form-label">Remarks</label>
          <textarea
            className="form-control"
            id="remarks"
            name="remarks"
            rows="3"
            value={data.remarks}
            onChange={dataHandler}
            placeholder="Enter any remarks..."
          ></textarea>
        </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>


      </div>
 
 </>
  )
}

export default Home