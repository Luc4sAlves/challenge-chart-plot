import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart(props){
    return(
        <div className="chart">
          <ResponsiveContainer width={"99%"} height={350}>
            <LineChart
            width= {800}
            height={350}
            data={props.events}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend layout="vertical" verticalAlign="top" align="right" margin={{left: 40}} />
                {props.lines}
            </LineChart>
          </ResponsiveContainer>
        </div>
    )
}
