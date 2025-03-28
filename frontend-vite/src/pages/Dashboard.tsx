import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/events/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        navigate("/login");
      }
    };

    fetchEvents();
  }, [navigate]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Events</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 p-4 rounded shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
