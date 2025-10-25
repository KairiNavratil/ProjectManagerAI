import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <Button className="bg-gradient-primary">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle>AI Assistant Preferences</CardTitle>
              <CardDescription>Configure how AI assists your workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-generate task breakdowns</Label>
                  <p className="text-sm text-muted-foreground">AI will automatically break down projects into tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Generate meeting summaries</Label>
                  <p className="text-sm text-muted-foreground">AI will create summaries after meetings</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sprint report automation</Label>
                  <p className="text-sm text-muted-foreground">Automatically generate sprint reports</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task assignments</Label>
                  <p className="text-sm text-muted-foreground">Get notified when tasks are assigned to you</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Project updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about project progress</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Team mentions</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone mentions you</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
