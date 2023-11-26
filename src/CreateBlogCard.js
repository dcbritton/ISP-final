import { React, useState } from "react";
import DeleteIcon from './img/delete.svg'
import DoneIcon from './img/check.svg'
import './styles.css';

function CreateBlogCard({ blog_id, CurrentUser, ToggleCreating }) {
    const [Content, SetContent] = useState("")
    const [Title, SetTitle] = useState("")

    async function Post() {
        const URL = 'http://localhost:8080/post/create'
        const requestBody = {
            blog_id: blog_id,
            currentUser: CurrentUser,
            title: Title,
            content: Content
        }
        const requestData = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        }
        let responseData = await fetch(URL, requestData)
        let status = responseData.status
        responseData = await responseData.json()
        if (status === 200) {
            console.log(responseData)
            ToggleCreating()
            window.location.reload(false)
        }
        else 
            console.log("something went wrong")
    }

    function Cancel() {
        ToggleCreating()
    }

    return (
        <div className="PostCard">
            <input className="TitleEdit" placeholder="Title" onChange={e => SetTitle(e.target.value)}></input>
            <hr/>
            <textarea className="PostEdit" placeholder="Content" onChange={e => SetContent(e.target.value)}></textarea>
            <div className="PostCard-Footer">
                <div className="FooterButtonContainer">
                    <button className="BlogCardButton" onClick={Cancel}><img src={DeleteIcon} alt=""/></button>
                    <button className="BlogCardButton" onClick={Post}><img src={DoneIcon} alt=""/></button>
                </div>
            </div>
        </div>
    );
}

export default CreateBlogCard;
