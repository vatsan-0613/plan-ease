import  connectToDB from '@/utils/database';
import Task from '@/models/Task';

export const GET = async (request, {params}) => {
    try{
        await connectToDB();
        const task = await Task.findById(params.id).populate('creator');
        if(!task) return new Response("Task Not Found", {status : 404})
        return new Response(JSON.stringify(task), {status : 200})
    }catch(error){
        return new Response("Failed to fetch tasks", {status : 500})
    }
}

export const PATCH = async(request, {params}) => {
    const {title, description, due} = await request.json();
    try{
        await connectToDB();
        const existingTask = await Task.findById(params.id);
        if(!existingTask) return new Response("Task Not found", {status : 404})

        existingTask.title = title;
        existingTask.description =  description;
        existingTask.due = due;

        await existingTask.save();
        return new Response(JSON.stringify(existingTask), {status : 200})
    }catch(error){
        return new Response("Failed to update task", {status : 404})
    }
}

export const DELETE = async(request, {params}) => {
    try{
        console.log("id : "+params.id)
        await connectToDB();
        await Task.findOneAndDelete({ _id: params.id });
        return new Response("Task Deleted Successfully", {status : 200})
    } catch(error){
        return new Response("Failed to delete Task", {status : 500})
    }
}