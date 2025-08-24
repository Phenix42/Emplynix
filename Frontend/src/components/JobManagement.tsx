import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, MapPin, Clock } from 'lucide-react';

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
  applicationCount?: number;
}

interface JobManagementProps {
  jobs: Job[];
  onJobUpdate: (job: Job) => void;
  onJobDelete: (jobId: string) => void;
  loading: boolean;
  token: string;
  refreshJobs?: () => void;
}

const JobManagement: React.FC<JobManagementProps> = ({
  jobs,
  onJobUpdate,
  onJobDelete,
  loading,
  token,
  refreshJobs,
}) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    experience: '',
    description: '',
    requirements: [''],
    benefits: [''],
    status: 'active',
  });
  const [error, setError] = useState<string | null>(null);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token) {
      console.error('No token available for job submission');
      setError('No authentication token found. Please log in again.');
      return;
    }
    console.log('Token being sent:', token);
    try {
      const jobData = {
        ...jobForm,
        requirements: jobForm.requirements.filter(req => req.trim() !== ''),
        benefits: jobForm.benefits.filter(benefit => benefit.trim() !== ''),
      };
      console.log('Job data:', jobData);
      const response = await fetch(
        editingJob ? `http://localhost:5001/api/jobs/${editingJob._id}` : 'http://localhost:5001/api/jobs',
        {
          method: editingJob ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        }
      );
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (response.status === 401 || response.status === 403) {
        if (data?.message?.toLowerCase().includes('token')) {
          localStorage.removeItem('adminToken');
          setError('Session expired. Please log in again.');
          return;
        }
      }
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save job');
      }
      onJobUpdate(data);
      setShowJobForm(false);
      setEditingJob(null);
      resetJobForm();
      if (refreshJobs) refreshJobs();
    } catch (error: any) {
      console.error('Error saving job:', error);
      setError(error.message || 'Failed to save job. Please try again.');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        console.log('Deleting job with token:', token);
        const response = await fetch(`http://localhost:5001/api/jobs/${jobId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Delete response status:', response.status);
        const data = await response.json();
        if (response.status === 401 || response.status === 403) {
          if (data?.message?.toLowerCase().includes('token')) {
            localStorage.removeItem('adminToken');
            setError('Session expired. Please log in again.');
            return;
          }
        }
        if (!response.ok) throw new Error(data.message || 'Failed to delete job');
        onJobDelete(jobId);
        if (refreshJobs) refreshJobs();
      } catch (error: any) {
        console.error('Error deleting job:', error);
        setError(error.message || 'Error deleting job. Please try again.');
      }
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      experience: job.experience || '',
      description: job.description,
      requirements: job.requirements.length > 0 ? job.requirements : [''],
      benefits: job.benefits.length > 0 ? job.benefits : [''],
      status: job.status,
    });
    setShowJobForm(true);
    setError(null);
  };

  const resetJobForm = () => {
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      experience: '',
      description: '',
      requirements: [''],
      benefits: [''],
      status: 'active',
    });
  };

  const addRequirement = () => {
    setJobForm(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const addBenefit = () => {
    setJobForm(prev => ({
      ...prev,
      benefits: [...prev.benefits, ''],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setJobForm(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => (i === index ? value : req)),
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setJobForm(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => (i === index ? value : benefit)),
    }));
  };

  const removeRequirement = (index: number) => {
    setJobForm(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const removeBenefit = (index: number) => {
    setJobForm(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Management</h1>
          <p className="text-gray-600">Create, edit, and manage job postings</p>
        </div>
        <button
          onClick={() => {
            setShowJobForm(true);
            setEditingJob(null);
            resetJobForm();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Job</span>
        </button>
      </div>

      {showJobForm && (
        <div className="bg-white rounded-lg shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingJob ? 'Edit Job Position' : 'Create New Job Position'}
          </h2>
          <form onSubmit={handleJobSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Senior Java Developer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <input
                  type="text"
                  value={jobForm.company}
                  onChange={(e) => setJobForm(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="e.g., Tech Solutions Inc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Bangalore/Hyderabad"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required *</label>
                <input
                  type="text"
                  value={jobForm.experience}
                  onChange={(e) => setJobForm(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 3-5 years"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input
                  type="text"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                  placeholder="e.g., 10-15 LPA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
              <textarea
                value={jobForm.description}
                onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                rows={5}
                placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills Required</label>
              {jobForm.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Enter requirement"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {jobForm.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Skill
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
              {jobForm.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="Enter benefit"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {jobForm.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Benefit
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={jobForm.status}
                onChange={(e) => setJobForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingJob ? 'Update Job' : 'Create Job')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowJobForm(false);
                  setEditingJob(null);
                  resetJobForm();
                  setError(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Posted</h3>
            <p className="text-gray-600 mb-4">Start by creating your first job posting.</p>
            <button
              onClick={() => {
                setShowJobForm(true);
                setEditingJob(null);
                resetJobForm();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Create First Job
            </button>
          </div>
        ) : (
          jobs
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              (job.applicationCount || 0) === 0
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {job.applicationCount || 0} Application{(job.applicationCount || 0) !== 1 ? 's' : ''}
                          </span>
                          <span className="text-xs text-gray-400">
                            Created: {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex space-x-2">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-lg transition-colors duration-200"
                        title="Edit Job"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg transition-colors duration-200"
                        title="Delete Job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default JobManagement;