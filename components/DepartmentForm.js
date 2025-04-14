import { CrossIcon } from "lucide-react";

export default function DepartmentForm({heading, data, onChange, onSubmit, actionType, popup }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px] max-w-full">
        <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
          {actionType === "add" ? `Add A New ${heading}` : `Edit ${heading}`}
          <CrossIcon className="h-4 w-4 rotate-45"onClick={()=>popup(false)} />
        </h2>
       
        <hr className="border border-b-2 mt-3 mb-6" />
  
        <label className="font-bold">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
  
        <label className="font-bold mt-3">Description</label>
        <input
          type="text"
          name="description"
          value={data.description}
          onChange={onChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
  
        <label className="font-bold mt-3">Active Status</label>
        <select
          name="is_active"
          className="border p-2 w-full rounded mb-4"
          value={data.is_active}
          onChange={onChange}
        >
          <option value="">Select A Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
  
        <div className="mt-4 flex justify-start gap-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={onSubmit}
          >
            {actionType === "add" ? "Submit" : "Save Changes"}
          </button>
        </div>
      </div>
    );
  }
  