import React, { Component } from "react"
import Task from "./Task"
import {Droppable} from "react-beautiful-dnd"
class Column extends Component   // Utilisé pour le drag and drop du Planning
{
    render()
    {
        return <div className="container">
            <div className=" card-header col-3 d-flex flex-column">  {/*Correspond à l'entête des colones (Todo/In progress/Done) */}
                {this.props.column.title}
            </div>
            <Droppable droppableId={this.props.column.id}>
            {(provided) => (
                <div className="card-body" ref = {provided.innerRef} {...provided.droppableProps}>
                
                {this.props.tasks.map((task,index) => <Task key={task.id} task={task} index={index}/>)} {/*Affiche les différentes tâches */}
                {provided.placeholder}
                </div>
            )}
            </Droppable>
        </div>
    }
}


export default Column
