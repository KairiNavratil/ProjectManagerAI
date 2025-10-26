import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Circle, Clock, Filter } from "lucide-react";
import supabase from "../utils/supabase";

interface KanbanBoardProps {
  id: string;
}

const columns = [
  { id: "todo", title: "To Do", icon: Circle },
  { id: "in-progress", title: "In Progress", icon: Clock },
  { id: "done", title: "Done", icon: CheckCircle2 },
];

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-accent text-accent-foreground",
  low: "bg-secondary text-secondary-foreground",
};

export const KanbanBoard = ({ id }: KanbanBoardProps) => {
  const [selectedRoles, setSelectedRoles] = useState<string>("all");

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        "https://ybxymtsxfobgxnqskxok.supabase.co/functions/v1/getTasks?id=" + id,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data.data || []);
      console.log("tasks fetched:", tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel("public:Tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Tasks" },
        (payload) => {
          console.log("Realtime change:", payload);
          fetchTasks(); // refresh list when changes happen
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const allRoles = ["Designer", "Frontend", "Backend", "QA", "PM"];

  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: tasks
      .filter((t) => t.status === col.id) // <-- filter by status
      // .filter((t) =>
      //   selectedRoles === "all" ? true : t.role === setSelectedRoles
      // ), // optional filter
  }));

  console.log(filteredColumns[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedRoles} onValueChange={setSelectedRoles}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {allRoles.map((member) => (
              <SelectItem key={member} value={member}>
                {member}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredColumns.map((column) => {
          const Icon = column.icon;
          return (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary">{column.tasks.length}</Badge>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {task.role}
                        </Badge>
                        {/* <Badge
                          className={`text-xs ${
                            priorityColors[
                              task.priority as keyof typeof priorityColors
                            ]
                          }`}
                        >
                          {task.priority}
                        </Badge> */}
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback>
                            {task.assignee.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {task.assignee.name}
                        </span>
                      </div> */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
