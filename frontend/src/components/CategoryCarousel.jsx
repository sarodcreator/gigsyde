// src/components/JobType.jsx
import React from 'react';
import { FaLaptopCode, FaBriefcase, FaUserTie, FaTools } from 'react-icons/fa';
import Card from './card';
import './ui/style/category.css';

const jobData = [
  {
    icon: FaLaptopCode,
    title: 'Tech Jobs',
    description: 'Explore opportunities in software development, IT, and tech support.',
  },
  {
    icon: FaBriefcase,
    title: 'Corporate Jobs',
    description: 'Find roles in management, finance, and administrative positions.',
  },
  {
    icon: FaUserTie,
    title: 'Freelance Gigs',
    description: 'Work independently on projects in design, writing, and more.',
  },
  {
    icon: FaTools,
    title: 'Skilled Trades',
    description: 'Discover jobs in construction, plumbing, and other trades.',
  },
];

const JobType = () => {
  return (
    <section className="job-type-container">
      <h2>What type of job are you looking for?</h2>
      <div className="job-cards">
        {jobData.map((job, index) => (
          <Card
            key={index}
            icon={job.icon}
            title={job.title}
            description={job.description}
          />
        ))}
      </div>
    </section>
  );
};

export default JobType;
