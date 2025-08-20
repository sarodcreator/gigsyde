import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import "./shared.css"; // <-- use CSS for styling

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Logo */}
        <div className="logo">
          <h1>gigs<span className='logospan'>y</span>de</h1>
        </div>

        {/* If NOT logged in → show login/signup */}
        {!user && (
          <div className="auth-buttons">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}

        {/* If logged in → show nav menu */}
        {user && (
          <nav className="nav-menu">
            <ul>
              {user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                  <li>
                    <Link to="/admin/post-job">
                      <Button>Post Job</Button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )}
            </ul>

            {/* User dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="user-info">
                  <div className="user-header">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <h4>{user?.fullname}</h4>
                      <p>{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="user-actions">
                    {user.role === 'student' && (
                      <div className="profile-link">
                        <User2 />
                        <Link to="/profile">
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </div>
                    )}

                    <div className="logout-link">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;