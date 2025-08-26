import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import HealthTracker from "@/components/HealthTracker";
import FinanceTracker from "@/components/FinanceTracker";
import StudyTracker from "@/components/StudyTracker";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "health":
        return <HealthTracker />;
      case "finance":
        return <FinanceTracker />;
      case "study":
        return <StudyTracker />;
      case "chat":
        return <ChatAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
