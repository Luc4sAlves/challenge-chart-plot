import React from "react";
import Chart from "./Chart";
import getDatabase from "./helper/getDataset";


export default function Body(){

    const [chart, setChart] = React.useState("")
    const [eventList, setEventList] = React.useState([])
    const [lineHelper, setLineHelper] = React.useState([])
    let eventObjects = []

    function addObjectFromString(array, objectString){
        let obj = {}
        eval("obj = " + objectString)
        array.push(obj)
        return array
    }

    function handleSubmit(event){
        event.preventDefault();

        let eventListString = chart.replace(/\r\n/g, "\n").split("\n");
        let obj = {}    

        for(let element in eventListString){
            eval("obj = " + eventListString[element])
            eventObjects.push(obj);
        }

        const [database, lineData] = getDatabase(eventObjects) 

        setEventList(database)
        setLineHelper(lineData)
    }

    function handleChange(event){
        setChart(prevChart => (
            event.target.value
        ))
    }

    return(
        <div className="body">
            <form class = "body-form" onSubmit={handleSubmit}>
                <div className="text-area">
                    <textarea spellCheck = {false} value={chart} onChange = {handleChange}></textarea>
                </div>
                <footer>
                    <input class = "body-form-submit" type="submit" value="GENERATE CHART" />
                </footer>
            </form>
            {eventList.length > 0 && <Chart events = {eventList} lines = {lineHelper}/>}
        </div>
    )
}