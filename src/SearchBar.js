import XIcon from './img/x.svg'

function SearchBar() {


    
    return (
        <span className="SearchBar">
            <div className="FilterGroup">
                <div className="Filter"><button className="FilterXButton"><img src={XIcon} alt=''></img></button>author:</div>
                <span contentEditable="true" className="SubInput" type="text">aaaa</span>
            </div>
            <div className="FilterGroup">
                <div className="Filter"><button className="FilterXButton"><img src={XIcon} alt=''></img></button>content:</div>
                <span contentEditable="true" className="SubInput" type="text">aaaa</span>
            </div>
            <div className="FilterGroup">
                <div className="Filter"><button className="FilterXButton"><img src={XIcon} alt=''></img></button>category:</div>
                <span contentEditable="true" className="SubInput" type="text">aaaa</span>
            </div>
        </span>
    )
}

export default SearchBar