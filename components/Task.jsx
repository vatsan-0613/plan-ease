import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";

const Task = ({taskTitle, due, description, taskId, updateTasks, deleteTasks}) => {
  const [title, setTitle] = useState(taskTitle);
  const [desc, setDesc] = useState(description);
  const [dueDate, setDueDate] = useState(due);
  const [submitting, setSubmitting] = useState(false);
//   const router = useRouter();
  const handleEdit = async()=>{
    setSubmitting(true);
    if (!taskId) return alert("Missing taskID!");

    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          description: desc,
          due: dueDate,
        }),
      });

      if (response.ok) {
        // router.push("/");
        updateTasks({
            title: title,
            description: desc,
            due: dueDate,
            _id : taskId
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  const handleDelete = async() => {
    // const hasConfirmed = confirm("Are you sure you want to delete this prompt?"); 
        try{
            await fetch(`/api/task/${taskId}`, {
                method : 'DELETE'
            })
            deleteTasks(taskId);
        }catch(error){
            console.log(error);
        }
    
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
        <div className='flex justify-between'>
        <p>{taskTitle}</p>
        <p className='text-sm'>{format(due, "dd/MM/yyyy")}</p>
        </div>
       </CardTitle>
        <CardDescription className="max-w-[70%] break-words text-justify">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleDelete}>Delete</Button>
        <Dialog>
        <DialogTrigger asChild>
            <Button>edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Enter your task title and description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center   gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                id="username"
                defaultValue=""
                className="col-span-3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center  gap-4">
              <Label htmlFor="username" className="text-right">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={handleEdit}>
                {submitting ? "Editting..." : "Confirm Edit"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </CardFooter>
    </Card>
  )
}

export default Task