import { useEffect } from "react"
import { useState } from "react"
import FeedCard from "./FeedCard"
import SideBar from "./SideBar"
 
function Feed({CurrentUser}) {
    const [Posts, SetPosts] = useState([])

    useEffect(() => {
        console.log("logged in as", CurrentUser)
        async function fetchFeed() {
            const URL = `http://localhost:8080/`
            const requestBody = {currentUser: CurrentUser}
            const requestData = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
            
            let responseData = await fetch(URL, requestData)
            responseData = await responseData.json()
            SetPosts(responseData)
        }
        fetchFeed()
    }, [CurrentUser])

    return(
        <div className="Content">
            <div className="BelowTitleCard">
                <div className="PostCardsContainer">
                    {Posts.map(post => <FeedCard post_data={post} key={post.post_id} CurrentUser={CurrentUser}/>)}
                </div>
                <SideBar CurrentUser={CurrentUser}/>
            </div>
        </div>
    )
}

export default Feed