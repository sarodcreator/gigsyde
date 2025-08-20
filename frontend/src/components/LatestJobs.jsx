// import React from 'react'
// import LatestJobCards from './LatestJobCards';
// import { useSelector } from 'react-redux'; 

// // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

// const LatestJobs = () => {
//     const {allJobs} = useSelector(store=>store.job);
   
//     return (
//         <div className='max-w-7xl mx-auto my-20'>
//             <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
//             <div className='grid grid-cols-3 gap-4 my-5'>
//                 {
//                     allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default LatestJobs

import React, { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [externalJobs, setExternalJobs] = useState([]);
    const [latestExternalJobs, setLatestExternalJobs] = useState([]);

    // Fetch external jobs
    useEffect(() => {
        const fetchExternalJobs = async () => {
            try {
                const res = await fetch("/api/externaljob"); // <-- from externalJob.route.js
                const data = await res.json();

                if (Array.isArray(data)) {
                    setExternalJobs(data);

                    // latest = jobs updated within last 2 mins
                    const twoMinsAgo = new Date(Date.now() - 2 * 60 * 1000);
                    const latest = data.filter(job => new Date(job.updatedAt) >= twoMinsAgo);

                    setLatestExternalJobs(latest);
                }
            } catch (err) {
                console.error("Error fetching external jobs:", err);
            }
        };

        fetchExternalJobs();
        const interval = setInterval(fetchExternalJobs, 120000); // refresh every 2 mins
        return () => clearInterval(interval);
    }, []);

    // Merge jobs: admin + external (random + latest)
    const mergedJobs = [
        ...allJobs.slice(0, 6),  // admin jobs
        ...externalJobs.sort(() => 0.5 - Math.random()).slice(0, 3), // 3 random external
        ...latestExternalJobs.slice(0, 3) // 3 latest external
    ];

    return (
        <div className="latest-jobs-container">
            <h1 className="heading">
                <span className="highlight">Latest & Top </span> Job Openings
            </h1>
            <div className="job-grid">
                {
                    mergedJobs.length <= 0 
                        ? <span>No Job Available</span> 
                        : mergedJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    );
};

export default LatestJobs;
