import { useState } from "react";
import { Sparkles, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProjectDialog = ({ open, onOpenChange }: CreateProjectDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; role: string }>>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const addTeamMember = () => {
    if (!newMemberName || !newMemberRole) {
      toast({
        title: "Missing Information",
        description: "Please enter both name and role",
        variant: "destructive",
      });
      return;
    }

    setTeamMembers([...teamMembers, { name: newMemberName, role: newMemberRole }]);
    setNewMemberName("");
    setNewMemberRole("");
  };

  const removeMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    if (!name || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Project created! 🎉",
      description: "AI has generated your roadmap and assigned tasks to team members",
    });
    
    setIsGenerating(false);
    onOpenChange(false);
    
    // Navigate to the new project (mock ID)
    navigate("/project/new");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Sparkles className="mr-2 h-6 w-6 text-accent" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Describe your project and let AI generate a complete roadmap with tasks, roles, and deadlines
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="e.g., AI Chat Platform"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you want to build, key features, target users, and any specific requirements..."
              className="min-h-[120px] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-3">
            <Label>Team Members</Label>
            
            {teamMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg">
                {teamMembers.map((member, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1.5">
                    {member.name} - {member.role}
                    <button
                      onClick={() => removeMember(index)}
                      className="ml-2 hover:text-destructive"
                      disabled={isGenerating}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Member name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                disabled={isGenerating}
              />
              <Select value={newMemberRole} onValueChange={setNewMemberRole} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="QA">QA</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={addTeamMember}
              disabled={isGenerating}
              className="w-full"
            >
              Add Team Member
            </Button>
          </div>

          {isGenerating && (
            <div className="bg-gradient-accent rounded-lg p-4 space-y-3">
              <div className="flex items-center text-accent">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="font-medium">AI is working on your project...</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Analyzing project requirements</p>
                <p>✓ Generating roadmap and milestones</p>
                <p className="animate-pulse">→ Breaking down tasks and assigning roles...</p>
              </div>
            </div>
          )}

          <Button
            onClick={handleCreate}
            disabled={isGenerating}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Create with AI
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
