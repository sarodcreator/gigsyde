import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ui/style/latestjobs.css';

const LatestJobCards = ({ job, index }) => {
  const navigate = useNavigate();

  // Placeholder logo URL based on company name
  const logoUrl = job?.company?.name
    ? `https://via.placeholder.com/50?text=${encodeURIComponent(job.company.name.slice(0, 2))}`
    : 'https://via.placeholder.com/50';

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  console.log("Job Data in Card:", job); // Log job data for each card

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className="job-card"
    >
      <div className="job-card-header">
        <img src={logoUrl} alt={`${job?.company?.name || 'Company'} logo`} className="company-logo" />
        <div className="job-info">
          <h1 className="job-title">{job?.title || 'Job Title Not Available'}</h1>
          <p className="company-name">{job?.company?.name || 'Company Name Not Available'}</p>
          <p className="location">India</p>
        </div>
      </div>
      <div className="job-details">
        <p className="description">
          {job?.description || 'No description available. Click to learn more.'}
        </p>
      </div>
      <div className="job-badges">
        <Badge className="badge-positions" variant="ghost">
          {job?.position || 1} Position{job?.position === 1 ? '' : 's'}
        </Badge>
        <Badge className="badge-salary" variant="ghost">
          {job?.salary ? `${job.salary} LPA` : 'Salary Not Available'}
        </Badge>
        <Badge className="badge-type" variant="ghost">
          {job?.jobType || 'Type Not Available'}
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
