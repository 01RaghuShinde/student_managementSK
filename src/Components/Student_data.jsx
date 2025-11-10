import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Student_data = () => {

  // 1 manage state
  const [data, setData] = useState([])

  // 2 fetch data
  const FetchData = async () => {
    const result = await axios.get('http://localhost:3000/students')
    console.log(result.data)
    setData(result.data)
  }

  // 3 useEffect
  useEffect(() => {
    FetchData()
  }, [])

  // delete student
  const deleteStudent = async (id) => {
    try {
      alert("Student deleted successfully " + id)
      const result = data.filter((val) => val.id !== id)
      setData(result)
      await axios.delete(`http://localhost:3000/students/${id}`)
      console.log("Successfully deleted student")
    } catch (err) {
      console.log("Failed to delete")
    }
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Student Records</h4>
            <NavLink to='/' className="btn btn-light btn-sm fw-bold">+ Add New Student</NavLink>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Course</th>
                    <th>Batch Code</th>
                    <th>Joining Date</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    data.map((val, index) => (
                      <tr key={index}>
                        <td>{val.FullName}</td>
                        <td>{val.Email}</td>
                        <td>{val.ContactNumber}</td>
                        <td>{val.Course}</td>
                        <td>{val.BatchCode}</td>
                        <td>{val.JoiningDate}</td>
                        <td>{val.Remarks}</td>
                        <td>
                          <i className='fa fa-trash fw-bold text-danger me-3'
                            onClick={() => { window.confirm('Are you sure?') ? deleteStudent(val.id) : null }}
                            style={{ cursor: "pointer" }}>
                          </i>
                          <i className='fa fa-edit fw-bold text-success' style={{ cursor: "pointer" }}></i>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Student_data