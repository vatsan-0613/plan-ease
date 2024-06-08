import Task from "./Task"
import React, {useEffect, useState} from "react"
import { useSession } from "next-auth/react";


const Tasks = ({tasks, updateTasks, deleteTasks}) => {

  return (
    <div className="justify-items-center grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-8 gap-7">
        {
            tasks.map(task => {
                return(
                <Task taskTitle={task.title} description={task.description} due={task.due} taskId={task._id} updateTasks = {updateTasks} deleteTasks={deleteTasks}/>
                )
            })
        }
    </div>
  )
}

export default Tasks