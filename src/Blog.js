import { useEffect } from "react";
import BlogCard from "./BlogCard.js"
import { useParams } from "react-router-dom"
import { useState } from 'react'
import SideBar from "./SideBar.js";
import CreateBlogCard from "./CreateBlogCard.js";

function Blog({CurrentUser}) {
    const [Creating, SetCreating] = useState()
    const { blog_id } = useParams()
    const [ BlogData, SetBlogData ] = useState({})
    const [ BlogPosts, SetBlogPosts] = useState([])

    useEffect(() => {

        async function fetchBlogData() {
            const URL = `http://localhost:8080/blog/${blog_id}/data`
            const requestBody = {
                dummy: "dummy"
            }
            const requestData = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
    
            let responseData = await fetch(URL, requestData)
            responseData = await responseData.json()
            // console.log(responseData)

            SetBlogData(responseData)
        }

        async function fetchPosts() {
            const URL = `http://localhost:8080/blog/${blog_id}`
            const requestBody = {
                currentUser: CurrentUser
            }
            const requestData = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
    
            let responseData = await fetch(URL, requestData)
            responseData = await responseData.json()

            SetBlogPosts(responseData)
            // console.log(responseData)
        }
        fetchBlogData()
        fetchPosts()
    }, [blog_id, CurrentUser])

    function ToggleCreating() {
        SetCreating(!Creating)
    }
    
    return (
        <div className="Content">
            <div className="TitleCard">
                <span><b>{BlogData.title}</b></span>
                <br/>
                <div className="TitleCardFooter">
                    <span>Blog by <b>{BlogData.owner_name}</b> since <b>{(new Date(BlogData.created_at)).toLocaleString()}</b>. </span>
                    <span>Category: <b>{BlogData.category}</b></span>
                </div>
            </div>

            <div className="BelowTitleCard">
                <div className="PostCardsContainer">
                    {Creating && <CreateBlogCard blog_id={blog_id} CurrentUser={CurrentUser} ToggleCreating={ToggleCreating}/>}
                    {BlogPosts.map(post => <BlogCard key={post.post_id} post_data={post} CurrentUser = {CurrentUser}/>)}
                </div>

                <div className="SideBarContainer">
                    {/* this is unfortunate but it's 100x easier to put the new post in Blog.js rather than SideBar */}
                    {BlogData.owner_name === CurrentUser && !Creating &&
                        <div className="SideBarCard">
                            <span><b>Have more to say?</b></span>
                            <button className="NewBlogButton" onClick={ToggleCreating}><span>+ </span>New Post</button>
                        </div>
                    }
                    <SideBar CurrentUser={CurrentUser} BlogData={BlogData}/>
                </div>
            </div>
        </div>
    );
}

export default Blog;