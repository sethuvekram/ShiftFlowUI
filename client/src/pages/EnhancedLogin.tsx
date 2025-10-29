import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Factory, Users, Shield, Clock, TrendingUp, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const DEMO_USERS = [
  {
    id: "pierre.dupont",
    name: "Pierre Dupont",
    role: "Supervisor",
    department: "Clio V Production",
    badge: "Senior Supervisor"
  },
  {
    id: "marie.laurent", 
    name: "Marie Laurent",
    role: "Operator",
    department: "Assembly Line",
    badge: "Expert Operator"
  },
  {
    id: "jean.martin",
    name: "Jean Martin", 
    role: "Operator",
    department: "Quality Control",
    badge: "Quality Technician"
  }
];

const STATS = [
  { icon: Factory, label: "Vehicles produced", value: "13,310", color: "text-blue-600" },
  { icon: TrendingUp, label: "Average OEE", value: "89.7%", color: "text-green-600" },
  { icon: Shield, label: "Days without accident", value: "127", color: "text-purple-600" },
  { icon: Zap, label: "Efficiency", value: "94.2%", color: "text-orange-600" }
];

export default function EnhancedLogin() {
  const [, setLocation] = useLocation();
  const [selectedUser, setSelectedUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = async () => {
    if (!selectedUser) {
      toast({
        title: "Selection Required",
        description: "Please select a user profile.",
        variant: "destructive",
      });
      return;
    }

    const user = DEMO_USERS.find(u => u.id === selectedUser);
    if (!user) return;

    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userDepartment", user.department);
    
    toast({
      title: "Login successful",
      description: `Bienvenue ${user.name} - ${user.department}`,
    });
    
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Factory className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t('login.title')}</h1>
                  <p className="text-sm text-gray-600">{t('login.subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Badge variant="outline" className="text-green-600 border-green-600">
                🟢 Plant Operational
              </Badge>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Flins Plant</div>
                <div className="text-xs text-gray-600">Île-de-France, France</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="w-full max-w-md mx-auto shadow-xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{t('login.welcome')}</CardTitle>
                  <CardDescription className="mt-2">
                    {t('login.description')}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="user-select" className="text-sm font-medium">
                    {t('login.username')}
                  </Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a demo profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEMO_USERS.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-600">{user.department}</div>
                            </div>
                            <Badge variant={user.role === "Supervisor" ? "default" : "secondary"}>
                              {user.badge}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedUser && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                  >
                    {(() => {
                      const user = DEMO_USERS.find(u => u.id === selectedUser);
                      return user ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Selected user:</span>
                            <Badge variant={user.role === "Supervisor" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700">
                            <div><strong>{user.name}</strong></div>
                            <div>{user.department}</div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </motion.div>
                )}

                <Button 
                  onClick={handleLogin} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isLoading || !selectedUser}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Connexion en cours...
                    </div>
                  ) : (
                    "Access System"
                  )}
                </Button>

                <div className="text-center text-xs text-gray-500">
                  Demo mode • Mock data for presentation purposes
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Factory Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Real-Time Performance
              </h2>
              <p className="text-lg text-gray-600">
                Monitor and manage your production operations with our next-generation 
                shift handover platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                      <motion.div 
                        className={`text-2xl font-bold ${stat.color} mb-1`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white"
            >
              <div className="flex items-center gap-4">
                <Clock className="h-12 w-12 text-blue-200" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Current Team</h3>
                  <p className="text-blue-100">
                    <strong>Morning Team</strong> • 06:00 - 14:00
                  </p>
                  <p className="text-blue-200 text-sm mt-1">
                    Prochaine transmission dans 2h 15min
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">98.7%</div>
                <div className="text-xs text-gray-600">Availability</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">47/h</div>
                <div className="text-xs text-gray-600">Cadence</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">99.1%</div>
                <div className="text-xs text-gray-600">Quality</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="bg-gray-50 border-t py-6"
      >
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>© 2025 Renault Digital Factory • Shift Handover System • Technical Demonstration</p>
        </div>
      </motion.footer>
    </div>
  );
}