import { useState, useEffect } from 'react';
import api from '../lib/api.js';

export default function ContactManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/contact');
      setMessages(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`);
      await fetchMessages();
    } catch (err) {
      setError('Failed to update message');
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      await fetchMessages();
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-on-surface-variant">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-on-surface-variant text-center py-12">No messages yet</div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-border rounded-xl p-4 ${
                msg.status === 'new' ? 'bg-secondary-container/10' : 'bg-surface/50'
              } backdrop-blur`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">{msg.name}</h3>
                  <p className="text-sm text-on-surface-variant">{msg.email}</p>
                </div>
                <span
                  className={`text-xs font-label-mono px-2 py-1 rounded ${
                    msg.status === 'new'
                      ? 'bg-tertiary/30 text-tertiary'
                      : 'bg-on-surface-variant/20 text-on-surface-variant'
                  }`}
                >
                  {msg.status.toUpperCase()}
                </span>
              </div>

              <p className="text-sm font-label-mono text-on-surface-variant mb-3">
                {msg.subject}
              </p>

              <p className="text-on-surface mb-4 text-sm leading-relaxed">{msg.message}</p>

              <div className="flex gap-2">
                {msg.status === 'new' && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="px-3 py-1 bg-tertiary/20 hover:bg-tertiary/30 text-tertiary rounded text-sm font-label-mono transition"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="px-3 py-1 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded text-sm font-label-mono transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
