import { useEffect, useState } from 'react';
import { fetchEvents, updateEvent, Event } from '../api/events';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Event>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setError('Failed to fetch events'));
  }, []);

  const handleEdit = (event: Event) => {
    setEditing(event.id);
    setEditData({ ...event });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in');
      return;
    }

    if (!editing || !editData.title?.trim()) {
      alert('Title is required');
      return;
    }

    try {
      const updated = await updateEvent(editing, editData, token);
      setEvents(events.map(ev => (ev.id === editing ? updated : ev)));
      setEditing(null);
      setError('');
    } catch {
      setError('Failed to update event');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {events.map(event => (
        <div key={event.id} className="mb-4 border p-4 rounded shadow">
          {editing === event.id ? (
            <>
              <input
                className="border p-2 mb-2 w-full rounded"
                value={editData.title || ''}
                onChange={e => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                className="border p-2 mb-2 w-full rounded"
                value={editData.description || ''}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
                placeholder="Description"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSave}
                disabled={!editData.title?.trim()}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  setEditing(null);
                  setEditData({});
                  setError('');
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.start_time).toLocaleString()}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
