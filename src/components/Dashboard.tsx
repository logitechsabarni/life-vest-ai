import { Brain, DollarSign, BookOpen, TrendingUp, Award, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data for scores
  const scores = {
    mind: 78,
    money: 65,
    mastery: 82
  };

  const streaks = {
    exercise: 7,
    savings: 12,
    study: 5
  };

  const recentActivities = [
    { type: "health", message: "Logged 8 hours of sleep", time: "2 hours ago" },
    { type: "finance", message: "Saved $15 on coffee", time: "4 hours ago" },
    { type: "study", message: "Completed Math quiz - 95%", time: "6 hours ago" },
    { type: "health", message: "Walked 8,500 steps", time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's how you're doing across Mind, Money, and Mastery</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mind Score */}
        <Card className="card-elevated border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mind Score</CardTitle>
            <Brain className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{scores.mind}/100</div>
            <Progress value={scores.mind} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              +5 from last week
            </p>
          </CardContent>
        </Card>

        {/* Money Score */}
        <Card className="card-elevated border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-secondary opacity-5"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Score</CardTitle>
            <DollarSign className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{scores.money}/100</div>
            <Progress value={scores.money} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              -3 from last week
            </p>
          </CardContent>
        </Card>

        {/* Mastery Score */}
        <Card className="card-elevated border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-success opacity-5"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mastery Score</CardTitle>
            <BookOpen className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{scores.mastery}/100</div>
            <Progress value={scores.mastery} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              +8 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Streaks & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Streaks */}
        <Card className="card-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-warning" />
              <span>Current Streaks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Exercise</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-warning" />
                <span className="font-bold">{streaks.exercise} days</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Savings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-warning" />
                <span className="font-bold">{streaks.savings} days</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Study</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-warning" />
                <span className="font-bold">{streaks.study} days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'health' ? 'bg-primary' :
                  activity.type === 'finance' ? 'bg-warning' : 'bg-success'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-xs">Log Mood</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <DollarSign className="w-5 h-5 text-warning" />
              <span className="text-xs">Add Expense</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <BookOpen className="w-5 h-5 text-success" />
              <span className="text-xs">Start Study</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span className="text-xs">View Goals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;