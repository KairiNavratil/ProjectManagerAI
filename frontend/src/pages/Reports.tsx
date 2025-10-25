import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReportDetailDialog } from "@/components/ReportDetailDialog";
import { Sparkles, FileText, Users, Calendar } from "lucide-react";

const reports = [
  {
    id: "1",
    type: "Sprint Report",
    title: "Sprint 5 - Q4 2025",
    date: "2025-10-20",
    project: "AI Chat Platform",
    summary: "Completed 12 out of 15 tasks. Team velocity increased by 15%. Backend integration ahead of schedule.",
    aiGenerated: true,
  },
  {
    id: "2",
    type: "Meeting Notes",
    title: "Product Planning - October 18",
    date: "2025-10-18",
    project: "E-commerce Redesign",
    summary: "Discussed checkout flow improvements, decided on A/B testing strategy, and allocated resources for Q1.",
    aiGenerated: true,
  },
  {
    id: "3",
    type: "Sprint Report",
    title: "Sprint 4 - Q4 2025",
    date: "2025-10-13",
    project: "Mobile App Launch",
    summary: "Successfully completed push notification implementation. iOS app submitted for review. Android testing ongoing.",
    aiGenerated: true,
  },
  {
    id: "4",
    type: "Meeting Notes",
    title: "Team Retrospective - October 10",
    date: "2025-10-10",
    project: "AI Chat Platform",
    summary: "Team discussed workflow improvements, identified communication bottlenecks, and agreed on daily standup format.",
    aiGenerated: true,
  },
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Reports & Notes</h1>
          <p className="text-muted-foreground">AI-generated summaries of sprints and meetings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card
              key={report.id}
              className="animate-fade-in hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedReport(report)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {report.type === "Sprint Report" ? (
                      <FileText className="h-5 w-5 text-accent" />
                    ) : (
                      <Users className="h-5 w-5 text-accent" />
                    )}
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  {report.aiGenerated && (
                    <Badge className="bg-gradient-primary">
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI Generated
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{report.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{report.summary}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(report.date).toLocaleDateString()}
                  </div>
                  <Badge variant="secondary">{report.project}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <ReportDetailDialog 
        open={!!selectedReport}
        onOpenChange={(open) => !open && setSelectedReport(null)}
        report={selectedReport}
      />
    </div>
  );
};

export default Reports;
