import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const AddTask = ({changeTasks}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  // const router = useRouter();
  console.log(title, desc);

  const handleSubmit = async (e) => {
    setSubmitting(true);
    if(title == "" || date==""){
      toast({
        title: "!oops, Enter Title and set a proper due date.",
        description: "Fill In Required Fields"
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      })
      return;
    }
    try {
      const response = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: desc,
          due: date,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        // router.redirect('/');
        const newTask = await response.json();
        console.log(newTask);
        changeTasks({
          title: title,
          description: desc,
          due: date,
          _id:newTask._id
        });
        console.log("success creating task");
        toast({
          title: "Task Added",
          description: format(new Date(), "yyyy-MM-dd HH:mm:ss")
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setTitle("");
      setDesc("");
      setDate("");
    }
  };

  return (
    <div className="mt-5 flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-lg font-semibold text-[#fff] flex justify-between items-center gap-3 border-2 p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md">
            <IoIosAddCircleOutline size={25} />
            Add Task
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
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
                required
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
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={handleSubmit}>
                {submitting ? "Creating..." : "Submit"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
