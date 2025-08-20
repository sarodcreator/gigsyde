// controllers/externalJob.controller.js
/*import axios from "axios";

let cachedJobs = [];
let lastFetchTime = 0;

// Function to fetch jobs from APIs
const fetchJobs = async (keyword = "developer") => {
  try {
    // JSearch
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
    res.json(response.data);

    // Remotive
    const remotivePromise = axios.get("https://remotive.io/api/remote-jobs", {
      params: { search: keyword }
    });

    // RemoteOK
    const remoteokPromise = axios.get("https://remoteok.com/api");

    const [jsearchRes, remotiveRes, remoteokRes] = await Promise.allSettled([
      jsearchPromise,
      remotivePromise,
      remoteokPromise,
    ]);

    let jobs = [];

    // JSearch
    if (jsearchRes.status === "fulfilled") {
      jobs = jobs.concat(
        jsearchRes.value.data.data.map(job => ({
          source: "JSearch",
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city || job.job_country,
          url: job.job_apply_link,
        }))
      );
    }

    // Remotive
    if (remotiveRes.status === "fulfilled") {
      jobs = jobs.concat(
        remotiveRes.value.data.jobs.map(job => ({
          source: "Remotive",
          title: job.title,
          company: job.company_name,
          location: job.candidate_required_location,
          url: job.url,
        }))
      );
    }

    // RemoteOK
    if (remoteokRes.status === "fulfilled") {
      jobs = jobs.concat(
        remoteokRes.value.data
          .filter(job => job.position)
          .map(job => ({
            source: "RemoteOK",
            title: job.position,
            company: job.company,
            location: job.location,
            url: job.url,
          }))
      );
    }

    cachedJobs = jobs;
    lastFetchTime = Date.now();

  } catch (error) {
    console.error("Error fetching jobs:", error.message);
  }
};

// Refresh every 2 minutes
setInterval(() => {
  fetchJobs();
}, 2 * 60 * 1000);

// Controller
export const getExternalJobs = async (req, res) => {
  const { keyword } = req.query;

  // If cache is empty, fetch immediately
  if (!cachedJobs.length || Date.now() - lastFetchTime > 2 * 60 * 1000) {
    await fetchJobs(keyword || "developer");
  }

  res.json({ jobs: cachedJobs });
};
*/

// controllers/externalJob.controller.js
import axios from "axios";

let cachedJobs = [];
let lastFetchTime = 0;

// Function to fetch jobs from APIs
const fetchJobs = async (keyword = "developer") => {
  try {
    // JSearch
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

    // Remotive
    const remotivePromise = axios.get("https://remotive.io/api/remote-jobs", {
      params: { search: keyword }
    });

    // RemoteOK
    const remoteokPromise = axios.get("https://remoteok.com/api");

    const [jsearchRes, remotiveRes, remoteokRes] = await Promise.allSettled([
      jsearchPromise,
      remotivePromise,
      remoteokPromise,
    ]);

    let jobs = [];

    // JSearch
    if (jsearchRes.status === "fulfilled") {
      jobs = jobs.concat(
        jsearchRes.value.data.data.map(job => ({
          source: "JSearch",
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city || job.job_country,
          url: job.job_apply_link,
        }))
      );
    }

    // Remotive
    if (remotiveRes.status === "fulfilled") {
      jobs = jobs.concat(
        remotiveRes.value.data.jobs.map(job => ({
          source: "Remotive",
          title: job.title,
          company: job.company_name,
          location: job.candidate_required_location,
          url: job.url,
        }))
      );
    }

    // RemoteOK
    if (remoteokRes.status === "fulfilled") {
      jobs = jobs.concat(
        remoteokRes.value.data
          .filter(job => job.position)
          .map(job => ({
            source: "RemoteOK",
            title: job.position,
            company: job.company,
            location: job.location,
            url: job.url,
          }))
      );
    }

    cachedJobs = jobs;
    lastFetchTime = Date.now();

  } catch (error) {
    console.error("Error fetching jobs:", error.message);
  }
};

// Refresh every 2 minutes
setInterval(() => {
  fetchJobs();
}, 2 * 60 * 1000);

// Controller
export const getExternalJobs = async (req, res) => {
  const { keyword } = req.query;

  // If cache is empty or older than 2 minutes, fetch immediately
  if (!cachedJobs.length || Date.now() - lastFetchTime > 2 * 60 * 1000) {
    await fetchJobs(keyword || "developer");
  }

  if (cachedJobs.length > 0) {
    res.json({ jobs: cachedJobs });
  } else {
    res.status(404).json({ error: "No jobs found" });
  }
};
