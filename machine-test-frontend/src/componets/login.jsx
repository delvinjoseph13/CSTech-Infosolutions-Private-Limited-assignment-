import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {

  //formdata for the input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

   //setting the form data 
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }


  //function for login
  async function handleSubmit(e) {
    e.preventDefault();
    const newError = {};
    if (!formData.email.trim()) {
      newError.email = "Email is Required";
    }
    if (!formData.password.trim()) {
      newError.password = "Password is Required";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      navigate('/dashboard')
    } catch (error) {
         setError({ form: error.response?.data?.message || "Login failed" });

    }
  }
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />
         {error.email && <p className="text-red-500 text-sm mb-2">{error.email}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />
        {error.password && (
          <p className="text-red-500 text-sm mt-2">{error.password}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <span>If not Registered go to <Link to='/register' className="text-blue-400">Register</Link></span>
        {error.form && <p className="text-red-500 text-sm mt-2">{error.form}</p>}
      </form>
    </div>
  );
}
export default Login;
