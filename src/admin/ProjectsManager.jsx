import { useState, useEffect } from 'react';
import api from '../lib/api.js';
import Icon from '../components/Icon.jsx';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    technologies: '',
    link: '',
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
      };

      if (editId) {
        await api.put(`/projects/${editId}`, payload);
      } else {
        await api.post('/projects', payload);
      }

      setFormData({
        title: '',
        description: '',
        image: '',
        category: '',
        technologies: '',
        link: '',
        featured: false,
      });
      setShowForm(false);
      setEditId(null);
      await fetchProjects();
    } catch (err) {
      setError('Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies.join(', '),
    });
    setEditId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/projects/${id}`);
      await fetchProjects();
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditId(null);
          if (showForm) {
            setFormData({
              title: '',
              description: '',
              image: '',
              category: '',
              technologies: '',
              link: '',
              featured: false,
            });
          }
        }}
        className="px-4 py-2 bg-secondary-container hover:bg-secondary-container/90 text-background rounded-lg font-bold transition"
      >
        {showForm ? 'Cancel' : '+ New Project'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-border bg-surface/80 backdrop-blur-lg rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="px-4 py-2 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary"
            />
          </div>

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary"
            rows="3"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="px-4 py-2 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary"
            />
            <input
              type="url"
              placeholder="Project Link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="px-4 py-2 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary"
            />
          </div>

          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-tertiary/30 rounded-lg text-on-surface focus:outline-none focus:border-tertiary"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-on-surface text-sm">Featured</span>
          </label>

          <button
            type="submit"
            className="w-full py-2 bg-tertiary hover:bg-tertiary/90 text-background font-bold rounded-lg transition"
          >
            {editId ? 'Update' : 'Create'} Project
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-on-surface-variant">Loading projects...</div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="glass-border bg-surface/50 backdrop-blur rounded-xl p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-on-surface">{project.title}</h3>
                <p className="text-on-surface-variant text-sm mt-1">{project.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-tertiary/20 hover:bg-tertiary/30 text-tertiary rounded text-sm font-label-mono transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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
