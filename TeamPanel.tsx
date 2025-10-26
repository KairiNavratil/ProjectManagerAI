import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const teamMembers = [
  {
    name: "Alice Chen",
    role: "Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    tasksCompleted: 8,
    totalTasks: 10,
    status: "active",
  },
  {
    name: "Bob Smith",
    role: "Backend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    tasksCompleted: 12,
    totalTasks: 15,
    status: "active",
  },
  {
    name: "Charlie Davis",
    role: "Backend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
    tasksCompleted: 5,
    totalTasks: 12,
    status: "active",
  },
  {
    name: "Diana Lee",
    role: "Frontend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=diana",
    tasksCompleted: 7,
    totalTasks: 14,
    status: "active",
  },
  {
    name: "Eve Wilson",
    role: "QA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve",
    tasksCompleted: 3,
    totalTasks: 8,
    status: "active",
  },
];

const roleColors: Record<string, string> = {
  Designer: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Backend: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Frontend: "bg-green-500/10 text-green-500 border-green-500/20",
  QA: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  PM: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

export const TeamPanel = () => {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Team Members</span>
          <Badge variant="secondary">{teamMembers.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member) => {
          const progress = (member.tasksCompleted / member.totalTasks) * 100;
          return (
            <div key={member.name} className="space-y-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <Badge variant="outline" className={`text-xs ${roleColors[member.role]}`}>
                    {member.role}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{member.tasksCompleted}/{member.totalTasks} tasks</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
