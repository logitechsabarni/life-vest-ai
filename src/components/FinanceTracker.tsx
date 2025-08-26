import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, Plus, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const FinanceTracker = () => {
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: ""
  });

  // Mock data
  const monthlyStats = {
    totalSpent: 850,
    budget: 1200,
    saved: 350,
    savingsGoal: 500
  };

  const expenses = [
    { date: "Today", category: "Food", amount: 12.50, description: "Lunch" },
    { date: "Today", category: "Transport", amount: 8.00, description: "Bus fare" },
    { date: "Yesterday", category: "Entertainment", amount: 25.00, description: "Movie tickets" },
    { date: "Yesterday", category: "Food", amount: 15.75, description: "Groceries" },
    { date: "2 days ago", category: "Books", amount: 45.00, description: "Textbook" }
  ];

  const savingsTips = [
    "Cook at home 3x this week to save $30",
    "Use student discounts for entertainment",
    "Consider cycling instead of transport",
    "Buy textbooks second-hand or digital"
  ];

  const categories = [
    "Food", "Transport", "Entertainment", "Books", "Clothes", "Other"
  ];

  const categoryColors: Record<string, string> = {
    Food: "bg-orange-500",
    Transport: "bg-blue-500",
    Entertainment: "bg-purple-500",
    Books: "bg-green-500",
    Clothes: "bg-pink-500",
    Other: "bg-gray-500"
  };

  const handleAddExpense = () => {
    console.log("Adding expense:", newExpense);
    setNewExpense({ amount: "", category: "", description: "" });
  };

  const budgetUsed = (monthlyStats.totalSpent / monthlyStats.budget) * 100;
  const savingsProgress = (monthlyStats.saved / monthlyStats.savingsGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text mb-2">Money Tracker</h1>
        <p className="text-muted-foreground">Manage your finances like a pro</p>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Spending */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${monthlyStats.totalSpent}</div>
            <Progress value={budgetUsed} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Budget: ${monthlyStats.budget}
            </p>
            {budgetUsed > 80 && (
              <p className="text-xs text-destructive mt-1 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Approaching budget limit
              </p>
            )}
          </CardContent>
        </Card>

        {/* Savings */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${monthlyStats.saved}</div>
            <Progress value={savingsProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: ${monthlyStats.savingsGoal}
            </p>
          </CardContent>
        </Card>

        {/* Budget Remaining */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${monthlyStats.budget - monthlyStats.totalSpent}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {Math.round((1 - budgetUsed/100) * 100)}% left this month
            </p>
          </CardContent>
        </Card>

        {/* Daily Average */}
        <Card className="card-elevated border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <TrendingDown className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              ${(monthlyStats.totalSpent / 15).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Based on last 15 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Expense */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-warning" />
            <span>Add New Expense</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What did you buy?"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
            </div>
          </div>

          <Button 
            onClick={handleAddExpense} 
            className="w-full" 
            variant="money"
          >
            Add Expense
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <Card className="card-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              <span>Recent Expenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${categoryColors[expense.category]}`} />
                  <div>
                    <p className="font-medium text-sm">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.date} • {expense.category}</p>
                  </div>
                </div>
                <span className="font-bold text-warning">${expense.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Savings Tips */}
        <Card className="card-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PiggyBank className="h-5 w-5 text-success" />
              <span>AI Savings Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savingsTips.map((tip, index) => (
              <div key={index} className="p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm text-success-foreground">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceTracker;