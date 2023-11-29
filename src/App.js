import Blog from './Blog.js';
import NavBar from './NavBar.js'
import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Feed from './Feed.js'
import Login from './Login.js';
import Register from './Register.js';
import './styles.css'
import LikedPosts from './LikedPosts.js';
import YourBlogs from './YourBlogs.js';

function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const [CurrentUser, SetCurrentUser] = useState(window.localStorage.getItem('CurrentUser'))
    const [SearchFilters, SetSearchFilters] = useState({title: "", author: "", content: "", category: ""})

    // source: https://adelpro.medium.com/how-to-persist-react-stats-after-a-refresh-part-1-23121360834e
    function DoLoginStuff(passedUser) {
        window.localStorage.setItem('CurrentUser', passedUser); // put username into local storage
        SetCurrentUser(passedUser)
    }

    function DoLogoutStuff() {
        window.localStorage.removeItem('CurrentUser'); // put username into local storage
        SetCurrentUser('')
        if (location.pathname === '/')
            window.location.reload(false)
        else
            navigate('/')
    }

    return (
        <div>
            {location.pathname === '/login' || location.pathname === '/register'
            ?
            null
            :
            <NavBar DoLogoutStuff={DoLogoutStuff} CurrentUser={CurrentUser} SetSearchFilters={SetSearchFilters}/>
            }
            <div className='BelowNavBar'>
                <Routes>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login DoLoginStuff={DoLoginStuff}/>}/>
                    <Route path='/' element={<Feed CurrentUser={CurrentUser} SearchFilters={SearchFilters}/>} />
                    <Route path="/blog/:blog_id" element={<Blog CurrentUser={CurrentUser}/>}/>
                    <Route path='/likes' element={<LikedPosts CurrentUser={CurrentUser}/>}/>
                    <Route path='/blogs' element={<YourBlogs CurrentUser={CurrentUser}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
