import api from './axios';

export interface Event {
  id: number;
  title: string;
  description?: string;
  location?: string;
  start_time: string;
  end_time: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await api.get('/events/');
  return res.data;
};

export const updateEvent = async (id: number, data: Partial<Event>, token: string) => {
  const res = await api.put(`/events/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;

  

};

export const deleteEvent = async (eventId: number, token: string) => {
    const res = await fetch(`http://localhost:8000/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || 'Failed to delete event');
    }
  
    return true;
  };
  