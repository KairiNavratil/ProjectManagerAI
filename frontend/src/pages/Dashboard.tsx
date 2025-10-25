import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Navbar } from "@/components/Navbar";

// const mockProjects = [
//   {
//     id: "1",
//     name: "AI Chat Platform",
//     description: "Build a real-time chat application with AI-powered message suggestions",
//     progress: 65,
//     teamSize: 5,
//     dueDate: "2025-11-15",
//     status: "in-progress" as const,
//   },
//   {
//     id: "2",
//     name: "E-commerce Redesign",
//     description: "Complete redesign of the product catalog and checkout flow",
//     progress: 30,
//     teamSize: 8,
//     dueDate: "2025-12-01",
//     status: "in-progress" as const,
//   },
//   {
//     id: "3",
//     name: "Mobile App Launch",
//     description: "Launch iOS and Android apps with push notifications",
//     progress: 90,
//     teamSize: 6,
//     dueDate: "2025-10-30",
//     status: "in-progress" as const,
//   },
// ];


const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://ybxymtsxfobgxnqskxok.supabase.co/functions/v1/getProjects",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        setProjects(data.data || []);
        console.log("Projects fetched:", projects);

      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); 

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage your team projects with AI assistance</p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div> */}

        {loading ? (
          <p className="text-muted-foreground">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-muted-foreground">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </main>

      <CreateProjectDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
};

export default Dashboard;
