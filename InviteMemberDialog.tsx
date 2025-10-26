import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMemberDialog = ({ open, onOpenChange }: InviteMemberDialogProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();

  const handleInvite = () => {
    if (!email || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${email} as ${role}`,
    });
    
    setEmail("");
    setRole("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleInvite} className="w-full">
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
