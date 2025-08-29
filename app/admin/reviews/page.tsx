import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Clock, AlertTriangle, User, Star, MessageSquare, Eye } from "lucide-react"

const pendingReviews = [
  {
    id: "BUG-005",
    title: "Payment processing error",
    developer: "John Smith",
    developerId: "dev-001",
    submittedAt: "2024-01-15T14:30:00Z",
    timeSpent: "2.5 hours",
    payout: 99,
    solution: "Fixed Stripe webhook validation and added proper error handling for failed payments.",
    complexity: "medium",
    userSatisfaction: null,
    status: "pending-review",
  },
  {
    id: "BUG-006",
    title: "Mobile responsive issues",
    developer: "Sarah Wilson",
    developerId: "dev-002",
    submittedAt: "2024-01-15T11:15:00Z",
    timeSpent: "1.8 hours",
    payout: 49,
    solution: "Updated CSS media queries and fixed flexbox layout issues on mobile devices.",
    complexity: "low",
    userSatisfaction: null,
    status: "pending-review",
  },
]

const completedReviews = [
  {
    id: "BUG-003",
    title: "Database connection timeout",
    developer: "John Smith",
    developerId: "dev-001",
    completedAt: "2024-01-14T16:45:00Z",
    timeSpent: "3.2 hours",
    payout: 49,
    solution: "Implemented connection pooling and retry logic for database operations.",
    userRating: 5,
    userFeedback: "Excellent work! The issue is completely resolved and the app is much more stable now.",
    knowledgeBaseAdded: true,
    status: "approved",
  },
  {
    id: "BUG-004",
    title: "Form validation errors",
    developer: "Mike Johnson",
    developerId: "dev-003",
    completedAt: "2024-01-13T09:20:00Z",
    timeSpent: "1.5 hours",
    payout: 99,
    solution: "Fixed regex patterns and added proper client-side validation.",
    userRating: 4,
    userFeedback: "Good fix, works as expected. Communication could have been better.",
    knowledgeBaseAdded: true,
    status: "approved",
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Human Developer Reviews</h1>
              <p className="text-slate-600">Review and approve developer solutions</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-orange-100 text-orange-800">
                <Clock className="h-3 w-3 mr-1" />
                {pendingReviews.length} Pending
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending Review ({pendingReviews.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{review.title}</h3>
                            <Badge variant="outline">{review.id}</Badge>
                            <Badge className="bg-orange-100 text-orange-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending Review
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {review.developer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600">by {review.developer}</span>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-600">
                              Submitted {new Date(review.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 mb-3">{review.solution}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-green-100 text-green-800">${review.payout}</Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {review.complexity}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>Time spent: {review.timeSpent}</span>
                          <span>•</span>
                          <span>Payout: ${review.payout}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Developer
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Request Changes
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve & Pay
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="space-y-4">
                {completedReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{review.title}</h3>
                            <Badge variant="outline">{review.id}</Badge>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {review.developer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600">by {review.developer}</span>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-600">
                              Completed {new Date(review.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">{review.solution}</p>
                          <p className="text-sm text-slate-600 italic">"{review.userFeedback}"</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-green-100 text-green-800">${review.payout}</Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.userRating ? "text-yellow-400 fill-current" : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          {review.knowledgeBaseAdded && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              KB Added
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Avg Review Time</p>
                        <p className="text-2xl font-bold text-slate-900">4.2 hours</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Approval Rate</p>
                        <p className="text-2xl font-bold text-green-600">94%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Avg User Rating</p>
                        <p className="text-2xl font-bold text-yellow-600">4.6★</p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">KB Entries Added</p>
                        <p className="text-2xl font-bold text-purple-600">127</p>
                      </div>
                      <User className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
