import { useState } from "react";

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    doctor: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${form.doctor} on ${form.date} at ${form.time}`);
    // later -> send this to backend API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Book an Appointment
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        >
          <option value="">Select Doctor</option>
          <option>Dr. Priya Sharma</option>
          <option>Dr. Arjun Patel</option>
          <option>Dr. Meera Iyer</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}
