import { React, useState } from "react";
import DeleteIcon from './img/delete.svg'
import EditIcon from './img/edit.svg'
import DoneIcon from './img/check.svg'
import LikeIcon from './img/heart_plus.svg'
import LikedIcon from './img/heart_filled.svg'
import './styles.css';

function BlogCard({ post_data, CurrentUser }) {
    const [Content, SetContent] = useState(post_data.content)
    const [Editing, SetEditing] = useState(0)
    const [Liked, SetLiked] = useState(post_data.liked)
    const [LikeCount, SetLikeCount] = useState(post_data.num_likes)

    function ToggleEdit() {
        if (Editing) {
            UpdatePost()
        }
        SetEditing(!Editing)
    }

    async function UpdatePost() {
        const URL = "http://localhost:8080/update"
        console.log(Content)
        const requestBody = {post_id: post_data.post_id, content: Content}
        const requestData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }

        let responseData = await fetch(URL, requestData)
        responseData = await responseData.json()
        console.log(responseData)
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

    async function DeletePost() {
        const URL = 'http://localhost:8080/delete'
        const requestBody = {
            post_id: post_data.post_id
        }
        const requestData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }

        let responseData = await fetch(URL, requestData)
        responseData = await responseData.json()

        console.log(responseData)

        // source: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
        window.location.reload(false)
    }

    return (
        <div className="PostCard">
            <h3 className="PostCard-Title">{post_data.post_title}</h3>
            <hr/>
            {Editing ? <textarea className="PostEdit" defaultValue={Content} onChange={e => SetContent(e.target.value)}></textarea> : <p className="PostCard-Content">{Content}</p>}
            <div className="PostCard-Footer">
                {/* makes a nicely formattable Date object out of the ISO 8601 format that 'post_data.created_at' contains*/}
                <span>Posted: <b>{(new Date(post_data.created_at)).toLocaleString()}</b></span>
                <div className="FooterButtonContainer">
                    {CurrentUser === post_data.owner_name &&
                        <>
                            <button className="BlogCardButton"><img src={DeleteIcon} alt="" onClick={DeletePost}/></button>
                            <button className="BlogCardButton"><img src={Editing ? DoneIcon : EditIcon} alt="" onClick={ToggleEdit}/></button>
                        </>
                    }
                    <span>{LikeCount}</span>
                    <button className="BlogCardButton"><img src ={Liked ? LikedIcon : LikeIcon} alt="" onClick={ToggleLike}/></button>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
