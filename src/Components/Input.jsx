import React, { useState } from "react";
import { v4 as uuid } from "uuid";


export const Input = () => {
    const [states, setStates] = useState({
        inputValue : "",
        backlog : [],
        todo : [],
        ongoing : [],
        done : []
    })

    const handleChange = (e) => {
        setStates({
            ...states,
            inputValue : e.target.value
        })
    }

    const handleCreateTask = () => {
        let payload = {
            text : states.inputValue,
            id : uuid(),
            box : 1
        }
        setStates({
            ...states,
            backlog : [...states.backlog, payload]
        })
    }

    const handleNext = (id, box) => {
        // console.log(id, box)
        if(box==1){
            var task = {}
            let payload = states.backlog.filter(item=>{
                if(item.id!=id){
                    return item;
                }
                else{
                    task = item;
                }
            });
            task.box++;
            setStates({
                ...states,
                backlog : [...payload],
                todo : [...states.todo, task]
            })
        }
        else if(box==2){
            var task = {}
            let payload = states.todo.filter(item=>{
                if(item.id!=id){
                    return item;
                }
                else{
                    task = item;
                }
            });
            task.box++;
            setStates({
                ...states,
                todo : [...payload],
                ongoing : [...states.ongoing, task]
            })
        }
        else if(box==3){
            var task = {}
            let payload = states.ongoing.filter(item=>{
                if(item.id!=id){
                    return item;
                }
                else{
                    task = item;
                }
            });
            task.box++;
            setStates({
                ...states,
                ongoing : [...payload],
                done : [...states.done, task]
            })
        }
    }

    const handlePrevious = (id, box) => {
        if(box==2){
            var task = {}
            let payload = states.todo.filter(item=>{
                if(item.id!=id){
                    return item;
                }
                else{
                    task = item;
                }
            });
            task.box--;
            setStates({
                ...states,
                todo : [...payload],
                backlog : [...states.backlog, task]
            })
        }
        else if(box==3){
            var task = {}
            let payload = states.ongoing.filter(item=>{
                if(item.id!=id){
                    return item;
                }
                else{
                    task = item;
                }
            });
            task.box--;
            setStates({
                ...states,
                ongoing : [...payload],
                todo : [...states.todo, task]
            })
        }
        else if(box==4){
            var task = {}
            let payload = states.done.filter(item=>{
                if(item.id!=id){
                    return item;
                }
                else{
                    task = item;
                }
            });
            task.box--;
            setStates({
                ...states,
                done : [...payload],
                ongoing : [...states.ongoing, task]
            })
        }
    }

    const handleDelete = (id, box) => {
        if(box==1){
            let payload = states.backlog.filter(item=>{
                if(item.id!=id){
                    return item;
                }
            })
            setStates({
                ...states,
                backlog : [...payload]
            })
        }
        if(box==2){
            let payload = states.todo.filter(item=>{
                if(item.id!=id){
                    return item;
                }
            })
            setStates({
                ...states,
                todo : [...payload]
            })
        }
        if(box==3){
            let payload = states.ongoing.filter(item=>{
                if(item.id!=id){
                    return item;
                }
            })
            setStates({
                ...states,
                ongoing : [...payload]
            })
        }
        if(box==4){
            let payload = states.done.filter(item=>{
                if(item.id!=id){
                    return item;
                }
            })
            setStates({
                ...states,
                done : [...payload]
            })
        }
    }

    return (
        <>
        <input type="text" placeholder="New Task Name" onChange={handleChange}/>
        <button onClick={handleCreateTask}>Create Task</button>
        <div id="displayFlexBox" style={{display : "flex", flexDirection : "row", justifyContent:"space-evenly"}}>
            <div>
                <h2>Backlog</h2>
                <div>
                    {states.backlog.map(item=>(
                        <div key={item.id}>{item.text} <button onClick={()=>handlePrevious(item.id, item.box)} disabled={states.backlog.box==1?true:false}>{"<"}</button><button onClick={()=>handleNext(item.id, item.box)}>{">"}</button><button onClick={()=>handleDelete(item.id, item.box)}>del</button></div>
                    ))}
                </div>
            </div>
            <div>
                <h2>To Do</h2>
                <div>
                    {states.todo.map(item=>(
                        <div key={item.id}>{item.text} <button onClick={()=>handlePrevious(item.id, item.box)}>{"<"}</button><button onClick={()=>handleNext(item.id, item.box)}>{">"}</button><button onClick={()=>handleDelete(item.id, item.box)}>del</button></div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Ongoing</h2>
                <div>
                    {states.ongoing.map(item=>(
                        <div key={item.id}>{item.text} <button onClick={()=>handlePrevious(item.id, item.box)}>{"<"}</button><button onClick={()=>handleNext(item.id, item.box)}>{">"}</button><button onClick={()=>handleDelete(item.id, item.box)}>del</button></div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Done</h2>
                <div>
                    {states.done.map(item=>(
                        <div key={item.id}>{item.text} <button onClick={()=>handlePrevious(item.id, item.box)}>{"<"}</button><button onClick={()=>handleNext(item.id, item.box)}>{">"}</button><button onClick={()=>handleDelete(item.id, item.box)}>del</button></div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}