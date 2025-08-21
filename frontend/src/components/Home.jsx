import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Trustees from './Trustees';
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import About from './About'
import Testimonial from './Testimonial'
import AvoidScams from './Avoidscam'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./ui/style/home.css";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <Trustees />
      <LatestJobs />
      <CategoryCarousel/>
	  <AvoidScams />
	  <Testimonial />
      <Footer />
    </div>
  )
}

export default Home
