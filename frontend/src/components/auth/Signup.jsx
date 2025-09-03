import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import Image from '../images/janis-dzenis-Qk3wDzNKnF0-unsplash.jpg';
import './style.css';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviews = [Image, Image, Image, Image, Image];

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="signup-sec reverse">
        <div className="left-secImg">
          <h1>Do you need money, Let's get you started</h1>
          <p>
            Discover endless opportunities with Sharpallyjobs, your trusted partner in finding the perfect career. Whether you're a job seeker aiming for growth or an employer searching for top talent, we connect the right people to the right opportunities. Start your journey today and take the first step towards a brighter future.
          </p>
          <div className="reviews">
            {reviews.map((review, index) => (
              <img key={index} src={review} alt={`review${index + 1}`} className="review" />
            ))}
            <h4 className="users-no">Over 200+ Users</h4>
          </div>
        </div>
        <div className="r-sec">
          <div className="signupform">
            <h1 className="logo">
              Sharpally<span>Jobs</span>
            </h1>
            <form onSubmit={submitHandler}>
              <h1>Create an Account</h1>
              <div className="form-data">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="pointer"
                />
              </div>
              <div className="form-data">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="johndoe@gmail.com"
                  className="pointer"
                />
              </div>
              <div className="form-data">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="8000-000-0000"
                  className="pointer"
                />
              </div>
              <div className="form-data">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="********"
                  className="pointer"
                />
              </div>
              <div className="interest">
                <h3 className="t">What are you interested in?</h3>
                <RadioGroup className="option">
                  <div className="options">
                    <Input
                      type="radio"
                      name="role"
                      value="hire"
                      checked={input.role === 'hire'}
                      onChange={changeEventHandler}
                      className="pointer"
                      id="recruiter"
                    />
                    <Label htmlFor="recruiter">Hire</Label>
                  </div>
                  <div className="options">
                    <Input
                      type="radio"
                      name="role"
                      value="talent"
                      checked={input.role === 'talent'}
                      onChange={changeEventHandler}
                      className="pointer"
                      id="talent"
                    />
                    <Label htmlFor="talent">Talent</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="profiles">
                <Label htmlFor="profile" className="profile-label">
                  Upload an image
                </Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="img-selector"
                />
              </div>
              {loading ? (
                <Button className="button">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="button">
                  Create Account
                </Button>
              )}
              <span className="login-link">
                Already have an account?{' '}
                <Link to="/login" className="login-btnlink">
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;