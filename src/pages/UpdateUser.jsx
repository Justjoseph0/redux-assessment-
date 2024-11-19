import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingUser = useSelector((state) =>
    state.users.find((user) => user.id === parseInt(id))
  );

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    if (existingUser) {
      setUpdateName(existingUser.name);
      setUpdateEmail(existingUser.email);
      setUpdateRole(existingUser.role);
      setUpdateStatus(existingUser.status);
    }
  }, [existingUser]);

  if (!existingUser) {
    return <div>User not found</div>;
  }

  const handleUpdateUser = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(
        parseInt(id),
        updateName,
        updateEmail,
        updateRole,
        updateStatus
      )
    );

    navigate("/");
  };

  return (
    <div className="lg:w-[50%] w-full mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>

      <form onSubmit={handleUpdateUser} className="space-y-4">
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
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
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
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
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
            value={updateRole}
            onChange={(e) => setUpdateRole(e.target.value)}
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
            value={updateStatus}
            onChange={(e) => setUpdateStatus(e.target.value)}
            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="pt-4 flex space-x-4">
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
