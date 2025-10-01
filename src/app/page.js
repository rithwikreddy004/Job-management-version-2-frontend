/*


"use client";

import { useState, useEffect } from "react";
import CreateJobModal from './components/CreateJobModel';

export default function Page() {
  // State for the modal
  const [modalOpened, setModalOpened] = useState(false);
  
  // State for job data
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for all filters
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 200]);

  // State to trigger a data refresh
  const [refreshSignal, setRefreshSignal] = useState(0);

  const MIN_SALARY = 0;
  const MAX_SALARY = 200;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('title', searchTerm);
        if (location) params.append('location', location);
        if (jobType) params.append('type', jobType);
        params.append('minSalary', salaryRange[0] * 100000);
        params.append('maxSalary', salaryRange[1] * 100000);
        
        const response = await fetch(`http://localhost:3000/jobs?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => fetchJobs(), 500);
    return () => clearTimeout(debounceTimer);

  }, [searchTerm, location, jobType, salaryRange, refreshSignal]);

  const handleJobCreated = () => {
    setModalOpened(false);
    setRefreshSignal(prev => prev + 1);
  };
  
  const handleMinSalaryChange = (e) => {
    const value = Math.min(Number(e.target.value), salaryRange[1] - 1);
    setSalaryRange([value, salaryRange[1]]);
  };

  const handleMaxSalaryChange = (e) => {
    const value = Math.max(Number(e.target.value), salaryRange[0] + 1);
    setSalaryRange([salaryRange[0], value]);
  };
  
  const locationOptions = ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Remote", "Onsite"];
  const jobTypeOptions = ["Full time", "Part time", "Contract", "Internship"];

  const minPos = ((salaryRange[0] - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;
  const maxPos = ((salaryRange[1] - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;

  // Helper function to format creation date
  const formatJobDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 24) {
      return `${diffInHours}h Ago`;
    } else {
       const diffInDays = Math.floor(diffInHours / 24);
       return `${diffInDays}d Ago`;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-layout">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-inner">
              <div className="logo">
                <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                 
                  <path d="M24.33 5.41968L24.8852 23.3961L39.6353 13.9324L24.33 5.41968Z" fill="#333333"/>
                  <path d="M39.5308 32.7551V13.8619L18.395 27.4678V45.3387H19.1064" fill="#494949"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" fill="url(#p1)"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" fill="url(#p2)"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" stroke="url(#p3)" strokeWidth="0.846154"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" stroke="url(#p4)" strokeWidth="0.846154"/>
                  <path d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936" fill="url(#p5)"/>
                  <path d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936" fill="url(#p6)"/>
                  <defs>
                  <linearGradient id="p1" x1="0.36496" y1="31.5921" x2="15.6704" y2="31.5921" gradientUnits="userSpaceOnUse"><stop stopColor="#00AAFF"/><stop offset="1" stopColor="#8636F8"/></linearGradient>
                  <linearGradient id="p2" x1="8.01768" y1="40.5806" x2="8.01768" y2="22.6037" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.6"/><stop offset="0.1085" stopColor="white" stopOpacity="0.455"/><stop offset="0.4332" stopColor="white" stopOpacity="0.216"/><stop offset="0.6639" stopColor="white" stopOpacity="0.06"/><stop offset="0.775" stopColor="white" stopOpacity="0"/></linearGradient>
                  <linearGradient id="p3" x1="0.36496" y1="31.5921" x2="15.6704" y2="31.5921" gradientUnits="userSpaceOnUse"><stop stopColor="#00AAFF"/><stop offset="1" stopColor="#8636F8"/></linearGradient>
                  <linearGradient id="p4" x1="8.01768" y1="40.5806" x2="8.01768" y2="22.6037" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.6"/><stop offset="0.1085" stopColor="white" stopOpacity="0.455"/><stop offset="0.4332" stopColor="white" stopOpacity="0.216"/><stop offset="0.6639" stopColor="white" stopOpacity="0.06"/><stop offset="0.775" stopColor="white" stopOpacity="0"/></linearGradient>
                  <linearGradient id="p5" x1="-0.407398" y1="20.0785" x2="22.8932" y2="18.3851" gradientUnits="userSpaceOnUse"><stop offset="0.0226" stopColor="#8636F8"/><stop offset="0.3484" stopColor="#F020B3"/><stop offset="0.6742" stopColor="#F8475E"/><stop offset="1" stopColor="#FF9421"/></linearGradient>
                  <linearGradient id="p6" x1="11.0371" y1="32.1381" x2="11.0371" y2="0.661621" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.6"/><stop offset="0.0842" stopColor="white" stopOpacity="0.455"/><stop offset="0.367" stopColor="white" stopOpacity="0.216"/><stop offset="0.568" stopColor="white" stopOpacity="0.06"/><stop offset="0.6648" stopColor="white" stopOpacity="0"/></linearGradient>
                  </defs>
                </svg>
              </div>
              <ul className="nav-links">
                <li>Home</li>
                <li>Find Jobs</li>
                <li>Find Talents</li>
                <li>About us</li>
                <li>Testimonials</li>
              </ul>
              <button className="create-job-btn" onClick={() => setModalOpened(true)}>Create Jobs</button>
            </div>
          </div>
        </nav>
      </div>

      <div className="filters-container-outer">
        <div className="filters-container-inner">
          <div className="filter-segment">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search By Job Title, Role" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-segment">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              {locationOptions.map(loc => <option key={loc} value={loc.toLowerCase()}>{loc}</option>)}
            </select>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="filter-segment">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">All Job Types</option>
              {jobTypeOptions.map(type => <option key={type} value={type.toLowerCase().replace(' ','-')}>{type}</option>)}
            </select>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="filter-segment salary-segment">

            <div className="salary-labels">

              <span>Salary Per Month</span>

              <span>₹{salaryRange[0]}L - ₹{salaryRange[1]}L</span>

            </div>

            <div className="dual-slider-container">

              <div className="slider-track"></div>

                <div className="slider-range-highlight" style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}></div>

                <input type="range" min={MIN_SALARY} max={MAX_SALARY} value={salaryRange[0]} onChange={handleMinSalaryChange} className="thumb thumb-left" />

                <input type="range" min={MIN_SALARY} max={MAX_SALARY} value={salaryRange[1]} onChange={handleMaxSalaryChange} className="thumb thumb-right" />

            </div>

          </div>
        </div>
      </div>

      <div className="job-grid-container">
        <div className="job-grid">
          {isLoading ? (
            <p style={{gridColumn: '1 / -1', textAlign: 'center'}}>Loading jobs...</p>
          ) : error ? (
            <p style={{gridColumn: '1 / -1', textAlign: 'center', color: 'red'}}>{error}</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="time-badge">{formatJobDate(job.createdAt)}</div>
                <div className="job-logo">
                  <img src={`/logos/${job.companyName.toLowerCase()}.png`} alt={`${job.companyName} logo`} />
                </div>
                <h3 className="job-title">{job.jobTitle}</h3>
                <div className="job-meta">
               
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    1-3 yr Exp
                  </span>
                 
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {job.location}
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    {job.salaryMax / 100000} LPA
                  </span>
                </div>
               
                <ul className="job-desc">
                  
                  {job.jobDescription.split('.') 
                    .filter(sentence => sentence.trim() !== '')
                    .slice(0, 2)
                    .map((sentence, index) => (
                      <li key={index}>{sentence.trim()}</li>
                  ))}
                </ul>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))
          ) : (
            <p style={{gridColumn: '1 / -1', textAlign: 'center'}}>No jobs found with the current filters.</p>
          )}
        </div>
      </div>

      <CreateJobModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onJobCreated={handleJobCreated}
      />
      
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #F7F8FC;
        }
      `}</style>
      <style jsx>{`
        
        .page-wrapper {
          overflow-x: hidden;
        }

        .main-layout {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }
        
        .navbar {
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }
        .nav-container {
            display: inline-flex;
            background: #fff;
            border: 1px solid #EAEAEA;
            border-radius: 9999px;
            padding: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 30px;
          font-size: 16px;
          color: #555;
          padding: 0;
          margin: 0;
        }
        .nav-links li {
            cursor: pointer;
        }
        .create-job-btn {
          background-image: linear-gradient(to right, #8A2BE2, #C71585);
          border: none;
          color: #fff;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: bold;
          cursor: pointer;
          font-size: 15px;
        }
        
        .filters-container-outer {
          width: 100%;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          margin-top: 10px;
          margin-bottom: 30px;
        }

        .filters-container-inner {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          height: 70px;
          box-sizing: border-box;
        }

        .filter-segment {
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 12px;
          border-right: 1px solid #EAEAEA;
          flex-shrink: 0;
        }
        .filter-segment:first-child { flex-grow: 1.5; padding-left: 0; }
        .filter-segment:nth-child(2),
        .filter-segment:nth-child(3) { flex-grow: 1; }
        .filter-segment:last-child {
          border-right: none;
          flex-grow: 1.5;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          padding: 10px 20px 10px 20px;
        }
        .filter-segment input, .filter-segment select {
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          width: 100%;
          color: #333;
        }
        .filter-segment select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          cursor: pointer;
        }
        .chevron { margin-left: -28px; pointer-events: none; }
        
        .salary-labels {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #555;
            margin-bottom: 8px;
        }
        .dual-slider-container {
            position: relative;
            height: 20px;
            display: flex;
            align-items: center;
        }
        .slider-track, .slider-range-highlight {
            position: absolute;
            height: 4px;
            width: 100%;
            border-radius: 4px;
            top: 50%;
            transform: translateY(-50%);
        }
        .slider-track { background-color: #E0E0E0; }
        .slider-range-highlight { background-color: #8A2BE2; z-index: 2; }
        .thumb {
            -webkit-appearance: none; -moz-appearance: none;
            appearance: none; width: 100%; height: 20px;
            background: transparent; position: absolute;
            left: 0; pointer-events: none; z-index: 3;
        }
        .thumb::-webkit-slider-thumb {
            -webkit-appearance: none; pointer-events: all;
            width: 18px; height: 18px; background: #fff;
            border: 4px solid #8A2BE2; border-radius: 50%;
            cursor: pointer; box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }
        .thumb::-moz-range-thumb {
            pointer-events: all; width: 10px; height: 10px;
            background: #fff; border: 4px solid #8A2BE2;
            border-radius: 50%; cursor: pointer;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }
        
        .job-grid-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .job-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding: 20px 0;
        }
        @media (max-width: 1200px) { .job-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) { .job-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .job-grid { grid-template-columns: 1fr; } }

        .job-card {
          height: 360px;
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #EAEAEA;
          padding: 20px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .job-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); }
        .time-badge {
          position: absolute; top: 15px; right: 15px;
          background: #E9F4FF; color: #409EFF; font-size: 12px;
          font-weight: 500; padding: 5px 10px; border-radius: 6px;
        }
        .job-logo {
          width: 60px; height: 60px; background-color: #f8f8f8;
          border-radius: 8px; display: flex; align-items: center;
          justify-content: center; margin-bottom: 14px;
        }
        .job-logo img { width: 50px; height: 50px; border-radius: 50%; }
        .job-title {
          font-size: 18px; font-weight: 600; color: #222;
          margin: 0 0 14px 0;
        }
        .job-meta {
          display: flex; flex-wrap: wrap; gap: 16px;
          font-size: 14px; color: #555; margin-bottom: 16px;
        }
        .job-meta span { display: inline-flex; align-items: center; gap: 8px; }
        .job-meta svg { stroke: #555; }
        .job-desc {
          font-size: 14px; line-height: 1.5;
          color: #444; padding-left: 20px; margin: 0 0 16px 0;
        }
        .job-desc li { margin-bottom: 6px; }
        .apply-btn {
          margin-top: auto;
          width: 100%; background: #00AAFF;
          border: none; color: #fff; padding: 14px;
          border-radius: 8px; cursor: pointer; font-weight: bold;
          font-size: 15px; transition: background-color 0.2s;
        }
        .apply-btn:hover { background: #0088CC; }
      `}</style>
    </div>
  );
}




<div className="filter-segment">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">All Job Types</option>
            
              {jobTypeOptions.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>




*/





















