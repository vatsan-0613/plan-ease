import  connectToDB  from "@/utils/database";
import Task from "@/models/Task";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();
    const prompts = await Task.find({ creator : params.id}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tasks", { status: 500 });
  }
};