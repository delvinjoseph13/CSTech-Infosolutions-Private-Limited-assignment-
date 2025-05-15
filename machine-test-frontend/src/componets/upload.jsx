import axios from "axios";
import { useEffect, useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [lists, setLists] = useState([]);
  const [message, setMessage] = useState("");

  // Upload file
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/list/upload",
        formData
      );
      setMessage(response.data.message);
      fetchLists();
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed.");
    }
  };

  // Fetch lists
  const fetchLists = async () => {
    const res = await axios.get("http://localhost:8000/list/distributed");
    setLists(res.data);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Upload List CSV/XLSX
          </h2>

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Upload File
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-blue-600">{message}</p>
          )}
        </form>

        {/* Distributed Lists */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[70vh]">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Distributed Lists by Agent
          </h3>

          {lists.length === 0 ? (
            <p className="text-gray-500">No lists available.</p>
          ) : (
            lists.map((agent, index) => (
              <div key={index} className="mb-6 border-b pb-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  Agent: <span className="font-semibold">{agent.name}</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {agent.lists.map((listItem, i) => (
                    <li key={i}>
                      {listItem.FirstName} - {listItem.Phone} -{" "}
                      {listItem.Notes}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
