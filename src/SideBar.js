import NewBlogForm from "./NewBlogForm.js"

function SideBar({CurrentUser}) {

    return(
        <div className="SideBar">
            <div className="SideBarCard">
                <span><b>Popular categories:</b></span>
                <ul>
                    <li>QIN_DYNASTY</li>
                    <li>PTOLEMAIC_EGYPT</li>
                    <li>GREECE</li>
                    <li>ROME</li>
                    <li>BABYLON</li>
                </ul>
            </div>

            {CurrentUser && <NewBlogForm CurrentUser={CurrentUser}/>}

            <div className="SideBarCard">
                <span><b>Site by David Britton</b></span>
                UA ISP Fall Semester 2023
            </div>
        </div>
    )
}

export default SideBar