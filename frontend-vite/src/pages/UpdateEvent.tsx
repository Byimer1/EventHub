import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEvent() {
  const { id } = useParams(); // Get event ID from URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:8000/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setLocation(data.location || "");
        setStartTime(data.start_time?.slice(0, 16));
        setEndTime(data.end_time?.slice(0, 16));
      } catch (err) {
        setError("Could not load event");
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          start_time: startTime,
          end_time: endTime,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail);
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full mb-4 p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="datetime-local"
          className="w-full mb-4 p-2 border rounded"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input
          type="datetime-local"
          className="w-full mb-4 p-2 border rounded"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
    </div>
  );
}
