import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { RoadmapView } from "@/components/RoadmapView";
import { TeamPanel } from "@/components/TeamPanel";
import { AIAssistant } from "@/components/AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">AI Chat Platform</h1>
            <p className="text-muted-foreground">Build a real-time chat application with AI-powered message suggestions</p>
          </div>
          <Button
            onClick={() => setShowAI(!showAI)}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            AI Assistant
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="board" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="board">Kanban Board</TabsTrigger>
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              </TabsList>
              
              <TabsContent value="board" className="mt-6">
                <KanbanBoard id={id}/>
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

      {showAI && (
        <AIAssistant onClose={() => setShowAI(false)} />
      )}
    </div>
  );
};

export default ProjectDetail;
