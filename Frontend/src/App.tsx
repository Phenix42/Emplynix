import { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import LatestJobs from './components/LatestJobs';
import Employers from './components/Employers';
import Services from './components/Services';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Jobs from './components/Jobs';
import AdminDashboard from './components/AdminDashboard';
import HireStaff from './components/HireStaff';
import JobDetails from './components/JobDetails';
import JobApplicationForm from './components/JobApplicationForm';
import ServiceDetails from './components/ServiceDetails';
import axios from 'axios';
import {Job} from '../src/types/Job'
import { mapToFullJob } from './components/utils';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [jobToApply, setJobToApply] = useState<Job | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    keyword: "",
    location: "",
  })

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('adminToken');
      if (storedToken) {
        try {
          await axios.get('http://localhost:5001/api/auth/validate', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setIsLoggedIn(true);
          setToken(storedToken);
          setCurrentPage('admin');
        } catch (error: any) {
          setTokenError(
            error.response?.data?.message?.includes('token')
              ? 'Session expired or invalid token. Please log in again.'
              : 'Authentication error. Please log in again.'
          );
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setIsLoggedIn(false);
          setToken(null);
          setCurrentPage('login');
        }
      } else {
        setIsLoggedIn(false);
        setToken(null);
        setCurrentPage('home');
      }
    };

    validateToken();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('adminToken', newToken);
    setIsLoggedIn(true);
    setToken(newToken);
    setCurrentPage('admin');
    setTokenError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsLoggedIn(false);
    setToken(null);
    setCurrentPage('home');
    setTokenError(null);
  };

  const renderPage = () => {
    if (tokenError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {tokenError}
            <button
              onClick={() => {
                handleLogout();
                setCurrentPage('login');
              }}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Log In Again
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 'admin' && isLoggedIn && token) {
      return <AdminDashboard onLogout={handleLogout} token={token} />;
    }

    switch (currentPage) {
      case 'about':
        return <div className="pt-16"><About /></div>;
      case 'contact':
        return <div className="pt-16"><Contact /></div>;
      case 'login':
        return <div className="pt-16"><Login onLoginSuccess={handleLoginSuccess} /></div>;
      case 'hirestaff':
        return <div className="pt-16"><HireStaff onBack={() => setCurrentPage('home')} /></div>;
      case 'jobs':
        return (
          <div className="pt-16">
            <Jobs
              onJobClick={(job) => {
                setSelectedJob(job);
                setCurrentPage('jobDetails');
              }}
            />
          </div>
        );
      case 'jobDetails':
        return (
          <div className="pt-16">
            <JobDetails
              job={selectedJob}
              onBack={() => setCurrentPage('jobs')}
              onApply={(job) => {
                setJobToApply(mapToFullJob(job));
                setCurrentPage('jobApplication');
              }}
            />
          </div>
        );
      case 'jobApplication':
        return (
          <div className="pt-16">
            <JobApplicationForm
              job={jobToApply}
              onBack={() => setCurrentPage('jobDetails')}
            />
          </div>
        );
      case 'services':
        return <div className="pt-16"><Services /></div>;
      case 'sales-marketing':
      case 'engineering-technology':
      case 'accounting-finance':
      case 'information-technology':
        return (
          <div className="pt-40">
            <ServiceDetails serviceId={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} setSearchFilters={setSearchFilters}/>
            <LatestJobs
             setCurrentPage={setCurrentPage} 
             setSelectedJob={setSelectedJob} 
             searchFilters={searchFilters} 
            />
            <Employers setCurrentPage={setCurrentPage} /> {/* Pass setCurrentPage */}
            <Services />
      
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'admin' && <TopBar />}
      {currentPage !== 'admin' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'admin' && <Footer />}
    </div>
  );
}

export default App;
