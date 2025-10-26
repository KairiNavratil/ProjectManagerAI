import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Circle, Clock, Filter } from "lucide-react";

const columns = [
  {
    id: "todo",
    title: "To Do",
    icon: Circle,
    tasks: [
      {
        id: "1",
        title: "Design user authentication flow",
        role: "Designer",
        priority: "high",
        assignee: { name: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
      },
      {
        id: "2",
        title: "Set up project repository",
        role: "Backend",
        priority: "high",
        assignee: { name: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: Clock,
    tasks: [
      {
        id: "3",
        title: "Implement WebSocket connection",
        role: "Backend",
        priority: "high",
        assignee: { name: "Charlie", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie" },
      },
      {
        id: "4",
        title: "Build chat UI components",
        role: "Frontend",
        priority: "medium",
        assignee: { name: "Diana", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=diana" },
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    icon: CheckCircle2,
    tasks: [
      {
        id: "5",
        title: "Initialize React project",
        role: "Frontend",
        priority: "high",
        assignee: { name: "Eve", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve" },
      },
    ],
  },
];

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-accent text-accent-foreground",
  low: "bg-secondary text-secondary-foreground",
};

export const KanbanBoard = () => {
  const [selectedMember, setSelectedMember] = useState<string>("all");
  
  const allMembers = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
  
  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: selectedMember === "all" 
      ? column.tasks 
      : column.tasks.filter(task => task.assignee.name === selectedMember)
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedMember} onValueChange={setSelectedMember}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            {allMembers.map(member => (
              <SelectItem key={member} value={member}>{member}</SelectItem>
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
                      <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{task.assignee.name}</span>
                    </div>
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
