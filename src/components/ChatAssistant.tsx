import { useState } from "react";
import { MessageCircle, Send, Bot, User, Lightbulb, DollarSign, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'health' | 'finance' | 'study' | 'general';
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your MindVest AI assistant. I can help you with health, finance, and study questions. What would you like to know?",
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const quickQuestions = [
    {
      icon: Heart,
      category: 'health' as const,
      question: "How can I improve my sleep quality?",
      color: "text-primary"
    },
    {
      icon: DollarSign,
      category: 'finance' as const,
      question: "What are some budgeting tips for students?",
      color: "text-warning"
    },
    {
      icon: Lightbulb,
      category: 'study' as const,
      question: "How can I study more effectively?",
      color: "text-success"
    }
  ];

  // Mock AI responses
  const getMockResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('sleep') || lowercaseMessage.includes('tired')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Great question about sleep! Here are some evidence-based tips to improve your sleep quality:\n\n1. **Consistent Schedule**: Go to bed and wake up at the same time daily\n2. **Screen Time**: Avoid screens 1 hour before bed\n3. **Environment**: Keep your room cool (65-68°F) and dark\n4. **Exercise**: Regular physical activity, but not close to bedtime\n5. **Caffeine**: Avoid caffeine after 2 PM\n\nBased on your recent sleep data, you're averaging 7.5 hours. Try to aim for 8 hours consistently. Would you like me to set up a sleep improvement challenge?",
        timestamp: new Date(),
        category: 'health'
      };
    }

    if (lowercaseMessage.includes('budget') || lowercaseMessage.includes('money') || lowercaseMessage.includes('save')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I can help you with budgeting! Based on your spending patterns, here's a personalized plan:\n\n**Current Situation:**\n- Monthly spending: $850\n- Budget: $1,200\n- You're doing well but spending 71% of your budget\n\n**Tips to save more:**\n1. **Food**: Cook 3 more meals at home = $30/month savings\n2. **Transport**: Walk/bike when possible = $20/month\n3. **Entertainment**: Use student discounts = $15/month\n4. **Books**: Buy used or digital = $25/month\n\n**Challenge**: Try to save an extra $50 this month. I'll track your progress!",
        timestamp: new Date(),
        category: 'finance'
      };
    }

    if (lowercaseMessage.includes('study') || lowercaseMessage.includes('learn') || lowercaseMessage.includes('exam')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Excellent! Let me help you study more effectively. Based on your recent quiz performance (87% average), here's a personalized study plan:\n\n**Study Techniques:**\n1. **Pomodoro**: 25 min focused work + 5 min break\n2. **Active Recall**: Test yourself instead of re-reading\n3. **Spaced Repetition**: Review material at increasing intervals\n4. **Teach Others**: Explain concepts to friends\n\n**For Your Current Subjects:**\n- **Physics** (82% avg): Focus on problem-solving practice\n- **Calculus** (95% avg): You're excelling! Help others to reinforce\n\n**Recommended Resources:**\n- Khan Academy for Physics practice\n- Professor Leonard for Calculus\n\nWould you like me to create a study schedule?",
        timestamp: new Date(),
        category: 'study'
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: "I understand you're asking about: \"" + userMessage + "\"\n\nI'm here to help with health, finance, and study questions. Could you please be more specific about what you'd like to know? For example:\n\n- **Health**: Sleep, exercise, mood, stress management\n- **Finance**: Budgeting, saving, expense tracking\n- **Study**: Learning techniques, time management, course planning\n\nFeel free to ask me anything in these areas!",
      timestamp: new Date(),
      category: 'general'
    };
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = getMockResponse(newMessage);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'health': return <Heart className="w-4 h-4 text-primary" />;
      case 'finance': return <DollarSign className="w-4 h-4 text-warning" />;
      case 'study': return <Lightbulb className="w-4 h-4 text-success" />;
      default: return <Bot className="w-4 h-4 text-secondary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">Your personal guide for health, finance, and study success</p>
      </div>

      {/* Quick Questions */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quick Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickQuestions.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickQuestion(item.question)}
                className="h-auto p-4 flex items-start space-x-3 text-left justify-start"
              >
                <item.icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                <span className="text-sm">{item.question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-success" />
            <span>Chat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-primary text-white ml-4'
                        : 'bg-muted/50 mr-4'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'assistant' && (
                        <div className="flex-shrink-0 mt-1">
                          {getCategoryIcon(message.category)}
                        </div>
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me about health, finance, or study tips..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                variant="success"
                size="icon"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;