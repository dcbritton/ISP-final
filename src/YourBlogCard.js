import React, { useState } from "react"
import LikeIcon from './img/heart_plus.svg'
import LikedIcon from './img/heart_filled.svg'
import { useNavigate } from "react-router-dom"
import './styles.css'

function FeedCard({ blog_data }) {

    const navigate = useNavigate()
    function ChangeRoute() {
        navigate(`/blog/${blog_data.blog_id}`)
    }

    return (
        <div className="YourBlogCard">
            <h3 className="PostCard-Title" onClick={ChangeRoute}>{blog_data.title} </h3>
            <hr/>
            <div className="PostCard-Footer">
                {/* makes a nicely formattable Date object out of the ISO 8601 format that 'post_data.created_at' contains*/}
                <span>Since: <b>{(new Date(blog_data.created_at)).toLocaleString()}</b></span>
            </div>
        </div>
    );
}

export default FeedCard
