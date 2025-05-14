import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register(){

    const [formData,setFormData]=useState({
        email:'',
        password:''
    })

    const [error,setError]=useState({})
    const navigate=useNavigate();

    function handleChange(e){
          setFormData({
            ...formData,
            [e.target.name]:e.target.value
          })

    }

   async function handleSubmit(e){
        e.preventDefault();

        const newError={};
        if(!formData.email.trim()){
            newError.email="Please enter the email"
        }
        if(!formData.password.trim()){
            newError.password="Please enter the password"
        }

        if(Object.keys(newError).length>0){
            setError(newError);
            return;
        }

        try {
            const response=await axios.post(`http://localhost:8000/auth/register`,formData)
            if(response.status==201){
                alert("User Registered")
            }
            navigate('/')
            

        } catch (error) {
            alert(error.message|| "Error")
        }

    }
     return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Admin Register</h2>
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
          Register
        </button>
        <span>If  Registered go to login <Link to='/' className="text-blue-400">Login</Link></span>

        {error.form && <p className="text-red-500 text-sm mt-2">{error.form}</p>}
      </form>
    </div>
  );
}
export default Register;