"use client";

import { useState, useEffect } from "react";
import CreateJobModal from './components/CreateJobModel';

export default function Page() {
  // State for the modal
  const [modalOpened, setModalOpened] = useState(false);
  
  // State for job data
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for all filters
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 200]);

  // State to trigger a data refresh
  const [refreshSignal, setRefreshSignal] = useState(0);

  const MIN_SALARY = 0;
  const MAX_SALARY = 200;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('jobTitle', searchTerm);
        if (location) params.append('location', location);
        
        // --- FIX #1: Changed query parameter from 'type' to 'jobType' ---
        if (jobType) params.append('jobType', jobType); 
        
        params.append('minSalary', salaryRange[0] * 100000);
        params.append('maxSalary', salaryRange[1] * 100000);
        
        //const response = await fetch(`http://localhost:3000/jobs?${params.toString()}`);


        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => fetchJobs(), 500);
    return () => clearTimeout(debounceTimer);

  }, [searchTerm, location, jobType, salaryRange, refreshSignal]);

  const handleJobCreated = () => {
    setModalOpened(false);
    setRefreshSignal(prev => prev + 1);
  };
  
  const handleMinSalaryChange = (e) => {
    const value = Math.min(Number(e.target.value), salaryRange[1] - 1);
    setSalaryRange([value, salaryRange[1]]);
  };

  const handleMaxSalaryChange = (e) => {
    const value = Math.max(Number(e.target.value), salaryRange[0] + 1);
    setSalaryRange([salaryRange[0], value]);
  };
  
  const locationOptions = ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Remote", "Onsite"];
  


  const jobTypeOptions = [
    { value: 'full-time', label: 'Full time' },
    { value: 'part-time', label: 'Part time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];

  const minPos = ((salaryRange[0] - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;
  const maxPos = ((salaryRange[1] - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;

  const formatJobDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
       const diffInDays = Math.floor(diffInHours / 24);
       return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-layout">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-inner">
              <div className="logo">
                  <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  <path d="M24.33 5.41968L24.8852 23.3961L39.6353 13.9324L24.33 5.41968Z" fill="#333333"/>
                  <path d="M39.5308 32.7551V13.8619L18.395 27.4678V45.3387H19.1064" fill="#494949"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" fill="url(#p1)"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" fill="url(#p2)"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" stroke="url(#p3)" strokeWidth="0.846154"/>
                  <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" stroke="url(#p4)" strokeWidth="0.846154"/>
                  <path d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936" fill="url(#p5)"/>
                  <path d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936" fill="url(#p6)"/>
                  <defs>
                  <linearGradient id="p1" x1="0.36496" y1="31.5921" x2="15.6704" y2="31.5921" gradientUnits="userSpaceOnUse"><stop stopColor="#00AAFF"/><stop offset="1" stopColor="#8636F8"/></linearGradient>
                  <linearGradient id="p2" x1="8.01768" y1="40.5806" x2="8.01768" y2="22.6037" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.6"/><stop offset="0.1085" stopColor="white" stopOpacity="0.455"/><stop offset="0.4332" stopColor="white" stopOpacity="0.216"/><stop offset="0.6639" stopColor="white" stopOpacity="0.06"/><stop offset="0.775" stopColor="white" stopOpacity="0"/></linearGradient>
                  <linearGradient id="p3" x1="0.36496" y1="31.5921" x2="15.6704" y2="31.5921" gradientUnits="userSpaceOnUse"><stop stopColor="#00AAFF"/><stop offset="1" stopColor="#8636F8"/></linearGradient>
                  <linearGradient id="p4" x1="8.01768" y1="40.5806" x2="8.01768" y2="22.6037" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.6"/><stop offset="0.1085" stopColor="white" stopOpacity="0.455"/><stop offset="0.4332" stopColor="white" stopOpacity="0.216"/><stop offset="0.6639" stopColor="white" stopOpacity="0.06"/><stop offset="0.775" stopColor="white" stopOpacity="0"/></linearGradient>
                  <linearGradient id="p5" x1="-0.407398" y1="20.0785" x2="22.8932" y2="18.3851" gradientUnits="userSpaceOnUse"><stop offset="0.0226" stopColor="#8636F8"/><stop offset="0.3484" stopColor="#F020B3"/><stop offset="0.6742" stopColor="#F8475E"/><stop offset="1" stopColor="#FF9421"/></linearGradient>
                  <linearGradient id="p6" x1="11.0371" y1="32.1381" x2="11.0371" y2="0.661621" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.6"/><stop offset="0.0842" stopColor="white" stopOpacity="0.455"/><stop offset="0.367" stopColor="white" stopOpacity="0.216"/><stop offset="0.568" stopColor="white" stopOpacity="0.06"/><stop offset="0.6648" stopColor="white" stopOpacity="0"/></linearGradient>
                  </defs>
                </svg>
              </div>
              <ul className="nav-links">
                <li>Home</li>
                <li>Find Jobs</li>
                <li>Find Talents</li>
                <li>About us</li>
                <li>Testimonials</li>
              </ul>
              <button className="create-job-btn" onClick={() => setModalOpened(true)}>Create Jobs</button>
            </div>
          </div>
        </nav>
      </div>

      <div className="filters-container-outer">
        <div className="filters-container-inner">
          <div className="filter-segment">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 13L19 19M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input type="text" placeholder="Search By Job Title, Role" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-segment">
            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7808 19.7005L11.1906 19.2377L11.7808 19.7005ZM6.21921 19.7005L5.62903 20.1633L6.21921 19.7005ZM9 22.0055V21.2555V22.0055ZM16.25 9.6087C16.25 10.8352 15.6104 12.4764 14.6037 14.256C13.6137 16.0063 12.3342 17.7794 11.1906 19.2377L12.371 20.1633C13.5371 18.6762 14.8672 16.837 15.9094 14.9945C16.9349 13.1814 17.75 11.2494 17.75 9.6087H16.25ZM6.80938 19.2377C5.66578 17.7794 4.38628 16.0063 3.39625 14.256C2.38962 12.4764 1.75 10.8352 1.75 9.6087H0.25C0.25 11.2494 1.06511 13.1814 2.09064 14.9945C3.13277 16.837 4.46288 18.6762 5.62903 20.1633L6.80938 19.2377ZM1.75 9.6087C1.75 5.21571 5.04678 1.75 9 1.75V0.25C4.11666 0.25 0.25 4.49277 0.25 9.6087H1.75ZM9 1.75C12.9532 1.75 16.25 5.21571 16.25 9.6087H17.75C17.75 4.49277 13.8833 0.25 9 0.25V1.75ZM11.1906 19.2377C10.5717 20.027 10.1641 20.5426 9.79918 20.8741C9.46635 21.1764 9.24418 21.2555 9 21.2555V22.7555C9.72906 22.7555 10.2948 22.4504 10.8078 21.9844C11.2886 21.5476 11.7849 20.9107 12.371 20.1633L11.1906 19.2377ZM5.62903 20.1633C6.21511 20.9107 6.71136 21.5476 7.19224 21.9844C7.70524 22.4504 8.27094 22.7555 9 22.7555V21.2555C8.75582 21.2555 8.53365 21.1764 8.20082 20.8741C7.83587 20.5426 7.42834 20.027 6.80938 19.2377L5.62903 20.1633ZM5.25 10C5.25 12.0711 6.92893 13.75 9 13.75V12.25C7.75736 12.25 6.75 11.2426 6.75 10H5.25ZM9 13.75C11.0711 13.75 12.75 12.0711 12.75 10H11.25C11.25 11.2426 10.2426 12.25 9 12.25V13.75ZM12.75 10C12.75 7.92893 11.0711 6.25 9 6.25V7.75C10.2426 7.75 11.25 8.75736 11.25 10H12.75ZM9 6.25C6.92893 6.25 5.25 7.92893 5.25 10H6.75C6.75 8.75736 7.75736 7.75 9 7.75V6.25Z" fill="#686868"/>
            </svg>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Preferred Location</option>
              {/* --- FIX #2: Removed .toLowerCase() to send correct value --- */}
              {locationOptions.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          
          

           <div className="filter-segment">
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 17C13 14.7909 10.3137 13 7 13C3.68629 13 1 14.7909 1 17M14.8281 3.17188C15.1996 3.54331 15.4942 3.98427 15.6952 4.46957C15.8962 4.95487 15.9999 5.47533 15.9999 6.00062C15.9999 6.52591 15.8963 7.04497 15.6953 7.53027C15.4943 8.01558 15.1996 8.45705 14.8281 8.82848M17 1C17.6566 1.65661 18.1775 2.43612 18.5328 3.29402C18.8882 4.15192 19.0718 5.07127 19.0718 5.99985C19.0718 6.92844 18.8886 7.84815 18.5332 8.70605C18.1778 9.56396 17.6566 10.3435 17 11.0001M7 10C4.79086 10 3 8.20914 3 6C3 3.79086 4.79086 2 7 2C9.20914 2 11 3.79086 11 6C11 8.20914 9.20914 10 7 10Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Job Type</option>
              {/* --- THIS IS THE FIX --- */}
              {/* Map over the new array of objects */}
              {jobTypeOptions.map((typeOption) => (
                <option key={typeOption.value} value={typeOption.value}>{typeOption.label}</option>
              ))}
            </select>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>



          <div className="filter-segment salary-segment">
            

            <div className="salary-labels">
              <span>Salary Per Month</span>
              {/* --- FIX #1: Display monthly salary in the filter --- */}
              <span>
                ₹{(salaryRange[0] / 12).toFixed(1)}L - ₹{(salaryRange[1] / 12).toFixed(1)}L
              </span>
            </div>
            <div className="dual-slider-container">
              <div className="slider-track"></div>
              <div className="slider-range-highlight" style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}></div>
              <input type="range" min={MIN_SALARY} max={MAX_SALARY} value={salaryRange[0]} onChange={handleMinSalaryChange} className="thumb thumb-left" />
              <input type="range" min={MIN_SALARY} max={MAX_SALARY} value={salaryRange[1]} onChange={handleMaxSalaryChange} className="thumb thumb-right" />
            </div>
          </div>
        </div>
      </div>

      <div className="job-grid-container">
        <div className="job-grid">
          {isLoading ? (
            <p style={{gridColumn: '1 / -1', textAlign: 'center'}}>Loading jobs...</p>
          ) : error ? (
            <p style={{gridColumn: '1 / -1', textAlign: 'center', color: 'red'}}>{error}</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="time-badge">{formatJobDate(job.createdAt)}</div>
                <div className="job-logo">
                  <img src={`/logos/${job.companyName.toLowerCase()}.png`} onError={(e) => e.target.src = '/logos/default.png'} alt={`${job.companyName} logo`} />
                </div>
                <h3 className="job-title">{job.jobTitle}</h3>
                <div className="job-meta">
                  <span>
                    <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7 14.75C11.7 12.7618 9.28233 11.15 6.29999 11.15C3.31766 11.15 0.899994 12.7618 0.899994 14.75M15.3 12.05V9.35M15.3 9.35V6.65M15.3 9.35H12.6M15.3 9.35H18M6.29999 8.45C4.31177 8.45 2.69999 6.83822 2.69999 4.85C2.69999 2.86177 4.31177 1.25 6.29999 1.25C8.28822 1.25 9.89999 2.86177 9.89999 4.85C9.89999 6.83822 8.28822 8.45 6.29999 8.45Z" stroke="#5A5A5A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    1-3 yr Exp
                  </span>
                  <span>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.76364 16.3408H3.49091M3.49091 16.3408H12.1273M3.49091 16.3408V4.42274C3.49091 3.45538 3.49091 2.97133 3.67918 2.60185C3.84478 2.27684 4.10882 2.0128 4.43383 1.8472C4.80331 1.65894 5.28736 1.65894 6.25472 1.65894H9.36381C10.3312 1.65894 10.8142 1.65894 11.1837 1.8472C11.5087 2.0128 11.7736 2.27684 11.9392 2.60185C12.1273 2.97097 12.1273 3.45443 12.1273 4.4199V9.43166M12.1273 16.3408H17.3091M12.1273 16.3408V9.43166M17.3091 16.3408H19.0364M17.3091 16.3408V9.43166C17.3091 8.62686 17.309 8.22465 17.1775 7.90723C17.0022 7.484 16.6663 7.14754 16.243 6.97223C15.9256 6.84075 15.5228 6.84075 14.718 6.84075C13.9132 6.84075 13.5108 6.84075 13.1933 6.97223C12.7701 7.14754 12.4341 7.484 12.2588 7.90723C12.1273 8.22465 12.1273 8.62685 12.1273 9.43166M6.08182 7.70439H9.53637M6.08182 5.11348H9.53637" stroke="#5A5A5A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {job.location}
                  </span>
                  <span>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1728 10.0001L8.99096 15.4546L0.809143 10.0001M17.1728 13.6365L8.99096 19.091L0.809143 13.6365M17.1728 6.36373L8.99096 11.8183L0.809143 6.36373L8.99096 0.90918L17.1728 6.36373Z" stroke="#5A5A5A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {job.salaryMax / 100000} LPA
                  </span>
                </div>
                <ul className="job-desc">
                  {job.jobDescription.split('.') 
                    .filter(sentence => sentence.trim() !== '')
                    .slice(0, 2)
                    .map((sentence, index) => (
                      <li key={index}>{sentence.trim()}</li>
                  ))}
                </ul>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))
          ) : (
            <p style={{gridColumn: '1 / -1', textAlign: 'center'}}>No jobs found with the current filters.</p>
          )}
        </div>
      </div>

      <CreateJobModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onJobCreated={handleJobCreated}
      />
      
    <style jsx global>{
        `
        body {
          margin: 0;
          font-family: 'Satoshi', Inter, Arial, Helvetica, sans-serif;


          background-color: #F7F8FC;
        }
      `
    }
    </style>
    <style jsx>{


      `
        /* All your page styles remain the same... */
        .page-wrapper {
          overflow-x: hidden;
        }

        .main-layout {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }
        
        .navbar {
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }
        .nav-container {
            display: inline-flex;
            background: #fff;
            border: 1px solid #EAEAEA;
            border-radius: 9999px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          gap: 45px;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 30px;
          font-size: 16px;
          color: #555;
          padding: 0;
          margin: 0;
          font-weight:600;
        }
        .nav-links li {
            cursor: pointer;
        }
        .create-job-btn {
          background-image: linear-gradient(to right, #A128FF, #6100AD);
          border: none;
          color: #fff;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: bold;
          cursor: pointer;
          font-size: 15px;
        }
        
        .filters-container-outer {
          width: 100%;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          margin-top: 10px;
          margin-bottom: 30px;
        }

        .filters-container-inner {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          height: 70px;
          box-sizing: border-box;
        }

        .filter-segment {
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 12px;
          border-right: 1px solid #EAEAEA;
          flex-shrink: 0;
        }
        .filter-segment:first-child { flex-grow: 1.5; padding-left: 0; }
        .filter-segment:nth-child(2) ,
        .filter-segment:nth-child(3) { flex-grow: 1; }
        .filter-segment:last-child {
          border-right: none;
          flex-grow: 1.5;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          padding: 10px 20px 10px 20px;
        }
        .filter-segment input, .filter-segment select {
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          
          width: 100%;
          color: #333;
        }
        .filter-segment select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          cursor: pointer;
        }
        .chevron { margin-left: -28px; pointer-events: none; }
        
        .salary-labels {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #555;
            margin-bottom: 8px;
        }
        .dual-slider-container {
            position: relative;
            height: 20px;
            display: flex;
            align-items: center;
        }
        .slider-track, .slider-range-highlight {
            position: absolute;
            height: 4px;
            width: 100%;
            border-radius: 4px;
            top: 50%;
            transform: translateY(-50%);
        }
        .slider-track { background-color: #E0E0E0; }
        .slider-range-highlight { background-color: #222222; z-index: 2; }
        .thumb {
            -webkit-appearance: none; -moz-appearance: none;
            appearance: none; width: 100%; height: 20px;
            background: transparent; position: absolute;
            left: 0; pointer-events: none; z-index: 3;
        }
        .thumb::-webkit-slider-thumb {
            -webkit-appearance: none; pointer-events: all;
            width: 18px; height: 18px; background: #fff;
            border: 4px solid #222222; border-radius: 50%;
            cursor: pointer; box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }
        .thumb::-moz-range-thumb {
            pointer-events: all; width: 10px; height: 10px;
            background: #fff; border: 4px solid #222222;
            border-radius: 50%; cursor: pointer;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }
        
        .job-grid-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .job-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding: 20px 0;
        }
        @media (max-width: 1200px) { .job-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) { .job-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .job-grid { grid-template-columns: 1fr; } }

        .job-card {
          height: 360px;
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #EAEAEA;
          padding: 20px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .job-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); }
        .time-badge {
          position: absolute; top: 15px; right: 15px;
          background: rgba(176, 217, 255, 1); color: #070707ff; font-size: 12px;
          font-weight: 500; padding: 5px 10px; border-radius: 6px;
        }
        .job-logo {
          width: 60px; height: 60px; background-color: #f8f8f8;
          border-radius: 8px; display: flex; align-items: center;
          justify-content: center; margin-bottom: 14px;
        }
        .job-logo img { width: 50px; height: 50px; border-radius: 50%; }
        .job-title {
          font-size: 18px; font-weight: 700; color: #222;
          margin: 0 0 14px 0;
        }
        .job-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
          font-size: 14px; color: #555; margin-bottom: 16px;
        }
        .job-meta span { display: inline-flex; align-items: center; gap: 8px; }
        .job-meta svg { stroke: #555; }
        .job-desc {
          font-size: 14px; line-height: 1.5;
          color: #444; padding-left: 20px; margin: 0 0 16px 0;
        }
        .job-desc li { margin-bottom: 6px; }
        .apply-btn {
          margin-top: auto;
          width: 100%; background: rgba(0, 170, 255, 1);
          border: none; color: #fff; padding: 14px;
          border-radius: 8px; cursor: pointer; font-weight: bold;
          font-size: 15px; transition: background-color 0.2s;
        }
        .apply-btn:hover { background: #0088CC; }
      `

    }
    </style>
    </div>
  );
}