"use client";
import React, {useState, useEffect} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "@/components/Login";
import Nav from "@/components/Nav";
import AddTask from "@/components/AddTask";
import Tasks from "@/components/Tasks";

const Home = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const addTask = (newTask) => {
    console.log('entered function')
    setTasks([...tasks, newTask])
  }

  const editTask = (updatedTask) => {
    console.log("entered edit", updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  }

  const deleteTasks = (taskId) => {
    console.log(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };
  
    useEffect(()=>{
      if(session){
        const fetchPosts = async() => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setTasks(data);
        }
    
        fetchPosts();
      }
      }, [session]);
  return session ? (
    <main className="bg-[#EEEEEE] h-screen overflow-y-scroll">
      <Nav
        mail={session?.user?.email}
        name={session?.user?.name}
        image={session?.user?.image}
      />
      <AddTask changeTasks = {addTask}/>
      <Tasks tasks = {tasks} updateTasks={editTask} deleteTasks={deleteTasks}/> 
    </main>
  ) : (
    <>
      <Login />
    </>
  );
};

export default Home;
