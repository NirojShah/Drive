import React, { useState } from 'react';
import { axiosInstance } from '../../helper/axiosInstance';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const {data} = await axiosInstance.post("/user/create",{...formData})
    }catch(err){
        console.log("error")
    }
  };

  return (
    <div style={{display:"flex",height:"100vh",width:"100vw",alignItems:"center",justifyContent:"center",flexDirection:"column",border:"1px solid blue"}}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
