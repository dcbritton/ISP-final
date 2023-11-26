import React, { useState } from "react"
import LikeIcon from './img/heart_plus.svg'
import LikedIcon from './img/heart_filled.svg'
import { useNavigate } from "react-router-dom"
import './styles.css'

function FeedCard({ post_data, CurrentUser }) {
    const [Liked, SetLiked] = useState(post_data.liked);
    const [LikeCount, SetLikeCount] = useState(post_data.num_likes)
    const navigate = useNavigate()
    function ChangeRoute() {
        navigate(`/blog/${post_data.blog_id}`)
    }

    function ToggleLike() {
        if (!Liked) {
            LikePost()
        }
        else {
            UnlikePost()
        }
        SetLiked(!Liked)

    }

    async function UnlikePost() {
        SetLikeCount(LikeCount - 1)
        const URL = 'http://localhost:8080/unlike'
        const requestBody = {
            currentUser: CurrentUser,
            id: post_data.post_id
        }
        const requestData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }

        let responseData = await fetch(URL, requestData)
        responseData = await responseData.json()

        console.log(responseData)
    }

    async function LikePost() {
        SetLikeCount(LikeCount + 1)
        const URL = 'http://localhost:8080/like'
        const requestBody = {
            currentUser: CurrentUser,
            id: post_data.post_id
        }
        const requestData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }

        let responseData = await fetch(URL, requestData)
        responseData = await responseData.json()

        console.log(responseData)
    }

    return (
        <div className="PostCard">
            <h3 className="PostCard-Title" onClick={ChangeRoute}>{post_data.post_title} </h3>
            <hr/>
            <p className="PostCard-Content">{post_data.content}</p>
            <div className="PostCard-Footer">
                {/* makes a nicely formattable Date object out of the ISO 8601 format that 'post_data.created_at' contains*/}
                <span>Posted: <b>{(new Date(post_data.created_at)).toLocaleString()}</b> by <b>{post_data.owner_name}</b></span>
                <div className="FooterButtonContainer">
                    <span>{LikeCount}</span>
                    <button className="BlogCardButton"><img src ={Liked ? LikedIcon : LikeIcon} alt="" onClick={ToggleLike}/></button>
                </div>
            </div>
        </div>
    );
}

export default FeedCard
