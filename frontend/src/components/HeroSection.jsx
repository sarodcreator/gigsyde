import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import "./ui/style/hero.css";
import HeroImage from "../images/Heroimage.jpg";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='heroSection'>
            <div className='hero-l'>
                {/* <span className='heroBadge'>Get the most secure remote jobs </span> */}
                <h1 className='heading'>Apply for <br /><span className="herospan">Remote jobs</span> from <br />trusted companies </h1>
                <p>Get Remote job opportunities available across all fields from anywhere <br /> in the world. No stress, browse and apply to scam free jobs.</p>
                <div className='search'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='searchField'

                    />
                    <Button onClick={searchJobHandler} className="searchbtn">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
            <div className="heroImage">
                <img src={HeroImage} alt="someone working with a computer" id="Heroimg"/>
                {/* {<HeroImage />} */}
            </div>
        </div>
    )
}

export default HeroSection