import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputBox = {
  padding: "12px",
  margin: "5px 0",
  width: "100%",
  borderRadius: "10px",
  border: "1px solid #000000ff",
  fontSize: "16px",
};

function Main() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState([
    { id: 1, name: "fname", type: "text", placeholder: "First Name", value: "", error: false, errormsg: "" },
    { id: 2, name: "lname", type: "text", placeholder: "Last Name", value: "", error: false, errormsg: "" },
    { id: 3, name: "username", type: "text", placeholder: "Username", value: "", error: false, errormsg: "" },
    { id: 4, name: "email", type: "email", placeholder: "Email", value: "", error: false, errormsg: "" },
    { id: 5, name: "password", type: "password", placeholder: "Password", value: "", error: false, errormsg: "" },
    { id: 6, name: "countryCode", type: "text", placeholder: "Country Code (+91)", value: "", error: false, errormsg: "" },
    { id: 7, name: "phone", type: "number", placeholder: "Phone Number", value: "", error: false, errormsg: "" },
    { id: 8, name: "country", type: "text", placeholder: "Country", value: "", error: false, errormsg: "" },
    { id: 9, name: "city", type: "text", placeholder: "City", value: "", error: false, errormsg: "" },
    { id: 10, name: "pan", type: "text", placeholder: "PAN Number", value: "", error: false, errormsg: "" },
    { id: 11, name: "aadhar", type: "number", placeholder: "Aadhaar Number", value: "", error: false, errormsg: "" }
  ]);

 
  const handleChange = (id, val) => {
    setFormData(prev =>
      prev.map(field =>
        field.id === id ? { ...field, value: val } : field
      )
    );
  };

 
  const validateField = (name, value) => {
    if (value.trim() === "") return "This field is required";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid Email";
    }

    if (name === "username") {
      if (value.length < 4) return "Username must be 4+ characters";
    }

    if (name === "countryCode") {
      const codeRegex = /^\+\d{1,3}$/;
      if (!codeRegex.test(value)) return "Invalid Country Code (Example: +91)";
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) return "Phone must be 10 digits";
    }

    if (name === "pan") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value.toUpperCase())) return "Invalid PAN (ABCDE1234F)";
    }

    if (name === "aadhar") {
      const aadharRegex = /^[0-9]{12}$/;
      if (!aadharRegex.test(value)) return "Aadhaar must be 12 digits";
    }

    return ""; 
  };

 
  const handleBlur = (id, value, name) => {
    let message = validateField(name, value);

    setFormData(prev =>
      prev.map(field =>
        field.id === id ? { ...field, error: !!message, errormsg: message } : field
      )
    );
  };

  const checkfields = (e) => {
    e.preventDefault();

    let errorfound = false;

    const updated = formData.map(field => {
      let msg = validateField(field.name, field.value);
      if (msg) errorfound = true;

      return { ...field, error: !!msg, errormsg: msg };
    });

    setFormData(updated);

    if (errorfound) return;

    navigate("/secondarypage", { state: updated });
  };

  const eyeOpen = "/view.png";
  const eyeClosed = "/eye.png";

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px",
      background: "linear-gradient(135deg, #a57dd0ff 0%, #2575fc 100%)"
    }}>
      <form onSubmit={checkfields}
        style={{ width: "430px", background: "white", padding: "30px",
          borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registration Form</h2>

        {formData.map(field => (
          <div key={field.id} style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "15px", fontWeight: 700, color: "#636161ff" }}>
              {field.placeholder}
            </label>

        
            {field.name === "password" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id, field.value, field.name)}
                  style={{ ...inputBox, border: field.error ? "1px solid red" : "#827e7eff" }}
                />

                <button
                  type="button"
                  style={{ border: "none", background: "none", cursor: "pointer" }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <img
                    src={passwordVisible ? eyeOpen : eyeClosed}
                    style={{ width: "24px" }}
                  />
                </button>
              </div>
            ) : (
              <input
                type={field.type}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field.id, field.value, field.name)}
                style={{ ...inputBox, border: field.error ? "1px solid red" : "#919090ff"}}
              />
            )}

            <div style={{ color: "red", fontSize: "12px" }}>{field.error ? field.errormsg : ""}</div>
          </div>
        ))}

        <button type="submit"
          style={{
            width: "100%", padding: "12px", background: "#2575fc",
            color: "white", borderRadius: "10px", border: "none", fontSize: "18px"
          }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Main;





