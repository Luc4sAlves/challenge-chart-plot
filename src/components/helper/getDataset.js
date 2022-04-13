import React from "react";
import {Line} from "recharts";

export default function getDatabase(events){

    function getGroupsFromStart(events){
        return events[0].group
    }
    
    function getGroupsFromData(data, groups){
        let dataString = ""
        for(let i in groups){
            dataString += data[groups[i]]
            if(i !== groups.length){
                dataString += "_"
            }
        }
        return dataString
    }
    
    function findGroupInDatabase(database, groupName){
        for(let i in database){
            if(database[i].label === groupName){
                return i
            }
        }
    }

    function getSelect(events){
        return events[0].select
    }
    
    function getTimePeriod(events){
        for(let i in events){
            if(events[i].type === "span"){
                return [events[i].begin, events[i].end]
            }
        }
    }

    function timeDifferenceFromStamps(begin, current){
        const beginDate = new Date(begin)
        const currentDate = new Date(current)
        
        let seconds = currentDate.getSeconds() - beginDate.getSeconds()
        let secondsString = seconds < 10? `0${seconds}`: seconds
        
        let milliseconds = currentDate.getMilliseconds() - beginDate.getMilliseconds()
        let millisecondsString = milliseconds < 10? `0${milliseconds}`: milliseconds
        
        return secondsString + ":" + millisecondsString
    }
    
    let database = []
    
    let computedGroups = []

    const timePeriods = getTimePeriod(events)
    const select = getSelect(events)

    for(let i in events){
        if(events[i].type === 'data'){
            //If we have more than 2 elements in group we need to make sort of a combination of all
            //of the present elements in the event list
            let groupName = getGroupsFromData(events[i], getGroupsFromStart(events))
            if(!computedGroups.includes(groupName)){
                computedGroups.push(groupName)
                
                let obj = {
                    label: groupName,
                }
                for(let element in select){
                    obj[select[element]] = [events[i][select[element]]]
                }                
                database.push(obj)
            }
            else{
                let index = findGroupInDatabase(database, groupName)
                for(let element in select){
                    database[index][select[element]].push(events[i][select[element]])
                }
            }
        }
    }
    
    let chartReady = []
    
    //This section is kinda ugly but I did this to make the chart as generic as possible
    for(let i in timePeriods){
        let obj = {
            name : timeDifferenceFromStamps(getTimePeriod(events)[0], timePeriods[i])
        }
        for(let j in database){
            for(let k in select){
                obj[`${database[j].label}${select[k]}`] = database[j][select[k]][i]
            }
            
        }
        chartReady.push(obj)
    }
    let lineData = []

    for(let prop in chartReady[0]){
        if(prop !== "name"){
            lineData.push(
                <Line type = "monotone" dataKey={prop} stroke = {"#"+Math.floor(Math.random()*16777215).toString(16)}  />
            )
        }
    }
    
    return [chartReady, lineData];
}