import React, { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [externalJobs, setExternalJobs] = useState([]);
  const [latestExternalJobs, setLatestExternalJobs] = useState([]);

  useEffect(() => {
    const fetchExternalJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/externaljob/jobs");
        const data = await res.json();
        console.log("API Response Status:", res.status);
        console.log("API Response:", data); // Log full response

        if (data.jobs && Array.isArray(data.jobs)) {
          setExternalJobs(data.jobs);
          console.log("External Jobs:", data.jobs);

          const twoMinsAgo = new Date(Date.now() - 2 * 60 * 1000);
          const latest = data.jobs.filter((job) => {
            const updatedAt = job.updatedAt ? new Date(job.updatedAt) : null;
            return updatedAt && updatedAt >= twoMinsAgo;
          });
          setLatestExternalJobs(latest);
          console.log("Latest External Jobs:", latest);
        } else {
          console.warn("Unexpected data format or no jobs:", data);
          setExternalJobs([]);
          setLatestExternalJobs([]);
        }
      } catch (err) {
        console.error("Error fetching external jobs:", err.message, err.stack);
        setExternalJobs([]);
        setLatestExternalJobs([]);
      }
    };

    fetchExternalJobs();
    const interval = setInterval(fetchExternalJobs, 120000);
    return () => clearInterval(interval);
  }, []);

  const mergedJobs = [
    ...allJobs.slice(0, 6),
    ...externalJobs.sort(() => 0.5 - Math.random()).slice(0, 3),
    ...latestExternalJobs.slice(0, 3),
  ];
  console.log("Merged Jobs:", mergedJobs);
  console.log("All Jobs from Redux:", allJobs); // Log Redux data

  return (
    <div className="latest-jobs-container">
      <h1 className="heading">
        <span className="highlight">Latest & Top </span> Job Openings
      </h1>
      <div className="job-grid">
        {mergedJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          mergedJobs.map((job, index) => <LatestJobCards key={job._id} job={job} index={index} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
