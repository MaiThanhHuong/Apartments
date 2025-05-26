import { ResidentLayout } from "@/components/layout/ResidentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare, SendHorizonal, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [satisfaction, setSatisfaction] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We appreciate your input!",
    });
    setSubmitted(true);
  };

  return (
    <ResidentLayout title="Feedback">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-primary mr-2" />
              <div>
                <CardTitle>Resident Feedback</CardTitle>
                <CardDescription>
                  Share your thoughts, suggestions, or concerns about our
                  building and services
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-type">Feedback Type</Label>
                    <Select
                      defaultValue={feedbackType}
                      onValueChange={setFeedbackType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="appreciation">
                          Appreciation
                        </SelectItem>
                        <SelectItem value="inquiry">Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">
                          Maintenance & Repairs
                        </SelectItem>
                        <SelectItem value="security">
                          Security & Safety
                        </SelectItem>
                        <SelectItem value="cleanliness">Cleanliness</SelectItem>
                        <SelectItem value="management">
                          Building Management
                        </SelectItem>
                        <SelectItem value="amenities">
                          Amenities & Facilities
                        </SelectItem>
                        <SelectItem value="neighbors">
                          Neighbor Issues
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-subject">Subject</Label>
                    <Input
                      id="feedback-subject"
                      placeholder="Brief description of your feedback"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-details">Details</Label>
                    <Textarea
                      id="feedback-details"
                      placeholder="Please provide detailed information about your feedback"
                      rows={5}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Overall Satisfaction</Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className={`p-2 rounded-full ${
                            satisfaction === rating
                              ? "text-yellow-500 bg-yellow-50"
                              : "text-gray-400 hover:text-yellow-400"
                          }`}
                          onClick={() => setSatisfaction(rating)}
                        >
                          <Star
                            className="h-6 w-6"
                            fill={
                              satisfaction && rating <= satisfaction
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>
                      Would you like to be contacted about this feedback?
                    </Label>
                    <RadioGroup defaultValue="no">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="contact-yes" />
                        <Label htmlFor="contact-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="contact-no" />
                        <Label htmlFor="contact-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-photo">
                      Attach Photo (Optional)
                    </Label>
                    <Input id="feedback-photo" type="file" />
                  </div>
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  <SendHorizonal className="mr-2 h-4 w-4" /> Submit Feedback
                </Button>
              </form>
            ) : (
              <div className="py-10 text-center">
                <div className="bg-success/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <ThumbsUp className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your input is valuable to us and helps improve our building
                  services.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Submit Another Feedback
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previous Feedback</CardTitle>
            <CardDescription>
              View the status of your submitted feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h4 className="font-medium">Gym Equipment Maintenance</h4>
                    <p className="text-sm text-muted-foreground">
                      Submitted: May 5, 2025 • Category: Amenities & Facilities
                    </p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                    In Review
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h4 className="font-medium">
                      Appreciation for Quick Response
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Submitted: April 20, 2025 • Category: Management
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Addressed
                  </div>
                </div>
                <div className="mt-3 p-3 bg-muted rounded-md text-sm">
                  <p className="font-medium">Response from Management:</p>
                  <p className="text-muted-foreground mt-1">
                    Thank you for your kind words. We're glad we could help
                    promptly with your request!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResidentLayout>
  );
};

export default Feedback;
