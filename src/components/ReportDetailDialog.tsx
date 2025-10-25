import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, FileText, Users, Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Report {
  id: string;
  type: string;
  title: string;
  date: string;
  project: string;
  summary: string;
  aiGenerated: boolean;
}

interface ReportDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report | null;
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Alice Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    content: "Great progress on the backend integration! The velocity increase is impressive.",
    timestamp: "2025-10-21 10:30 AM",
  },
  {
    id: "2",
    author: "Bob Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    content: "We should discuss the remaining tasks in tomorrow's standup.",
    timestamp: "2025-10-21 02:15 PM",
  },
];

export const ReportDetailDialog = ({ open, onOpenChange, report }: ReportDetailDialogProps) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const { toast } = useToast();

  if (!report) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {report.type === "Sprint Report" ? (
                <FileText className="h-5 w-5 text-accent" />
              ) : (
                <Users className="h-5 w-5 text-accent" />
              )}
              <Badge variant="outline">{report.type}</Badge>
              {report.aiGenerated && (
                <Badge className="bg-gradient-primary">
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI Generated
                </Badge>
              )}
            </div>
            <DialogTitle className="text-2xl">{report.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(report.date).toLocaleDateString()}
              </div>
              <Badge variant="secondary">{report.project}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Summary</h3>
            <p className="text-muted-foreground leading-relaxed">{report.summary}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Comments ({comments.length})</h3>
            
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddComment}>
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
