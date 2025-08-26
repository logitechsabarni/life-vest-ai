import { useState } from "react";
import { Heart, Activity, Moon, Smile, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

const HealthTracker = () => {
  const [newEntry, setNewEntry] = useState({
    steps: "",
    sleep: "",
    mood: [7]
  });

  // Mock data
  const todayStats = {
    steps: 6500,
    stepGoal: 10000,
    sleep: 7.5,
    sleepGoal: 8,
    mood: 7,
    burnoutRisk: "Low"
  };

  const weeklyData = [
    { day: "Mon", steps: 8500, sleep: 7.2, mood: 6 },
    { day: "Tue", steps: 9200, sleep: 8.1, mood: 8 },
    { day: "Wed", steps: 7800, sleep: 6.9, mood: 5 },
    { day: "Thu", steps: 10500, sleep: 8.5, mood: 9 },
    { day: "Fri", steps: 6200, sleep: 7.0, mood: 6 },
    { day: "Sat", steps: 12000, sleep: 9.2, mood: 9 },
    { day: "Sun", steps: 6500, sleep: 7.5, mood: 7 }
  ];

  const handleAddEntry = () => {
    console.log("Adding health entry:", newEntry);
    // Reset form
    setNewEntry({ steps: "", sleep: "", mood: [7] });
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 3) return "😞";
    if (mood <= 5) return "😐";
    if (mood <= 7) return "🙂";
    return "😄";
  };

  const getBurnoutColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text mb-2">Mind Health Tracker</h1>
        <p className="text-muted-foreground">Track your physical and mental wellbeing</p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Steps */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steps Today</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.steps.toLocaleString()}</div>
            <Progress value={(todayStats.steps / todayStats.stepGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: {todayStats.stepGoal.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Sleep */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Moon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.sleep}h</div>
            <Progress value={(todayStats.sleep / todayStats.sleepGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: {todayStats.sleepGoal}h
            </p>
          </CardContent>
        </Card>

        {/* Mood */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood</CardTitle>
            <Smile className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center space-x-2">
              <span>{todayStats.mood}/10</span>
              <span className="text-lg">{getMoodEmoji(todayStats.mood)}</span>
            </div>
            <Progress value={todayStats.mood * 10} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Feeling good today
            </p>
          </CardContent>
        </Card>

        {/* Burnout Risk */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Burnout Risk</CardTitle>
            <Heart className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getBurnoutColor(todayStats.burnoutRisk)}`}>
              {todayStats.burnoutRisk}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              AI prediction based on patterns
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Log Today's Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <Input
                id="steps"
                type="number"
                placeholder="e.g., 8500"
                value={newEntry.steps}
                onChange={(e) => setNewEntry({ ...newEntry, steps: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep (hours)</Label>
              <Input
                id="sleep"
                type="number"
                step="0.5"
                placeholder="e.g., 7.5"
                value={newEntry.sleep}
                onChange={(e) => setNewEntry({ ...newEntry, sleep: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Mood (1-10) {getMoodEmoji(newEntry.mood[0])}</Label>
            <Slider
              value={newEntry.mood}
              onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Bad</span>
              <span>Excellent</span>
            </div>
          </div>

          <Button 
            onClick={handleAddEntry} 
            className="w-full bg-gradient-primary text-white hover:opacity-90"
          >
            Log Entry
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span>Weekly Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-4">
                  <span className="font-medium w-8">{day.day}</span>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm">{day.steps.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-primary" />
                    <span className="text-sm">{day.sleep}h</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{day.mood}/10</span>
                  <span>{getMoodEmoji(day.mood)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthTracker;