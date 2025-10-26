import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";

const milestones = [
  {
    id: "1",
    title: "Project Setup & Planning",
    description: "Initialize project, set up infrastructure, and define architecture",
    status: "completed",
    dueDate: "2025-10-15",
    tasks: 8,
    completedTasks: 8,
  },
  {
    id: "2",
    title: "Core Backend Development",
    description: "Implement authentication, WebSocket connections, and database schema",
    status: "in-progress",
    dueDate: "2025-10-30",
    tasks: 12,
    completedTasks: 7,
  },
  {
    id: "3",
    title: "Frontend UI Development",
    description: "Build chat interface, user profiles, and real-time message updates",
    status: "in-progress",
    dueDate: "2025-11-10",
    tasks: 15,
    completedTasks: 5,
  },
  {
    id: "4",
    title: "AI Integration",
    description: "Add AI-powered message suggestions and content moderation",
    status: "upcoming",
    dueDate: "2025-11-20",
    tasks: 10,
    completedTasks: 0,
  },
  {
    id: "5",
    title: "Testing & Launch",
    description: "QA testing, performance optimization, and production deployment",
    status: "upcoming",
    dueDate: "2025-11-30",
    tasks: 8,
    completedTasks: 0,
  },
];

export const RoadmapView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-accent rounded-lg p-4 flex items-start space-x-3">
        <Sparkles className="h-5 w-5 text-accent mt-0.5" />
        <div>
          <h3 className="font-semibold text-accent mb-1">AI-Generated Roadmap</h3>
          <p className="text-sm text-muted-foreground">
            This roadmap was automatically created based on your project description. Tasks are assigned to team roles with estimated deadlines.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const progress = (milestone.completedTasks / milestone.tasks) * 100;
          const isCompleted = milestone.status === "completed";
          const isInProgress = milestone.status === "in-progress";

          return (
            <Card
              key={milestone.id}
              className={`transition-all duration-200 ${
                isCompleted ? "border-green-500/50 bg-green-500/5" : ""
              } ${isInProgress ? "border-accent/50 shadow-md" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className={`h-6 w-6 ${isInProgress ? "text-accent" : "text-muted-foreground"}`} />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{milestone.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <Badge
                    variant={isCompleted ? "default" : isInProgress ? "secondary" : "outline"}
                    className={isCompleted ? "bg-green-500" : isInProgress ? "bg-accent" : ""}
                  >
                    {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Upcoming"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {milestone.completedTasks} / {milestone.tasks} tasks completed
                  </span>
                  <span className="text-muted-foreground">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "bg-green-500" : "bg-accent"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
