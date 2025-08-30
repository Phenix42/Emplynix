import React, { useState, useEffect } from 'react';
import { Users, Briefcase, User, LogOut, UserPlus } from 'lucide-react';
import JobManagement from './JobManagement';
import CandidateManagement from './CandidateManagement';
import { Job } from '../types/Job';
import { Candidate } from '../types/Candidate';
import { CandidateStatus } from '../types/Candidate';
interface AdminDashboardProps {
  onLogout: () => void;
  token: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, token }) => {
  const [activeSection, setActiveSection] = useState<'jobs' | 'candidates'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [loggedInUser, setLoggedInUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);

  /** Fetch logged-in admin info */
  const fetchLoggedInUser = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();
      setLoggedInUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  /** Fetch jobs */
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (res.status === 401 || res.status === 403) {
        const data = await res.json();
        if (data?.message?.toLowerCase().includes('token')) {
          setTokenError('Session expired. Please log in again.');
          localStorage.removeItem('adminToken');
          return;
        }
      }

      if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
      const data: Job[] = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch candidates */
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/candidates`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (res.status === 401 || res.status === 403) {
        const data = await res.json();
        if (data?.message?.toLowerCase().includes('token')) {
          setTokenError('Session expired. Please log in again.');
          localStorage.removeItem('adminToken');
          return;
        }
      }

      if (!res.ok) throw new Error(`Failed to fetch candidates: ${res.status}`);
      const data: Candidate[] = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Update candidate status */
  const updateCandidateStatus = async (candidateId: string, status: CandidateStatus) => {
  try {
    const res = await fetch(`${API_URL}/candidates/${candidateId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update candidate status');

    setCandidates(prev =>
      prev.map(c => (c._id === candidateId ? { ...c, status } : c))
    );
  } catch (err) {
    console.error(err);
  }
};


  /** Create new admin */
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      setFormError('All fields are required');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/create-admin`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(adminForm),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to create admin');

      setFormSuccess('Admin user created successfully');
      setAdminForm({ name: '', email: '', password: '' });
      setTimeout(() => {
        setShowCreateAdminModal(false);
        setFormSuccess(null);
      }, 2000);
    } catch (err: any) {
      setFormError(err.message || 'Error creating admin user');
    }
  };

  useEffect(() => {
    if (!token) {
      setTokenError('No authentication token found. Please log in again.');
      return;
    }
    fetchLoggedInUser();
    fetchJobs();
    fetchCandidates();
  }, [token]);

  if (tokenError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {tokenError}
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              onLogout();
            }}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Log In Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#f8fafc] font-inter">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur shadow-lg px-8 py-6 flex flex-col md:flex-row items-center justify-between border-b border-[#3e94b3]">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-r from-[#3e94b3] to-[#7fbadd] rounded-full flex items-center justify-center shadow-lg">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="font-bold text-lg text-[#3e94b3]">{loggedInUser?.name || 'Admin'}</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
          {['jobs', 'candidates'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section as 'jobs' | 'candidates')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-semibold transition-all duration-200 border ${
                activeSection === section
                  ? 'bg-[#3e94b3] text-white shadow border-[#3e94b3]'
                  : 'text-[#3e94b3] bg-white hover:bg-[#e0f2fe] border-[#3e94b3]'
              }`}
            >
              {section === 'jobs' ? <Briefcase className="h-5 w-5" /> : <Users className="h-5 w-5" />}
              <span>{section === 'jobs' ? 'Jobs' : 'Candidate Management'}</span>
            </button>
          ))}
          <button
            onClick={() => setShowCreateAdminModal(true)}
            className="flex items-center space-x-2 px-6 py-2 rounded-xl font-semibold text-green-700 bg-green-100 hover:bg-green-200 border border-green-300 transition-all duration-200"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add Admin</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              onLogout();
            }}
            className="flex items-center space-x-2 px-6 py-2 rounded-xl font-semibold text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {showCreateAdminModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#3e94b3]">
              <h2 className="text-2xl font-bold mb-6 text-[#3e94b3] text-center flex items-center justify-center gap-2">
                <UserPlus className="h-6 w-6" />
                Create New Admin
              </h2>

              {formError && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-center">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded mb-4 text-center">
                  {formSuccess}
                </div>
              )}

              <form onSubmit={handleCreateAdmin} className="space-y-5">
                {['name', 'email', 'password'].map(field => (
                  <div key={field}>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                      id={field}
                      value={(adminForm as any)[field]}
                      onChange={(e) => setAdminForm({ ...adminForm, [field]: e.target.value })}
                      className="w-full px-4 py-3 border border-[#3e94b3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3] bg-white placeholder-gray-400"
                      required
                    />
                  </div>
                ))}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateAdminModal(false);
                      setAdminForm({ name: '', email: '', password: '' });
                      setFormError(null);
                      setFormSuccess(null);
                    }}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-[#3e94b3] hover:bg-[#7fbadd] text-white rounded-lg font-semibold shadow transition">
                    Create Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeSection === 'jobs' && (
          <JobManagement
            jobs={jobs}
            onJobUpdate={(job) => setJobs(prev => prev.map(j => j._id === job._id ? job : j))}
            onJobDelete={(jobId) => setJobs(prev => prev.filter(j => j._id !== jobId))}
            loading={loading}
            token={token}
            refreshJobs={fetchJobs}
            apiUrl={API_URL} 
          />
        )}

        {activeSection === 'candidates' && (
          <CandidateManagement
            jobs={jobs}
            allCandidates={candidates}
            updateCandidateStatus={updateCandidateStatus}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
