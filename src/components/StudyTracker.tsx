import { useState } from "react";
import { BookOpen, Target, TrendingUp, Plus, Upload, Brain, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const StudyTracker = () => {
  const [newQuiz, setNewQuiz] = useState({
    subject: "",
    score: "",
    totalPoints: ""
  });

  // Mock data
  const studyStats = {
    weeklyHours: 18,
    weeklyGoal: 20,
    averageScore: 87,
    completedCourses: 3,
    totalCourses: 6
  };

  const recentQuizzes = [
    { subject: "Calculus", score: 95, total: 100, date: "Today" },
    { subject: "Physics", score: 82, total: 100, date: "Yesterday" },
    { subject: "Chemistry", score: 91, total: 100, date: "2 days ago" },
    { subject: "Biology", score: 78, total: 100, date: "3 days ago" }
  ];

  const recommendations = [
    {
      type: "Resource",
      title: "Khan Academy - Calculus Practice",
      reason: "Based on your 95% in Calculus",
      priority: "high"
    },
    {
      type: "Study Tip",
      title: "Physics Problem Sets",
      reason: "Your Physics score could improve",
      priority: "medium"
    },
    {
      type: "Video",
      title: "Chemistry Reaction Mechanisms",
      reason: "Trending in your study area",
      priority: "low"
    }
  ];

  const studyGoals = [
    { name: "Complete Calculus Course", progress: 75, target: 100 },
    { name: "Physics Quiz Average > 85%", progress: 82, target: 85 },
    { name: "Weekly Study Hours", progress: 18, target: 20 }
  ];

  const handleAddQuiz = () => {
    console.log("Adding quiz result:", newQuiz);
    setNewQuiz({ subject: "", score: "", totalPoints: "" });
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "text-success";
    if (percentage >= 80) return "text-secondary";
    if (percentage >= 70) return "text-warning";
    return "text-destructive";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-destructive bg-destructive/10";
      case "medium": return "border-warning bg-warning/10";
      case "low": return "border-success bg-success/10";
      default: return "border-muted bg-muted/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text mb-2">Mastery Tracker</h1>
        <p className="text-muted-foreground">Track your academic progress and get AI-powered study recommendations</p>
      </div>

      {/* Study Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weekly Study Hours */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <BookOpen className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{studyStats.weeklyHours}h</div>
            <Progress value={(studyStats.weeklyHours / studyStats.weeklyGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: {studyStats.weeklyGoal}h/week
            </p>
          </CardContent>
        </Card>

        {/* Average Score */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Star className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{studyStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground mt-3">
              +3% from last week
            </p>
          </CardContent>
        </Card>

        {/* Course Progress */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {studyStats.completedCourses}/{studyStats.totalCourses}
            </div>
            <Progress value={(studyStats.completedCourses / studyStats.totalCourses) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Courses completed
            </p>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <Brain className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{recommendations.length}</div>
            <p className="text-xs text-muted-foreground mt-3">
              New recommendations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Quiz Result */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-secondary" />
            <span>Log Quiz Result</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., Calculus"
                value={newQuiz.subject}
                onChange={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                placeholder="85"
                value={newQuiz.score}
                onChange={(e) => setNewQuiz({ ...newQuiz, score: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">Total Points</Label>
              <Input
                id="total"
                type="number"
                placeholder="100"
                value={newQuiz.totalPoints}
                onChange={(e) => setNewQuiz({ ...newQuiz, totalPoints: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleAddQuiz} 
              variant="mastery"
              className="flex-1"
            >
              Log Quiz Result
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Notes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quizzes */}
        <Card className="card-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span>Recent Quiz Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentQuizzes.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{quiz.subject}</p>
                  <p className="text-xs text-muted-foreground">{quiz.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getScoreColor(quiz.score, quiz.total)}`}>
                    {quiz.score}/{quiz.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((quiz.score / quiz.total) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="card-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-success" />
              <span>AI Study Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {rec.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec.priority === 'high' ? 'bg-destructive text-destructive-foreground' :
                    rec.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                    'bg-success text-success-foreground'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="font-medium text-sm mb-1">{rec.title}</p>
                <p className="text-xs text-muted-foreground">{rec.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Study Goals */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Study Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{goal.name}</span>
                <span className="text-muted-foreground">{goal.progress}/{goal.target}</span>
              </div>
              <Progress value={(goal.progress / goal.target) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTracker;