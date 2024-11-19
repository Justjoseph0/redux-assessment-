import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/usersSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    const id = users[users.length - 1].id + 1;

    e.preventDefault();
    dispatch(addUser(name, email, role, status, id));

    setName("");
    setEmail("");
    setRole("");
    setStatus("");
    navigate("/");
  };

  return (
    <div className="lg:w-[50%] w-full mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="">Select a role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
