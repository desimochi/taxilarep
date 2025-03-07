'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        user: {
          email: data.email,
          user_type: 'STUDENT',
        },
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        contact_number: data.contact_number,
        blood_group: data.blood_group,
        date_of_birth: data.date_of_birth,
        aadhar_number: data.aadhar_number,
        tenth_score_type: data.tenth_score_type,
        tenth_score: parseFloat(data.tenth_score),
        twelfth_score_type: data.twelfth_score_type,
        twelfth_score: parseFloat(data.twelfth_score),
        graduation_background: data.graduation_background,
        graduation_score_type: data.graduation_score_type,
        graduation_score: parseFloat(data.graduation_score),
        date_of_joining: data.date_of_joining,
        gender: data.gender,
        caste: data.caste,
        score_card: data.score_card,
        experience_status: data.experience_status,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        father_name: data.father_name,
        father_contact_number: data.father_contact_number,
        father_email: data.father_email,
        father_aadhar_number: data.father_aadhar_number,
        mother_name: data.mother_name,
        mother_contact_number: data.mother_contact_number,
        mother_email: data.mother_email,
        mother_aadhar_number: data.mother_aadhar_number,
        batch: parseInt(data.batch),
        student_role: parseInt(data.student_role),
        experience_details: [
          {
            company_name: data.company_name,
            experience_in_months: parseInt(data.experience_in_months),
            industry: data.industry,
          },
        ],
        course: parseInt(data.course),
        taxila_roll_number: data.taxila_roll_number,
        aicte_permanent_id: data.aicte_permanent_id,
        religion: data.religion,
        district: data.district,
        pwd: data.pwd === 'true',
        dropped: data.dropped === 'true',
        passout_status: data.passout_status === 'true',
      };

      setMessage(payload);
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Student Registration Form</h2>
      {message && <pre className="mb-4 text-center font-semibold">{JSON.stringify(message, null, 2)}</pre>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email', { required: true })} placeholder="Email" className="input-field" />
        <input {...register('first_name', { required: true })} placeholder="First Name" className="input-field" />
        <input {...register('middle_name')} placeholder="Middle Name" className="input-field" />
        <input {...register('last_name', { required: true })} placeholder="Last Name" className="input-field" />
        <input {...register('contact_number', { required: true })} placeholder="Contact Number" className="input-field" />
        <select {...register('blood_group', { required: true })} className="input-field">
        <option value="">-- Select --</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
        </select>
        <input type="date" {...register('date_of_birth', { required: true })} className="input-field" />
        <input {...register('aadhar_number', { required: true })} placeholder="Aadhar Number" className="input-field" />
        <select {...register('tenth_score_type', { required: true })} className="input-field">
          <option value="Percentage">Percentage</option>
          <option value="CGPA">CGPA</option>
        </select>
        <input {...register('tenth_score', { required: true })} placeholder="10th Score" className="input-field" />
        <select {...register('twelfth_score_type', { required: true })} className="input-field">
          <option value="Percentage">Percentage</option>
          <option value="CGPA">CGPA</option>
        </select>
        <input {...register('twelfth_score', { required: true })} placeholder="12th Score" className="input-field" />
        <input {...register('graduation_background', { required: true })} placeholder="Graduation background" className="input-field" />
        <select {...register('graduation_score_type', { required: true })} className="input-field">
          <option value="Percentage">Percentage</option>
          <option value="CGPA">CGPA</option>
        </select>
        <input {...register('graduation_score', { required: true })} placeholder="Graduation Score" className="input-field" />
        <input type='date' {...register('date_of_joining', { required: true })}  className="input-field" />
        <select {...register('gender', { required: true })} className="input-field">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select {...register('caste', { required: true })} className="input-field">
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC/ST">SC/ST</option>
          <option value="Tribal">Tribal</option>
        </select>
        <input type='file' {...register('score_card', { required: true })} className="input-field" />
        <select {...register('experience_status', { required: true })} className="input-field">
          <option value="Experienced">Experienced</option>
          <option value="Non-Experienced">Non-Experienced</option>
        </select>
        <input {...register('address', { required: true })} placeholder="Address" className="input-field" />
        <input {...register('city', { required: true })} placeholder="City" className="input-field" />
        <input {...register('state', { required: true })} placeholder="State" className="input-field" />
        <input {...register('district', { required: true })} placeholder="District" className="input-field" />
        <input type='number' {...register('pincode', { required: true, maxLength:6 })} placeholder="Pincode" className="input-field" />
        <input {...register('father_name', { required: true })} placeholder="Father Name" className="input-field" />
        <input type='number' {...register('father_contact_number', { required: true })} placeholder="Father Mobile No." className="input-field" />
        <input type='email' {...register('father_email', { required: true })} placeholder="Father Email" className="input-field" />
        <input {...register('father_aadhar_number', { required: true })} placeholder="Father Adhar No. Name" className="input-field" />
        <input {...register('mother_name', { required: true })} placeholder="Mother Name" className="input-field" />
        <input type='number' {...register('mother_contact_number', { required: true })} placeholder="Mother No." className="input-field" />
        <input type='email' {...register('mother_email', { required: true })} placeholder="Mother email" className="input-field" />
        <input {...register('mother_aadhar_number', { required: true })} placeholder="Mother Adhar No." className="input-field" />
        <input type='number' {...register('batch', { required: true })} placeholder="Batch" className="input-field" />
        <input type='number' {...register('student_role', { required: true })} placeholder="Student Role" className="input-field" />
        <input type='number' {...register('course', { required: true })} placeholder="Course" className="input-field" />
        <input {...register('company_name', { required: true })} placeholder="Company Name" className="input-field" />
        <input {...register('experience_in_months', { required: true })} placeholder="Experience in Months" className="input-field" />
        <input {...register('industry', { required: true })} placeholder="Industry" className="input-field" />
        <input {...register('taxila_roll_number', { required: true })} placeholder="Taxila Roll Number" className="input-field" />
        <input {...register('aicte_permanent_id', { required: true })} placeholder="AICTE Permanent ID" className="input-field" />
        <input {...register('religion', { required: true })} placeholder="Religion" className="input-field" />
        <select {...register('pwd', { required: true })} className="input-field">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select {...register('dropped', { required: true })} className="input-field">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select {...register('passout_status', { required: true })} className="input-field">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
}