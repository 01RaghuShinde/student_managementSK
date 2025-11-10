import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  // Get student ID from URL
  const { id } = useParams();

  const [data, setData] = useState({
    FullName: '',
    Email: '',
    ContactNumber: '',
    Course: '',
    BatchCode: '',
    JoiningDate: '',
    Remarks: ''
  });

  const nav = useNavigate();

  // Fetch student details by ID when page loads
  useEffect(() => {
    axios.get(`http://localhost:3000/students/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch student data", err));
  }, [id]);

  // Handle input
  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Update form
  const updateForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/students/${id}`, data);
      alert("✅ Student updated successfully!");
      nav('/student_data'); // redirect back to student list
    } catch (err) {
      alert("❌ Failed to update student");
      console.error("Update error:", err);
    }
  };

  return (
    <>
      <div className="container-fluid shadow-lg fw-bold p-5">
        <h3 className="text-center mb-3 text-primary">Edit Student 📝</h3>

        <form onSubmit={updateForm}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="FullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="FullName"
                name="FullName"
                value={data.FullName}
                onChange={dataHandler}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                name="Email"
                value={data.Email}
                onChange={dataHandler}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ContactNumber" className="form-label">Contact Number</label>
              <input
                type="number"
                className="form-control"
                id="ContactNumber"
                name="ContactNumber"
                value={data.ContactNumber}
                onChange={dataHandler}
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Course" className="form-label">Course</label>
              <select
                className="form-control"
                id="Course"
                name="Course"
                value={data.Course}
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
              <label htmlFor="BatchCode" className="form-label">Batch Code</label>
              <input
                type="text"
                className="form-control"
                id="BatchCode"
                name="BatchCode"
                value={data.BatchCode}
                onChange={dataHandler}
                placeholder="Enter batch code"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="JoiningDate" className="form-label">Joining Date</label>
              <input
                type="date"
                className="form-control"
                id="JoiningDate"
                name="JoiningDate"
                value={data.JoiningDate}
                onChange={dataHandler}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="Remarks" className="form-label">Remarks</label>
            <textarea
              className="form-control"
              id="Remarks"
              name="Remarks"
              rows="3"
              value={data.Remarks}
              onChange={dataHandler}
              placeholder="Enter any remarks..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100">Update</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
