import React, { useState, useEffect } from 'react';
import { Users, Briefcase, User, LogOut } from 'lucide-react';
import JobManagement from './JobManagement';
import CandidateManagement from './CandidateManagement';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
  createdAt: string;
}

interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  experience: number;
  skills: string[];
  status: string;
  appliedDate: string;
  notes?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  interviewDate?: string;
  salary?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
  token: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, token }) => {
  const [activeSection, setActiveSection] = useState<'jobs' | 'candidates'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    setTokenError(null);
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchCandidates();
    } else {
      setTokenError('No authentication token found. Please log in again.');
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      console.log('Fetching jobs with token:', token);
      const res = await fetch(`${API_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      console.log('Fetching candidates with token:', token);
      const res = await fetch(`${API_URL}/candidates`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
      setAllCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCandidateStatus = async (candidateId: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/candidates/${candidateId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update candidate status');
      setAllCandidates(prev =>
        prev.map(c => (c._id === candidateId ? { ...c, status } : c))
      );
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="text-sm text-gray-800">
              <p className="text-gray-600">Logged in as</p>
              <p className="font-semibold">Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveSection('jobs')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
              activeSection === 'jobs'
                ? 'bg-blue-100 text-blue-700 border border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Job Management</span>
          </button>
          <button
            onClick={() => setActiveSection('candidates')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
              activeSection === 'candidates'
                ? 'bg-blue-100 text-blue-700 border border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Candidate Management</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              onLogout();
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 border border-red-300"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </header>
      <main className="p-6">
        {activeSection === 'jobs' && (
          <JobManagement
            jobs={jobs}
            onJobUpdate={(job) => setJobs(prev => prev.map(j => j._id === job._id ? job : j))}
            onJobDelete={(jobId) => setJobs(prev => prev.filter(j => j._id !== jobId))}
            loading={loading}
            token={token}
            refreshJobs={fetchJobs}
          />
        )}
        {activeSection === 'candidates' && (
          <CandidateManagement
            jobs={jobs}
            allCandidates={allCandidates}
            updateCandidateStatus={updateCandidateStatus}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;