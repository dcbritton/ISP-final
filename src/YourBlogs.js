import { useEffect } from "react"
import { useState } from "react"
import YourBlogCard from "./YourBlogCard"

function YourBlogs({CurrentUser}) {
    const [Blogs, SetBlogs] = useState([])

    useEffect(() => {
        async function fetchFeed() {
            const URL = `http://localhost:8080/yourblogs`
            const requestBody = {currentUser: CurrentUser}
            const requestData = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
            
            let responseData = await fetch(URL, requestData)
            responseData = await responseData.json()
            SetBlogs(responseData)
        }
        fetchFeed()
    }, [CurrentUser])

    return(
        <div className="YourBlogsContent">
            <div className="TitleCard">
                <span><b>Your Blogs!</b></span>
                <br/>
                {Blogs.length == 0 &&
                <div className="TitleCardFooter">
                    <span>No blogs? Start Posting!</span>
                </div>
                }
            </div>
            <div className="BelowTitleCard">
                <div className="PostCardsContainer">
                    {Blogs.map(blog => <YourBlogCard blog_data={blog} key={blog.blog_id}/>)}
                </div>
            </div>
        </div>
    )

}

export default YourBlogs