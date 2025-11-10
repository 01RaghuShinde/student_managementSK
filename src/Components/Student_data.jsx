import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Student_data = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate(); // ✅ for navigation

  // Fetch all students
  const FetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3000/students')
      setData(result.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    FetchData()
  }, [])

  // Delete student
  const deleteStudent = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this student?')) {
        await axios.delete(`http://localhost:3000/students/${id}`)
        alert("Student deleted successfully!")
        setData(data.filter((val) => val.id !== id))
      }
    } catch (err) {
      console.log("Failed to delete", err)
    }
  }

  // ✅ Navigate to Edit page with that student's ID
  const editStudent = (id) => {
    navigate(`/edit/${id}`)
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
                        <td>{val.fullName}</td>
                        <td>{val.email}</td>
                        <td>{val.contactNumber}</td>
                        <td>{val.course}</td>
                        <td>{val.batchCode}</td>
                        <td>{val.joiningDate}</td>
                        <td>{val.remarks}</td>
                        <td>
                          {/* DELETE ICON */}
                          <i
                            className='fa-solid fa-trash text-danger me-3'
                            onClick={() => deleteStudent(val.id)}
                            style={{ cursor: "pointer" }}
                            title="Delete Student"
                          ></i>

                          {/* EDIT ICON */}
                          <i
                            className='fa-solid fa-pen-to-square text-success'
                            onClick={() => editStudent(val.id)} // ✅ navigate to edit page
                            style={{ cursor: "pointer" }}
                            title="Edit Student"
                          ></i>
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
