import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:8000/events/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event List</h2>
      <ul className="space-y-2">
        {events.map((event: any) => (
          <li key={event.id} className="border p-2 rounded">{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
