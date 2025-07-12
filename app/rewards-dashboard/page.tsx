"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Gift, Target, Zap, Leaf, ShoppingCart, Clock, Award, DollarSign } from "lucide-react"

const userStats = {
  currentPoints: 2450,
  totalEarned: 8750,
  level: "Gold Member",
  nextLevel: "Platinum Member",
  pointsToNextLevel: 550,
  streak: 12,
  rank: 847,
}

const badges = [
  {
    id: 1,
    name: "Green Shopper",
    icon: Leaf,
    description: "Bought 10 eco-friendly products",
    earned: true,
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Quick Checkout Pro",
    icon: Zap,
    description: "Used self-checkout 25 times",
    earned: true,
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Early Bird",
    icon: Clock,
    description: "Shopped before 8 AM 5 times",
    earned: true,
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Bulk Buyer",
    icon: ShoppingCart,
    description: "Single purchase over $200",
    earned: false,
    progress: 75,
  },
  {
    id: 5,
    name: "Recipe Master",
    icon: Target,
    description: "Used recipe builder 10 times",
    earned: false,
    progress: 60,
  },
  {
    id: 6,
    name: "Tech Enthusiast",
    icon: Star,
    description: "Bought 5 electronics items",
    earned: false,
    progress: 40,
  },
]

const missions = [
  {
    id: 1,
    title: "Weekly Green Challenge",
    description: "Buy 3 eco-friendly products this week",
    reward: 100,
    progress: 2,
    total: 3,
    timeLeft: "4 days",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Recipe Explorer",
    description: "Try 2 new recipes from our recipe builder",
    reward: 150,
    progress: 0,
    total: 2,
    timeLeft: "1 week",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Social Shopper",
    description: "Share 3 product reviews",
    reward: 75,
    progress: 1,
    total: 3,
    timeLeft: "5 days",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Tech Upgrade",
    description: "Purchase any electronics item over $100",
    reward: 200,
    progress: 0,
    total: 1,
    timeLeft: "2 weeks",
    difficulty: "Hard",
  },
]

const rewards = [
  { id: 1, name: "$5 Off Coupon", cost: 500, type: "discount", available: true },
  { id: 2, name: "$10 Off Coupon", cost: 1000, type: "discount", available: true },
  { id: 3, name: "Skip-the-Line Pass", cost: 300, type: "service", available: true },
  { id: 4, name: "Free Grocery Pickup", cost: 200, type: "service", available: true },
  { id: 5, name: "Exclusive Item Access", cost: 1500, type: "exclusive", available: true },
  { id: 6, name: "$25 Off Coupon", cost: 2500, type: "discount", available: false },
]

const recentActivity = [
  { action: "Earned 50 points", detail: "Completed Green Shopper challenge", date: "2 days ago", points: 50 },
  { action: "Redeemed reward", detail: "$5 off coupon used", date: "1 week ago", points: -500 },
  { action: "Earned 25 points", detail: "Product review submitted", date: "1 week ago", points: 25 },
  { action: "Earned 100 points", detail: "Weekly shopping bonus", date: "2 weeks ago", points: 100 },
]

export default function RewardsDashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const levelProgress = ((3000 - userStats.pointsToNextLevel) / 3000) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rewards Dashboard</h1>
          <p className="text-lg text-gray-600">Earn points, unlock badges, and get exclusive rewards</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#0071dc] mb-2">{userStats.currentPoints.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Current Points</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#ffc220] mb-2">{userStats.level}</div>
              <div className="text-sm text-gray-600">Member Level</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{userStats.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">#{userStats.rank}</div>
              <div className="text-sm text-gray-600">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Level Progress */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-[#ffc220]" />
                    Level Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{userStats.level}</span>
                      <span className="text-sm text-gray-600">{userStats.nextLevel}</span>
                    </div>
                    <Progress value={levelProgress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{userStats.pointsToNextLevel} points to next level</span>
                      <span>{Math.round(levelProgress)}% complete</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#ffc220]/10 rounded-lg">
                    <h4 className="font-semibold text-[#0071dc] mb-2">Platinum Member Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 2x points on all purchases</li>
                      <li>• Exclusive early access to sales</li>
                      <li>• Free express pickup</li>
                      <li>• Priority customer support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${activity.points > 0 ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{activity.action}</div>
                          <div className="text-xs text-gray-600">{activity.detail}</div>
                          <div className="text-xs text-gray-500">{activity.date}</div>
                        </div>
                        <div
                          className={`text-sm font-semibold ${activity.points > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {activity.points > 0 ? "+" : ""}
                          {activity.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#0071dc]" />
                  Active Missions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {missions.map((mission) => (
                    <Card key={mission.id} className="border-2 hover:border-[#0071dc] transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">{mission.title}</h4>
                          <Badge
                            variant={
                              mission.difficulty === "Easy"
                                ? "default"
                                : mission.difficulty === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {mission.difficulty}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{mission.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {mission.progress}/{mission.total}
                            </span>
                          </div>
                          <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Gift className="w-4 h-4 text-[#ffc220]" />
                            <span className="font-semibold text-[#0071dc]">{mission.reward} points</span>
                          </div>
                          <span className="text-xs text-gray-500">{mission.timeLeft} left</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#ffc220]" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <Card
                      key={badge.id}
                      className={`border-2 transition-colors ${
                        badge.earned ? "border-green-200 bg-green-50" : "border-gray-200"
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                            badge.earned ? "bg-[#ffc220]" : "bg-gray-200"
                          }`}
                        >
                          <badge.icon className={`w-8 h-8 ${badge.earned ? "text-[#0071dc]" : "text-gray-400"}`} />
                        </div>

                        <h4 className="font-semibold mb-2">{badge.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{badge.description}</p>

                        {badge.earned ? (
                          <Badge className="bg-green-500">✅ Earned {badge.date}</Badge>
                        ) : (
                          <div className="space-y-2">
                            <Progress value={badge.progress} className="h-2" />
                            <span className="text-xs text-gray-500">{badge.progress}% complete</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-[#0071dc]" />
                    Redeem Rewards
                  </span>
                  <Badge className="bg-[#0071dc]">{userStats.currentPoints} points available</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {rewards.map((reward) => (
                    <Card
                      key={reward.id}
                      className={`border-2 transition-colors ${
                        reward.available && userStats.currentPoints >= reward.cost
                          ? "border-[#0071dc] hover:border-[#0071dc]/70"
                          : "border-gray-200"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="text-center mb-4">
                          <div
                            className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                              reward.type === "discount"
                                ? "bg-green-100"
                                : reward.type === "service"
                                  ? "bg-blue-100"
                                  : "bg-purple-100"
                            }`}
                          >
                            {reward.type === "discount" && <DollarSign className="w-6 h-6 text-green-600" />}
                            {reward.type === "service" && <Zap className="w-6 h-6 text-blue-600" />}
                            {reward.type === "exclusive" && <Star className="w-6 h-6 text-purple-600" />}
                          </div>

                          <h4 className="font-semibold mb-2">{reward.name}</h4>
                          <div className="text-lg font-bold text-[#0071dc] mb-3">{reward.cost} points</div>
                        </div>

                        <Button
                          className="w-full"
                          disabled={!reward.available || userStats.currentPoints < reward.cost}
                          variant={reward.available && userStats.currentPoints >= reward.cost ? "default" : "secondary"}
                        >
                          {!reward.available
                            ? "Coming Soon"
                            : userStats.currentPoints < reward.cost
                              ? "Not Enough Points"
                              : "Redeem"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
