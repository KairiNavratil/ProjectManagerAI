import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  project: string;
}

interface TeamMemberTasksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: {
    name: string;
    role: string;
    tasksCompleted: number;
    totalTasks: number;
  } | null;
}

const mockTasks: Task[] = [
  { id: "1", title: "Design user authentication flow", status: "in-progress", priority: "high", project: "AI Chat Platform" },
  { id: "2", title: "Create dashboard mockups", status: "done", priority: "high", project: "E-commerce Redesign" },
  { id: "3", title: "Update design system", status: "todo", priority: "medium", project: "Mobile App Launch" },
  { id: "4", title: "Prototype new features", status: "in-progress", priority: "medium", project: "AI Chat Platform" },
  { id: "5", title: "Review team feedback", status: "done", priority: "low", project: "Internal Tools" },
];

const statusConfig = {
  todo: { icon: Circle, label: "To Do", color: "text-muted-foreground" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-accent" },
  done: { icon: CheckCircle2, label: "Done", color: "text-primary" },
};

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-accent text-accent-foreground",
  low: "bg-secondary text-secondary-foreground",
};

export const TeamMemberTasksDialog = ({ open, onOpenChange, member }: TeamMemberTasksDialogProps) => {
  if (!member) return null;

  const progress = (member.tasksCompleted / member.totalTasks) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{member.name}'s Tasks</DialogTitle>
          <p className="text-muted-foreground">{member.role}</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{member.tasksCompleted}/{member.totalTasks} tasks completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            {mockTasks.map((task) => {
              const StatusIcon = statusConfig[task.status].icon;
              return (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-medium flex-1">{task.title}</h4>
                        <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${statusConfig[task.status].color}`} />
                          <span className="text-muted-foreground">{statusConfig[task.status].label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{task.project}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
