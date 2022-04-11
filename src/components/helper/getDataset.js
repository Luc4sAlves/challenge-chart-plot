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
    
    let database = []
    
    let computedGroups = []

    const timePeriods = getTimePeriod(events)
    const select = getSelect(events)

    for(let i in events){
        if(events[i].type === 'data'){
            
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
    
    let chartReady = []
    

    for(let i in timePeriods){
        let obj = {
            name: timePeriods[i]
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