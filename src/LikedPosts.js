import { useEffect, useState } from "react"
import FeedCard from "./FeedCard.js"
import "./styles.css"

function LikedPosts({CurrentUser}) {
    const [Posts, SetPosts] = useState([])

    useEffect(() => {
        async function fetchFeed() {
            const URL = `http://localhost:8080/likes`
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

    return (
        <div className="Content">
            <div className="TitleCard">
                <span><b>Your Liked Posts!</b></span>
                <br/>
                <div className="TitleCardFooter">
                    {Posts.length == 0 && <span>No liked posts? Start reading!</span> }
                </div>
            </div>
            <div className="BelowTitleCard">
                <div className="PostCardsContainer-Liked">
                    {Posts.map(post => <FeedCard post_data={post} key={post.post_id} CurrentUser={CurrentUser}/>)}
                </div>
            </div>
        </div>
    )
}

export default LikedPosts