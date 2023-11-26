import Blog from './Blog.js';
import NavBar from './NavBar.js'
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import Feed from './Feed.js'
import Login from './Login.js';
import './styles.css'

function App() {
    const location = useLocation()
    const [CurrentUser, SetCurrentUser] = useState(window.localStorage.getItem('CurrentUser'))

    // source: https://adelpro.medium.com/how-to-persist-react-stats-after-a-refresh-part-1-23121360834e
    function DoLoginStuff(passedUser) {
        window.localStorage.setItem('CurrentUser', passedUser); // put username into local storage
        SetCurrentUser(passedUser)
    }

    return (
        <div>
            {location.pathname === '/login'? null : <NavBar CurrentUser={CurrentUser}/>}
            <div className='BelowNavBar'>
                <Routes>
                    <Route path='/login' element={<Login DoLoginStuff={DoLoginStuff}/>}/>
                    <Route path='/' element={<Feed CurrentUser={CurrentUser}/>} />
                    <Route path="/blog/:blog_id" element={<Blog CurrentUser={CurrentUser}/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
