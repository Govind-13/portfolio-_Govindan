import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/30 to-background/95 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="glass-border bg-surface/80 backdrop-blur-lg rounded-3xl p-8">
          <h1 className="text-4xl font-display-lg text-on-surface mb-2">Admin</h1>
          <p className="text-on-surface-variant mb-8">Sign in to manage your portfolio</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-label-mono text-on-surface-variant mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-label-mono text-on-surface-variant mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-secondary-container hover:bg-secondary-container/90 text-background font-bold rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
