import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Banknote,
  Eye,
  ChevronRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Clock,
  Download,
} from 'lucide-react';
import axios from 'axios';
import { Candidate, Job, CandidatesByJob, CandidateStatus } from '../types/Candidate';

interface CandidateManagementProps {
  jobs: Job[];
  allCandidates: Candidate[];
  updateCandidateStatus: (candidateId: string, status: CandidateStatus) => void;
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
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [selectedJobCompany, setSelectedJobCompany] = useState('');
  const [candidateFilter, setCandidateFilter] = useState<'latest' | 'oldest'>('latest');
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | 'all'>('all');

import.meta.env.VITE_API_URL;

  // Group candidates by job
  useEffect(() => {
    if (allCandidates.length && jobs.length) {
      const grouped: CandidatesByJob[] = [...jobs]
        .sort(
          (a, b) =>
            (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
            (a.createdAt ? new Date(a.createdAt).getTime() : 0)
        )
        .map((job) => {
          const jobCandidates = allCandidates.filter((c) => c.jobId?._id === job._id);
          return { job, candidates: jobCandidates, count: jobCandidates.length };
        });
      setCandidatesByJob(grouped);
    }
  }, [allCandidates, jobs]);

  // Filter & sort candidates
  useEffect(() => {
    if (!selectedJobId) return;

    let filteredCandidates = allCandidates.filter((c) => c.jobId?._id === selectedJobId);

    if (statusFilter !== 'all') {
      filteredCandidates = filteredCandidates.filter((c) => c.status === statusFilter);
    }

    filteredCandidates.sort((a, b) =>
      candidateFilter === 'latest'
        ? (b.appliedDate ? new Date(b.appliedDate).getTime() : 0) -
          (a.appliedDate ? new Date(a.appliedDate).getTime() : 0)
        : (a.appliedDate ? new Date(a.appliedDate).getTime() : 0) -
          (b.appliedDate ? new Date(b.appliedDate).getTime() : 0)
    );

    setSelectedJobCandidates(filteredCandidates);
  }, [allCandidates, selectedJobId, statusFilter, candidateFilter]);

  const fetchCandidatesForJob = (jobId: string, jobTitle: string) => {
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    const job = jobs.find((j) => j._id === jobId);
    setSelectedJobCompany(job?.company || '');
  };

  const handleStatusChange = async (candidateId: string, status: CandidateStatus) => {
    try {
      await updateCandidateStatus(candidateId, status);
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update candidate status');
    }
  };

  const downloadResume = async (candidate: Candidate) => {
    if (!candidate.resumeUrl) return alert('No resume available');
    try {
      const res = await axios.get(candidate.resumeUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', candidate.resumeFileName || 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Resume download failed:', err);
    }
  };

  const handleBackToJobs = () => {
    setSelectedJobCandidates([]);
    setSelectedJobId('');
    setSelectedJobTitle('');
    setSelectedJobCompany('');
    setCandidateFilter('latest');
    setStatusFilter('all');
  };

  const statusBadgeClasses = (status: CandidateStatus) => {
    switch (status) {
      case 'applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'screening':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3e94b3] mb-2">Candidate Management</h1>
      </div>

      {selectedJobId ? (
        <>
          {/* Job Details & Filters */}
          <div className="mb-6">
            <button
              onClick={handleBackToJobs}
              className="flex items-center space-x-2 text-[#3e94b3] hover:text-[#7fbadd] mb-4 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Job Positions</span>
            </button>

            <div className="bg-white/95 rounded-xl shadow-lg border border-blue-100 p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJobTitle}</h2>
              <p className="text-[#3e94b3] mb-2">{selectedJobCompany}</p>
              <div className="flex items-center space-x-6">
                <p className="text-gray-600">
                  Total Applications:{' '}
                  <span className="font-semibold text-blue-600">
                    {allCandidates.filter((c) => c.jobId?._id === selectedJobId).length}
                  </span>
                </p>
                <div className="flex space-x-4 text-sm">
                  {['applied','screening','interview','hired','rejected'].map((status) => {
                    const totalForStatus = allCandidates.filter(
                      (c) => c.jobId?._id === selectedJobId && c.status === status
                    ).length;
                    return (
                      <span
                        key={status}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClasses(status as CandidateStatus)}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}: {totalForStatus}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-xl shadow border border-blue-100 p-4 mb-6 flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={candidateFilter}
                  onChange={(e) => setCandidateFilter(e.target.value as 'latest' | 'oldest')}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="latest">Latest Applications</option>
                  <option value="oldest">Oldest Applications</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as CandidateStatus | 'all')}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="applied">Applied</option>
                  <option value="screening">Screening</option>
                  <option value="interview">Interview</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Candidate List */}
          <div className="space-y-6">
            {selectedJobCandidates.length > 0 ? (
              selectedJobCandidates.map((candidate) => (
                <div
                  key={candidate._id}
                  className="bg-white/95 rounded-xl shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-shadow duration-200"
                >
                  <div className="p-6 flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#3e94b3] to-[#7fbadd] rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-500 text-sm">
                            Applied on {candidate.appliedDate ? new Date(candidate.appliedDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4 text-gray-600 text-sm">
                        <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>{candidate.email}</span></div>
                        <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>{candidate.contact}</span></div>
                        <div className="flex items-center space-x-2"><Clock className="h-4 w-4" /><span>{candidate.experience ?? 'N/A'} yrs exp</span></div>
                        <div className="flex items-center space-x-2"><Banknote className="h-4 w-4" /><span>Current: {candidate.currentCTC ?? 'N/A'} LPA</span></div>
                        <div className="flex items-center space-x-2"><Clock className="h-4 w-4" /><span>Notice: {candidate.noticePeriod ?? 'N/A'} mo</span></div>
                        <div className="flex items-center space-x-2"><Banknote className="h-4 w-4" /><span>Expected: {candidate.expectedCTC ?? 'N/A'} LPA</span></div>
                      </div>

                      {candidate.skills?.length && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-[#3e94b3] mb-2 block">Skills:</span>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, i) => (
                              <span key={i} className="bg-[#3e94b3] text-white px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col space-y-3">
                      <select
                        value={candidate.status}
                        onChange={(e) => handleStatusChange(candidate._id, e.target.value as CandidateStatus)}
                        className="px-4 py-2 border border-[#3e94b3] rounded-lg text-sm font-medium"
                      >
                        <option value="applied">Applied</option>
                        <option value="screening">Screening</option>
                        <option value="interview">Interview</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      {candidate.resumeUrl && (
                        <button
                          onClick={() => downloadResume(candidate)}
                          className="flex items-center space-x-2 bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Resume</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No candidates found for the selected status.</p>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3e94b3] mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading job positions...</p>
            </div>
          ) : (
            candidatesByJob.map((jobGroup) => (
              <div
                key={jobGroup.job._id}
                className="bg-white/95 rounded-xl shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-200 cursor-pointer"
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#3e94b3] to-[#7fbadd] rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{jobGroup.job.title}</h3>
                        <p className="text-[#3e94b3] font-medium">{jobGroup.job.company}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${jobGroup.count === 0 ? 'bg-gray-100 text-gray-600' : 'bg-[#e0f2fe] text-[#3e94b3]'}`}>
                      {jobGroup.count} {jobGroup.count === 1 ? 'Application' : 'Applications'}
                    </span>
                  </div>
                  {jobGroup.count > 0 ? (
                    <button
                      onClick={() => fetchCandidatesForJob(jobGroup.job._id, jobGroup.job.title)}
                      className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
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
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;
