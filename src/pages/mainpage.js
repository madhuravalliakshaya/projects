import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const inputBox = {
  padding: "12px",
  margin: "5px 0",
  width: "100%",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  transition: "0.3s",
};

function Main() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([
    { id: 1, name: "fname", type: "text", placeholder: "First Name", value: "", error: false, errormsg: "" },
    { id: 2, name: "lname", type: "text", placeholder: "Last Name", value: "", error: false, errormsg: "" },
    { id: 3, name: "email", type: "email", placeholder: "Email", value: "", error: false, errormsg: "" },
    { id: 4, name: "password", type: "password", placeholder: "Password", value: "", error: false, errormsg: "" }, 
    { id: 5, name: "age", type: "number", placeholder: "Age", value: "", error: false, errormsg: "" },  
    { id: 6, name: "city", type: "text", placeholder: "City", value: "", error: false, errormsg: ""   },
    {id: 7, name: "country", type: "text", placeholder: "Country", value: "", error: false, errormsg: "" },
    {id: 8, name: "phone", type: "number", placeholder: "Phone Number", value: "", error: false, errormsg: "" },
  ]);

  const checkfields = (e) => {
    e.preventDefault();
    let errorfound = false;

    const updated = formData.map(field => {
      if (field.value.trim() === "") {
        errorfound = true;
        return { ...field, error: true, errormsg: "This field is required" };
      }
      return { ...field, error: false, errormsg: "" };
    });

    setFormData(updated);

    if (!errorfound) {
      navigate("/secondarypage", { state: formData });
    }
  };

  const handleChange = (id, val) => {
    setFormData(prev =>
      prev.map(field =>
        field.id === id ? { ...field, value: val } : field
      )
    );
  };
const publicpath='/eye.png';
const eyeopen='/view.png'
  const handleBlur = (id, val) => {
    setFormData(prev =>
      prev.map(field => {
        if (field.id === id && field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) return { ...field, error: true, errormsg: "Please enter a valid email" };
        }
        if (field.id === id && val.trim() === "") return { ...field, error: true, errormsg: "This field is required" };
        return { ...field, error: false, errormsg: "" };
      })
    );
  };
const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div style={{  display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #a57dd0ff 0%, #2575fc 100%)" }}>
      <form onSubmit={checkfields} style={{ width: "430px", background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registration Form</h2>
        {formData.map(field => (
          <div key={field.id} style={{ marginBottom: "15px" }}>
            
            <label style={{ fontSize: "15px", color: "#939292ff", fontWeight: "600" }}>{field.placeholder}</label>
       {field.id === 4 ? (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      style={{
        ...inputBox,
        border: field.error ? "1px solid red" : "1px solid #ccc",
        background: field.error ? "#f6e3e3ff" : "white",
      }}
      type={passwordVisible ? "text" : "password"}   
      placeholder={field.placeholder}
      value={field.value}
      onChange={e => handleChange(field.id, e.target.value)}  
      onBlur={() => handleBlur(field.id, field.value)}       
    />

    <button
      type="button"
      onClick={() => setPasswordVisible(!passwordVisible)}
      style={{
        width: "30px",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      <img
        src={passwordVisible && eyeopen|| !passwordVisible && publicpath}
        alt="Eye Icon"
        style={{ width: "20px" }}
      />
    </button>
  </div>
) : (

            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={e => handleChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id, field.value)}
              style={{ ...inputBox, border: field.error ? "1px solid red" : "1px solid #ccc", background: field.error ? "#f6e3e3ff" :"white" }}
            />
           )
          }
            <span style={{ color: "red", fontSize: "13px" }}>{field.error ? field.errormsg : ""}</span>
          </div>
        ))}
        <button type="submit" style={{ width: "100%", padding: "12px", background: "#2575fc", color: "white", borderRadius: "10px", fontSize: "18px", border: "none", cursor: "pointer" }}>Submit</button>
      </form>
    </div>
  );
}

export default Main;




