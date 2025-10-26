import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Zap } from 'lucide-react';

interface LiveKitConfigProps {
  onConfigUpdate: (config: { serverUrl: string; token: string; userName: string }) => void;
}

export const LiveKitConfig = ({ onConfigUpdate }: LiveKitConfigProps) => {
  const [serverUrl, setServerUrl] = useState('wss://your-livekit-server.com');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');

  const handleSave = () => {
    onConfigUpdate({ serverUrl, token, userName });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <CardTitle>LiveKit Setup</CardTitle>
        </div>
        <CardDescription>
          Configure your LiveKit connection for live collaboration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="serverUrl">Server URL</Label>
          <Input
            id="serverUrl"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="wss://your-livekit-server.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token">Access Token</Label>
          <Input
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Your LiveKit token"
            type="password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userName">Your Name</Label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <Button onClick={handleSave} className="w-full bg-gradient-primary">
          <Zap className="mr-2 h-4 w-4" />
          Connect to LiveKit
        </Button>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Features</span>
          </div>
          <div className="space-y-1">
            <Badge variant="secondary" className="text-xs">Live Cursors</Badge>
            <Badge variant="secondary" className="text-xs">Real-time Collaboration</Badge>
            <Badge variant="secondary" className="text-xs">Multi-user Support</Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>💡 <strong>Demo Mode:</strong> Currently running with simulated cursors</p>
          <p>🔗 <strong>Get Started:</strong> Visit <a href="https://cloud.livekit.io" className="text-accent hover:underline">cloud.livekit.io</a></p>
          <p>🎟️ <strong>Hackathon Code:</strong> Use "LIVEKIT-CALHACKS" for free trial</p>
        </div>
      </CardContent>
    </Card>
  );
};