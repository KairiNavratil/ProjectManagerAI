import { Calendar, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  teamSize: number;
  dueDate: string;
  status: "in-progress" | "completed" | "planning";
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    "in-progress": "bg-accent text-accent-foreground",
    "completed": "bg-green-500 text-white",
    "planning": "bg-secondary text-secondary-foreground",
  };

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-xl group-hover:text-accent transition-colors">
              {project.name}
            </CardTitle>
            <Badge className={statusColors[project.status]}>
              {project.status === "in-progress" ? "In Progress" : 
               project.status === "completed" ? "Completed" : "Planning"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              <span>{project.teamSize} members</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center text-sm text-accent">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span className="font-medium">AI-powered roadmap active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
