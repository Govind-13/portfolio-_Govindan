import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import ProjectsManager from './ProjectsManager.jsx';
import ContactManager from './ContactManager.jsx';
import Icon from '../components/Icon.jsx';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="glass-border bg-surface/80 backdrop-blur-lg border-b border-tertiary/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display-lg text-on-surface">Dashboard</h1>
            <p className="text-sm text-on-surface-variant">Welcome, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-secondary-container/20 hover:bg-secondary-container/30 text-secondary-container rounded-lg transition text-sm font-label-mono"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8 border-b border-tertiary/10">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-3 font-label-mono text-sm transition border-b-2 ${
              activeTab === 'projects'
                ? 'border-tertiary text-tertiary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-3 font-label-mono text-sm transition border-b-2 ${
              activeTab === 'messages'
                ? 'border-tertiary text-tertiary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Messages
          </button>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'messages' && <ContactManager />}
        </div>
      </div>
    </div>
  );
}
