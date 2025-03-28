import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description?: string;
  location?: string;
  start_time: string;
  end_time: string;
  organizer_email: string;
  created_at: string;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/events/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch events');

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError('Unable to load events');
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8000/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete');

      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.start_time).toLocaleString()} -{' '}
              {new Date(event.end_time).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Organized by: {event.organizer_email}
            </p>
            <button
              onClick={() => navigate(`/update/${event.id}`)}
              className="mt-2 mr-4 text-sm text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
