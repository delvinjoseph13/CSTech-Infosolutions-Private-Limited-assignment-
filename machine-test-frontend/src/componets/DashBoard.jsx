import { Link } from "react-router-dom";
function DashBoard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <nav className="space-x-4">
        <Link
          to="/agents"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Manage Agents
        </Link>
        <Link
          to="/upload"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Upload List
        </Link>
      </nav>
    </div>
  );
}

export default DashBoard;
