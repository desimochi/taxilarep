"use client"

import { useState } from "react";
import { PencilIcon, SaveIcon, Trash2Icon } from "lucide-react";

const UserTable = () => {
    const [editingRow, setEditingRow] = useState(null); // Track which row is being edited
    const [users, setUsers] = useState([{
        name: "Kishore Sharma",
        email: "k@taxila.in",
        mobile: "9314085231",
        address: "Jaipur",
        role: "Super Admin",
        status: "Active",
    },
    {
        name: "Lavina Khilani",
        email: "lavina@taxila.in",
        mobile: "7418529630",
        address: "Jaipur",
        role: "Admin",
        status: "Inactive",
    },
]); // State for managing user data

    const handleEditClick = (index) => {
        setEditingRow(index); // Set the clicked row as editable
    };

    const handleSaveClick = () => {
        setEditingRow(null); // Disable editing when save is clicked
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedUsers = [...users];
        updatedUsers[index][name] = value;
        setUsers(updatedUsers);
    };

    return (
        <div className="px-5 py-4">
         <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Users</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                    <input type="text" name="name" placeholder="Search User..." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                
                </div>
                
            </div>
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 mt-4">
            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                <tr >
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Mobile</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="mobile"
                                    value={user.mobile}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.mobile
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={user.address}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.address
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="role"
                                    value={user.role}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.role
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={user.status}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.status
                            )}
                        </td>
                        <td className="px-6 py-4 flex justify-start gap-4">
                            <span
                                onClick={() =>
                                    editingRow === index ? handleSaveClick() : handleEditClick(index)
                                }
                                className="cursor-pointer"
                            >
                                {editingRow === index ? (
                                    <SaveIcon className="h-5 w-5 text-green-600" />
                                ) : (
                                    <PencilIcon className="h-5 w-5 text-blue-600" />
                                )}
                            </span>
                            <span className="cursor-pointer">
                                <Trash2Icon className="h-5 w-5 text-red-600" />
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserTable;
