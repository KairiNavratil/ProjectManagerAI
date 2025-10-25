import { useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIAssistantProps {
  onClose: () => void;
}

const initialMessages = [
  {
    role: "assistant",
    content: "Hi! I'm your AI project assistant. I can help you with task breakdowns, sprint planning, meeting summaries, and more. How can I assist you today?",
  },
];

export const AIAssistant = ({ onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I understand you're asking about that. Based on your project data, I can suggest...",
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
      <Card className="w-96 h-[600px] flex flex-col shadow-2xl border-2 border-accent/20">
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
            <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
