// controllers/externalJob.controller.js
import axios from "axios";

let cachedJobs = [];
let lastFetchTime = 0;

const fetchJobs = async (keyword = "developer") => {
  try {
    console.log("Fetching jobs with keyword:", keyword);
    const jsearchPromise = axios.get("https://jsearch.p.rapidapi.com/search", {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      },
      params: {
        query: keyword,
        page: 1,
        num_pages: 1,
      }
    });

    const remotivePromise = axios.get("https://remotive.io/api/remote-jobs", {
      params: { search: keyword }
    });

    const remoteokPromise = axios.get("https://remoteok.com/api");

    const [jsearchRes, remotiveRes, remoteokRes] = await Promise.allSettled([
      jsearchPromise,
      remotivePromise,
      remoteokPromise,
    ]);

    let jobs = [];

    if (jsearchRes.status === "fulfilled") {
      console.log("JSearch data received:", jsearchRes.value.data.data.length, "jobs");
      jobs = jobs.concat(
        jsearchRes.value.data.data.map(job => ({
          _id: job.job_id || Date.now() + Math.random(), // Unique ID for React key
          source: "JSearch",
          title: job.job_title,
          company: { name: job.employer_name },
          description: job.job_description || "No description available",
          position: 1, // Default, adjust if API provides
          salary: "50-70", // Example, adjust if API provides
          jobType: "Remote", // Example, adjust if API provides
          location: job.job_city || job.job_country,
          url: job.job_apply_link,
          company_logo: `https://via.placeholder.com/150?text=${encodeURIComponent(job.employer_name)}`,
          updatedAt: new Date().toISOString(), // Add for latest filter
        }))
      );
    } else {
      console.log("JSearch failed:", jsearchRes.reason);
    }

    if (remotiveRes.status === "fulfilled") {
      console.log("Remotive data received:", remotiveRes.value.data.jobs.length, "jobs");
      jobs = jobs.concat(
        remotiveRes.value.data.jobs.map(job => ({
          _id: job.id || Date.now() + Math.random(),
          source: "Remotive",
          title: job.title,
          company: { name: job.company_name },
          description: job.description || "No description available",
          position: 1,
          salary: "40-60",
          jobType: "Remote",
          location: job.candidate_required_location,
          url: job.url,
          company_logo: `https://via.placeholder.com/150?text=${encodeURIComponent(job.company_name)}`,
          updatedAt: new Date().toISOString(),
        }))
      );
    } else {
      console.log("Remotive failed:", remotiveRes.reason);
    }

    if (remoteokRes.status === "fulfilled") {
      console.log("RemoteOK data received:", remoteokRes.value.data.filter(job => job.position).length, "jobs");
      jobs = jobs.concat(
        remoteokRes.value.data
          .filter(job => job.position)
          .map(job => ({
            _id: job.id || Date.now() + Math.random(),
            source: "RemoteOK",
            title: job.position,
            company: { name: job.company },
            description: job.description || "No description available",
            position: 1,
            salary: "30-50",
            jobType: "Remote",
            location: job.location,
            url: job.url,
            company_logo: `https://via.placeholder.com/150?text=${encodeURIComponent(job.company)}`,
            updatedAt: new Date().toISOString(),
          }))
      );
    } else {
      console.log("RemoteOK failed:", remoteokRes.reason);
    }

    cachedJobs = jobs;
    console.log("Total jobs cached:", jobs.length);
    lastFetchTime = Date.now();
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
  }
};

setInterval(() => {
  fetchJobs();
}, 2 * 60 * 1000);

export const getExternalJobs = async (req, res) => {
  const { keyword } = req.query;
  console.log("Request received for keyword:", keyword);

  if (!cachedJobs.length || Date.now() - lastFetchTime > 2 * 60 * 1000) {
    await fetchJobs(keyword || "developer");
  }

  if (cachedJobs.length > 0) {
    res.json({ jobs: cachedJobs });
  } else {
    console.log("No jobs in cache, returning 404");
    res.status(404).json({ error: "No jobs found" });
  }
};
