import axios from "axios";
import { useState } from "react";

function Upload() {
   const [file,setFile]=useState(null);
   const [message,setMessage]=useState('')

 async function handleUpload(e) {
    e.preventDefault();
    const formData=new FormData;
    formData.append('file',file);

    try {
        const token=localStorage.getItem('token')
        const response=await axios.post("http://localhost:8000/list/upload",formData, {

      });
      setMessage(response.data.message)
    } catch (error) {
        setMessage(error.response?.data?.message || "Upload Failed")
    }

  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload CSV</h2>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full mb-4 border"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
        {message && <p className="mt-2 text-center text-blue-700">{message}</p>}
      </form>
    </div>
  );
}

export default Upload;
