import  connectToDB  from '@/utils/database'
import Task from '@/models/Task'


export const POST = async(req) => {
    const { userId, title, description, due} = await req.json();
    try{
        await connectToDB();
        const newTask = new Task({
            creator : userId, 
            title : title,
            description : description, 
            due : due
        })

        await newTask.save();
        return new Response(JSON.stringify(newTask), {status : 201})
    }catch(error) { 
        return new Response("Failed to create a new prompt", {status : 500})
    }
}