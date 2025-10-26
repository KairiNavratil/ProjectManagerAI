import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { RoadmapView } from "@/components/RoadmapView";
import { TeamPanel } from "@/components/TeamPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input"; // assuming you’re using shadcn/ui

const ProjectDetail = () => {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // inside your component:

  const handleCreateTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://ybxymtsxfobgxnqskxok.supabase.co/functions/v1/addTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            project_id: id,
            title,
            description: "Insert task description here",
            role: "Frontend",
            status: "todo",
          }),
        }
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("✅ Task created:", data);
      // alert("Task successfully created!");
      setTitle(""); // clear input
    } catch (error: any) {
      console.error("❌ Error creating task:", error);
      alert("Failed to create task: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              AI Chat Platform
            </h1>
            <p className="text-muted-foreground">
              Build a real-time chat application with AI-powered message
              suggestions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-64"
            />
            <Button
              onClick={handleCreateTask}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              disabled={loading}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {loading ? "Creating..." : "Add Task"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="board" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="board">Kanban Board</TabsTrigger>
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              </TabsList>

              <TabsContent value="board" className="mt-6">
                <KanbanBoard id={id} />
              </TabsContent>

              <TabsContent value="roadmap" className="mt-6">
                <RoadmapView />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <TeamPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
