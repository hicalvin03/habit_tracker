import TodoPage from '../pages/Todo'
import './navbutton.css'

function NavButton({setPage}){

    function buttonClicked(event){
        setPage(event.target.value)
    }

    return(
        <div id="firstFilter" className="filter-switch">
            <input checked="" id="option1" name="options" value="TodoPage" type="radio" onChange={buttonClicked}/>
            <label className="option" for="option1">Homepage</label>
            <input id="option2" name="options" value="CalendarPage" type="radio" onChange={buttonClicked}/>
            <label className="option" for="option2">Calendar</label>
            <span className="background"></span>
        </div>


    )
}

export default NavButton