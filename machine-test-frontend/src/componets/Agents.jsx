import axios from "axios";
import { useEffect, useState } from "react";

function Agents() {
  //useState for input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  //setting the form data 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  }

  //submitting the form data
  async function handleSubmit(e) {
    e.preventDefault();

    const newError = {};
    if (!formData.name.trim()) newError.name = "Please enter your name";
    if (!formData.email.trim()) newError.email = "Please enter your email";
    if (!formData.password.trim()) newError.password = "Please enter your password";
    if (!formData.mobileNo.trim()) newError.mobileNo = "Please enter your mobile number";

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/agent/addgents",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Agent Added Successfully");
      setFormData({ name: "", email: "", password: "", mobileNo: "" });
      setError({});
    } catch (err) {
      setError({ form: err.response?.data?.message || "Request failed" });
    }
  }
 
  //useEffect for timer for success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center mb-4 font-semibold text-2xl">Add Agent</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}

        <input
          type="tel"
          name="mobileNo"
          placeholder="Mobile Number"
          value={formData.mobileNo}
          maxLength={10}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        {error.mobileNo && <p className="text-red-500 text-sm mt-1">{error.mobileNo}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>

        {error.form && <p className="text-red-500 text-sm mt-3 text-center">{error.form}</p>}
        {success && <p className="text-green-500 text-sm mt-3 text-center">{success}</p>}
      </form>
    </div>
  );
}

export default Agents;
