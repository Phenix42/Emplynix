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
import { Job } from '../src/types/Job';
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
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Helper function for navigation (syncs with browser history)
  const navigate = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({ page }, "", `#${page}`);
  };

  // ✅ On initial load, sync with URL hash
  useEffect(() => {
    const hashPage = window.location.hash.replace("#", "");
    if (hashPage) {
      setCurrentPage(hashPage);
    }
  }, []);

  // ✅ Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // ✅ Validate token on load
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('adminToken');
      if (storedToken) {
        try {
          await axios.get(`${API_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setIsLoggedIn(true);
          setToken(storedToken);
          const hashPage = window.location.hash.replace("#", "");
if (hashPage === "admin") {
  navigate("admin");
}
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
          navigate('login');
        }
      } else {
        setIsLoggedIn(false);
        setToken(null);
        navigate('home');
      }
    };

    validateToken();
  }, []);

  // ✅ Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('adminToken', newToken);
    setIsLoggedIn(true);
    setToken(newToken);
    navigate('admin');
    setTokenError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsLoggedIn(false);
    setToken(null);
    navigate('home');
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
                navigate('login');
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
        return <div className="pt-16"><HireStaff onBack={() => navigate('home')} /></div>;
      case 'jobs':
        return (
          <div className="pt-16">
            <Jobs
              onJobClick={(job) => {
                setSelectedJob(job);
                navigate('jobDetails');
              }}
            />
          </div>
        );
      case 'jobDetails':
        return (
          <div className="pt-16">
            <JobDetails
              job={selectedJob}
              onBack={() => navigate('jobs')}
              onApply={(job) => {
                setJobToApply(mapToFullJob(job));
                navigate('jobApplication');
              }}
            />
          </div>
        );
      case 'jobApplication':
        return (
          <div className="pt-16">
            <JobApplicationForm
              job={jobToApply}
              onBack={() => navigate('jobDetails')}
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
            <ServiceDetails serviceId={currentPage} setCurrentPage={navigate} />
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero setCurrentPage={navigate} setSearchFilters={setSearchFilters} />
            <LatestJobs
              setCurrentPage={navigate}
              setSelectedJob={setSelectedJob}
              searchFilters={searchFilters}
            />
            <Employers setCurrentPage={navigate} />
            <Services />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'admin' && <TopBar />}
      {currentPage !== 'admin' && (
        <Header currentPage={currentPage} setCurrentPage={navigate} />
      )}
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'admin' && <Footer />}
    </div>
  );
}

export default App;
