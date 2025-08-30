import React from "react";
import "./ui/style/about.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="about-title">
          Over 10 Million Job Seekers Have Used FlexJobs Since 2007 To <br />
          <span className="highlight">Find A Better Way To Work</span>
        </h2>

        <p className="about-text">
          In 2007, FlexJobs’ founder, Sara Sutton, was looking for something
          better after losing her full-time job. She was seven months pregnant
          with her first child and needed something that was going to be
          flexible but would still help further her career.
        </p>
        <p className="about-text">
          That’s when the idea for FlexJobs came: A site where job seekers could
          find professional-level, flexible, and reliable job opportunities.
        </p>
      </div>

      <div className="about-image">
        <img
          src="https://img.freepik.com/free-photo/portrait-smiling-businesswoman-sitting-office-desk_23-2147896180.jpg"
          alt="Sara Sutton"
        />
      </div>
    </section>
  );
};

export default About;
