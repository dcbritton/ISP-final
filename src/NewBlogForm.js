import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function NewBlogForm({CurrentUser}) {
    const [Form, SetForm] = useState()
    const [Title, SetTitle] = useState('')
    const [Category, SetCategory] = useState('')
    const navigate = useNavigate()

    function ToggleForm() {
        SetForm(!Form)
    }
    
    async function CreateBlog() {
        const URL = 'http://localhost:8080/blog/create'
        const requestBody = {
            currentUser: CurrentUser,
            title: Title,
            category: Category
        }
        const requestData = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        }
        let responseData = await fetch(URL, requestData)
        let status = responseData.status
        responseData = await responseData.json()
        if(status === 200) {
            navigate('/blogs')
        }
        else {
            // change form innerhtml?
            console.log(responseData)
        }
    }

    return (
        <div className="SideBarCard">
            {Form ?
            <>
                <span><b>What's your new blog about?</b></span>
                <input className='NewBlogInput' placeholder='Title...' type='text' onChange={e => SetTitle(e.target.value)}/>
                <input className='NewBlogInput' placeholder='BLOG_CATEGORY'type='text' onChange={e => SetCategory(e.target.value)}/>
                <div className='NewBlogFormButtonContainer'>
                    <button className='NewBlogFormButton'onClick={CreateBlog}>Finalize</button>
                    <button className='NewBlogFormButton' onClick={ToggleForm}>Cancel</button>
                </div>

            </>
            : 
            <>
                <span><b>Have an idea?</b></span>
                <button className="NewBlogButton" onClick={ToggleForm}><span>+ </span>New Blog</button>
            </>
            }
        </div>
    )
}

export default NewBlogForm