import { useEffect } from "react"
import { useState } from "react"
import FeedCard from "./FeedCard"
import SideBar from "./SideBar"
import BackIcon from './img/left.svg'
import ForwardIcon from './img/right.svg'
 
function Feed({CurrentUser, SearchFilters}) {
    const [Posts, SetPosts] = useState([])
    const [Page, SetPage] = useState(1)

    useEffect(() => {
        console.log(SearchFilters)
        async function fetchFeed() {
            const URL = `http://localhost:8080/`
            const requestBody = {
                currentUser: CurrentUser,
                SearchFilters: SearchFilters,
                page: Page 
            }
            const requestData = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
            
            let responseData = await fetch(URL, requestData)
            responseData = await responseData.json()
            console.log(responseData)
            SetPosts(responseData)
        }
        fetchFeed()
    }, [CurrentUser, SearchFilters, Page])

    function PageForward() {
        SetPage(Page + 1)
    }

    function PageBack() {
        if (Page > 1)
            SetPage(Page - 1)
    }

    return(
        <div className="Content">
            <div className="TitleCard">
                <span><b>Feed</b></span>
                <br/>
                <div className="TitleCardFooter">
                    <span>As of <b>{(new Date()).toLocaleString()}</b></span>
                </div>
            </div>

            <div className="PageButtonContainer">
                <button className='PageButton'><img src={BackIcon} alt='' onClick={PageBack}/></button>
                <button className='PageButton'><img src={ForwardIcon} alt='' onClick={PageForward}/></button>
            </div>

            <div className="BelowTitleCard">
                
                <div className="PostCardsContainer">
                    {Posts.map(post => <FeedCard post_data={post} key={post.post_id} CurrentUser={CurrentUser}/>)}
                </div>
                <SideBar CurrentUser={CurrentUser}/>
            </div>
            <div className="PageButtonContainer">
                <button className='PageButton'><img src={BackIcon} alt='' onClick={PageBack}/></button>
                <button className='PageButton'><img src={ForwardIcon} alt='' onClick={PageForward}/></button>
            </div>
        </div>
    )
}

export default Feed