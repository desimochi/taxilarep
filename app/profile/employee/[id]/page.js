"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { 
  PencilIcon, 
  Save, 
  X, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  IdCard,
  Building
} from "lucide-react";

export default function EmployeeProfile() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await authFetch(`employee-viewset/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const result = await res.json();
        setData(result.data);
        setFormData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleEdit = () => {
    setEditing(!editing);
    if (editing) {
      // Reset changes if cancelling
      setFormData(data);
      setEditedFields({});
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Handle nested fields like user.email
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: fieldValue
        }
      }));
      setEditedFields(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: fieldValue
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: fieldValue }));
      setEditedFields(prev => ({ ...prev, [name]: fieldValue }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (Object.keys(editedFields).length === 0) {
        alert("No changes to save.");
        return;
      }

      const res = await authFetch(`employee-viewset/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFields),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update employee");
      }

      const updatedData = await res.json();
      setData(formData);
      setEditedFields({});
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
      alert("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const EditableField = ({ label, name, value, type = 'text', options = null, required = false, icon = null }) => {
    const fieldValue = name.includes('.') ? 
      name.split('.').reduce((obj, key) => obj?.[key], formData) : 
      formData[name];

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          {icon}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {editing ? (
          type === 'select' ? (
            <select
              name={name}
              value={fieldValue || ""}
              onChange={handleChange}
              required={required}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            >
              <option value="">Select {label}</option>
              {options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              name={name}
              value={fieldValue || ""}
              onChange={handleChange}
              required={required}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-vertical"
            />
          ) : type === 'checkbox' ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                name={name}
                checked={fieldValue || false}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {fieldValue ? 'Yes' : 'No'}
              </span>
            </div>
          ) : (
            <input
              type={type}
              name={name}
              value={fieldValue || ""}
              onChange={handleChange}
              required={required}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          )
        ) : (
          <div className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-700">
            {type === 'checkbox' ? 
              (fieldValue ? 'Yes' : 'No') : 
              (fieldValue || 'N/A')
            }
          </div>
        )}
      </div>
    );
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {data.first_name?.[0]}{data.last_name?.[0]}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {data.salutation?.name} {data.first_name} {data.last_name}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.designation?.name && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {data.designation.name}
                        </span>
                      )}
                      {data.employee_role?.[0]?.name && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {data.employee_role[0].name}
                        </span>
                      )}
                      {data.employee_type && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {data.employee_type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                  {data.user?.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {data.user.email}
                    </div>
                  )}
                  {data.contact_no && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {data.contact_no}
                    </div>
                  )}
                  {data.institute_department?.name && (
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {data.institute_department.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                {editing ? (
                  <>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-blue-50 p-4 rounded-t-xl border-b border-blue-200">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  required
                  icon={<User className="h-4 w-4" />}
                />
                <EditableField
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  required
                  icon={<User className="h-4 w-4" />}
                />
                <EditableField
                  label="Email"
                  name="user.email"
                  value={formData.user?.email}
                  type="email"
                  required
                  icon={<Mail className="h-4 w-4" />}
                />
                <EditableField
                  label="Contact Number"
                  name="contact_no"
                  value={formData.contact_no}
                  type="tel"
                  icon={<Phone className="h-4 w-4" />}
                />
                <EditableField
                  label="Date of Birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  type="date"
                  icon={<Calendar className="h-4 w-4" />}
                />
                <EditableField
                  label="Date of Joining"
                  name="date_of_joining"
                  value={formData.date_of_joining}
                  type="date"
                  icon={<Calendar className="h-4 w-4" />}
                />
                <EditableField
                  label="Blood Group"
                  name="blood_group"
                  value={formData.blood_group}
                  type="select"
                  options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
                />
                <EditableField
                  label="Employee Type"
                  name="employee_type"
                  value={formData.employee_type}
                  type="select"
                  options={['Teaching', 'Non-Teaching', 'Administrative']}
                />
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-green-50 p-4 rounded-t-xl border-b border-green-200">
              <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address & Contact
              </h2>
            </div>
            <div className="p-6">
              <EditableField
                label="Address"
                name="address"
                value={formData.address}
                type="textarea"
                icon={<MapPin className="h-4 w-4" />}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField
                  label="City"
                  name="city"
                  value={formData.city}
                />
                <EditableField
                  label="State"
                  name="state"
                  value={formData.state}
                />
                <EditableField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                />
                <EditableField
                  label="Biometric ID"
                  name="biometric_id"
                  value={formData.biometric_id}
                  icon={<IdCard className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-purple-50 p-4 rounded-t-xl border-b border-purple-200">
              <h2 className="text-xl font-semibold text-purple-800 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <EditableField
                  label="Appointment Type"
                  name="appointment_type"
                  value={formData.appointment_type}
                  type="select"
                  options={['Regular', 'Contract', 'Visiting', 'Guest', 'Part-time']}
                />
                <EditableField
                  label="Teaching Experience (Years)"
                  name="teaching_exprience"
                  value={formData.teaching_exprience}
                  type="number"
                />
                <EditableField
                  label="Research Experience (Years)"
                  name="research_exprience"
                  value={formData.research_exprience}
                  type="number"
                />
                <EditableField
                  label="Industry Experience (Years)"
                  name="industry_exprience"
                  value={formData.industry_exprience}
                  type="number"
                />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-orange-50 p-4 rounded-t-xl border-b border-orange-200">
              <h2 className="text-xl font-semibold text-orange-800 flex items-center gap-2">
                <User className="h-5 w-5" />
                Family & Documents
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <EditableField
                  label="Father's Name"
                  name="father_name"
                  value={formData.father_name}
                />
                <EditableField
                  label="Mother's Name"
                  name="mother_name"
                  value={formData.mother_name}
                />
                <EditableField
                  label="Aadhar Number"
                  name="aadhar_no"
                  value={formData.aadhar_no}
                  icon={<IdCard className="h-4 w-4" />}
                />
                <EditableField
                  label="PAN Number"
                  name="pan_no"
                  value={formData.pan_no}
                  icon={<IdCard className="h-4 w-4" />}
                />
                <EditableField
                  label="Archived"
                  name="is_archived"
                  value={formData.is_archived}
                  type="checkbox"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Education */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-indigo-50 p-4 rounded-t-xl border-b border-indigo-200">
              <h3 className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </h3>
            </div>
            <div className="p-6">
              {data.education?.length > 0 ? (
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-sm text-gray-600">{edu.institution}</div>
                      <div className="text-sm text-gray-500">{edu.year}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No education records added</p>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-teal-50 p-4 rounded-t-xl border-b border-teal-200">
              <h3 className="text-lg font-semibold text-teal-800 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience
              </h3>
            </div>
            <div className="p-6">
              {data.experience?.length > 0 ? (
                <div className="space-y-3">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{exp.position}</div>
                      <div className="text-sm text-gray-600">{exp.company}</div>
                      <div className="text-sm text-gray-500">{exp.duration}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No experience records added</p>
              )}
            </div>
          </div>

          {/* Publications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-red-50 p-4 rounded-t-xl border-b border-red-200">
              <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Publications
              </h3>
            </div>
            <div className="p-6">
              {data.publications?.length > 0 ? (
                <div className="space-y-3">
                  {data.publications.map((pub, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{pub.title}</div>
                      <div className="text-sm text-gray-600">{pub.journal}</div>
                      <div className="text-sm text-gray-500">{pub.year}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No publications added</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}