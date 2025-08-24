import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Banknote, Eye, ChevronRight, Calendar, ArrowLeft, User, Mail, Phone, Clock, Download } from 'lucide-react';

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

interface CandidatesByJob {
  job: {
    _id: string;
    title: string;
    company: string;
    location?: string;
  };
  candidates: Candidate[];
  count: number;
}

interface CandidateManagementProps {
  jobs: Job[];
  allCandidates: Candidate[];
  updateCandidateStatus: (candidateId: string, status: string) => void;
  loading: boolean;
}

const CandidateManagement: React.FC<CandidateManagementProps> = ({
  jobs,
  allCandidates,
  updateCandidateStatus,
  loading,
}) => {
  const [candidatesByJob, setCandidatesByJob] = useState<CandidatesByJob[]>([]);
  const [selectedJobCandidates, setSelectedJobCandidates] = useState<Candidate[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [selectedJobCompany, setSelectedJobCompany] = useState('');
  const [candidateFilter, setCandidateFilter] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (allCandidates.length > 0 && jobs.length > 0) {
      groupCandidatesByJob();
    }
  }, [allCandidates, jobs]);

  const groupCandidatesByJob = () => {
    const sortedJobs = [...jobs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const grouped = sortedJobs.map(job => {
      const jobCandidates = allCandidates.filter(candidate => candidate.jobId._id === job._id);
      return {
        job: {
          _id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
        },
        candidates: jobCandidates,
        count: jobCandidates.length,
      };
    });

    setCandidatesByJob(grouped);
  };

  const fetchCandidatesForJob = (jobId: string, jobTitle: string) => {
    let jobCandidates = allCandidates.filter(candidate => candidate.jobId._id === jobId);

    // Apply status filter
    if (statusFilter !== 'all') {
      jobCandidates = jobCandidates.filter(candidate => candidate.status === statusFilter);
    }

    // Apply date sorting
    if (candidateFilter === 'latest') {
      jobCandidates.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
    } else if (candidateFilter === 'oldest') {
      jobCandidates.sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
    }

    setSelectedJobCandidates(jobCandidates);
    setSelectedJobTitle(jobTitle);
    const job = jobs.find(j => j._id === jobId);
    setSelectedJobCompany(job?.company || '');
  };

  const downloadResume = async (candidateId: string, fileName: string) => {
    try {
      alert(`Downloading resume: ${fileName || 'resume.pdf'}`);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Error downloading resume. Please try again.');
    }
  };

  const handleBackToJobs = () => {
    setSelectedJobCandidates([]);
    setSelectedJobTitle('');
    setSelectedJobCompany('');
    setCandidateFilter('latest');
    setStatusFilter('all');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Management</h1>
        <p className="text-gray-600">Manage job applications and candidate status</p>
      </div>

      {selectedJobCandidates.length > 0 ? (
        <div>
          <div className="mb-6">
            <button
              onClick={handleBackToJobs}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Job Positions</span>
            </button>
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedJobTitle}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">{selectedJobCompany}</span>
              </p>
              <div className="flex items-center space-x-6">
                <p className="text-gray-600">
                  Total Applications: <span className="font-semibold text-blue-600">{selectedJobCandidates.length}</span>
                </p>
                <div className="flex space-x-4 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Applied: {selectedJobCandidates.filter(c => c.status === 'applied').length}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Screening: {selectedJobCandidates.filter(c => c.status === 'screening').length}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    Interview: {selectedJobCandidates.filter(c => c.status === 'interview').length}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Hired: {selectedJobCandidates.filter(c => c.status === 'hired').length}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Rejected: {selectedJobCandidates.filter(c => c.status === 'rejected').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={candidateFilter}
                    onChange={(e) => {
                      setCandidateFilter(e.target.value);
                      if (selectedJobTitle) {
                        const currentJob = candidatesByJob.find(group => group.job.title === selectedJobTitle);
                        if (currentJob) {
                          fetchCandidatesForJob(currentJob.job._id, currentJob.job.title);
                        }
                      }
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="latest">Latest Applications</option>
                    <option value="oldest">Oldest Applications</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      if (selectedJobTitle) {
                        const currentJob = candidatesByJob.find(group => group.job.title === selectedJobTitle);
                        if (currentJob) {
                          fetchCandidatesForJob(currentJob.job._id, currentJob.job.title);
                        }
                      }
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="text-sm text-gray-500">
                  Showing {selectedJobCandidates.length} candidate{selectedJobCandidates.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {selectedJobCandidates.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Candidates Found</h3>
                <p className="text-gray-600">No candidates match the current filters or have applied for this job.</p>
              </div>
            ) : (
              selectedJobCandidates.map((candidate) => (
                <div key={candidate._id} className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {candidate.firstName} {candidate.lastName}
                            </h3>
                            <p className="text-gray-500 text-sm">Applied on {new Date(candidate.appliedDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{candidate.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">{candidate.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{candidate.experience} years experience</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Banknote className="h-4 w-4" />
                            <span className="text-sm">Current {candidate.salary || 'N/A'} LPA</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Banknote className="h-4 w-4" />
                            <span className="text-sm">Expected {candidate.experience} LPA</span>
                          </div>
                        </div>

                        {candidate.skills.length > 0 && (
                          <div className="mb-4">
                            <span className="text-sm font-medium text-gray-700 mb-2 block">Skills:</span>
                            <div className="flex flex-wrap gap-2">
                              {candidate.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-6 flex flex-col space-y-3">
                        <select
                          value={candidate.status}
                          onChange={(e) => updateCandidateStatus(candidate._id, e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                        >
                          <option value="applied">Applied</option>
                          <option value="screening">Screening</option>
                          <option value="interview">Interview</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        {candidate.resumeUrl && (
                          <button
                            onClick={() => downloadResume(candidate._id, candidate.resumeFileName || 'resume.pdf')}
                            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download Resume</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          candidate.status === 'hired' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                          candidate.status === 'screening' ? 'bg-blue-100 text-blue-800' :
                          candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </span>
                        {candidate.interviewDate && (
                          <span className="text-sm text-gray-600 flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Interview: {new Date(candidate.interviewDate).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading job positions...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Job Positions Available</h3>
              <p className="text-gray-600">No jobs have been posted yet.</p>
            </div>
          ) : (
            jobs.map((job) => {
              const jobGroup = candidatesByJob.find(group => group.job._id === job._id) || {
                job: { _id: job._id, title: job.title, company: job.company, location: job.location },
                candidates: [],
                count: 0,
              };
              return (
                <div key={job._id} className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 font-medium">{job.company}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            jobGroup.count === 0
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {jobGroup.count} {jobGroup.count === 1 ? 'Application' : 'Applications'}
                          </span>
                          {jobGroup.count > 0 ? (
                            <span className="text-sm text-gray-500">
                              Click to view candidates
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">
                              No applications yet
                            </span>
                          )}
                        </div>
                      </div>
                      {jobGroup.count > 0 ? (
                        <button
                          onClick={() => fetchCandidatesForJob(job._id, job.title)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 hover:shadow-md"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Candidates</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>No Applications</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;