import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Code2, Settings, MapPin, Clock, Award, CheckCircle2, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";
import { supabase } from "@/integrations/supabase/client";

const internships = [{
  id: 1,
  role: "AI / Machine Learning Intern",
  icon: Brain,
  location: "Remote / Hybrid",
  duration: "3–6 Months",
  tag: "AI",
  description: "Work on real-world AI and ML projects under mentorship. Help build intelligent systems, train models, and work with Python, TensorFlow, and real datasets.",
  skills: ["Python", "Pandas", "TensorFlow", "NumPy", "Scikit-learn", "ML basics"],
  responsibilities: ["Assist in AI model development and evaluation", "Work on data cleaning and preprocessing tasks", "Collaborate with mentors for project insights"],
  perks: ["Internship Certificate", "Letter of Recommendation (Performance-Based)", "Mentorship Sessions"]
}, {
  id: 2,
  role: "Full Stack Development Intern",
  icon: Code2,
  location: "Remote / Hybrid",
  duration: "3–6 Months",
  tag: "Development",
  description: "Build and maintain web applications using modern web technologies (MERN Stack). Work with real projects, mentors, and a collaborative tech team.",
  skills: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "Git"],
  responsibilities: ["Develop frontend and backend components", "Integrate APIs and databases", "Deploy and maintain applications"],
  perks: ["Certificate of Completion", "Real Project Exposure", "Mentorship Support"],
  selectionProcess: {
    overview: "All students applying for the internship must complete any one of the tasks listed below within 5 days. This task will be used for evaluating and shortlisting candidates for the final interview.",
    tasks: [
      {
        title: "Temple Tourism Website",
        description: "Create a website where users can explore temples across India. Include information such as temple history, beliefs, best time to visit, and travel routes. The design should be informative and visually attractive for both locals and tourists. Focus on clean navigation and easy accessibility."
      },
      {
        title: "HMIS – Hospital Management System",
        description: "Develop a simple system to manage hospital operations. Include patient registration, doctor appointments, billing, and staff management. Ensure an easy-to-use dashboard for both admin and staff. Try to implement modular pages for scalability."
      },
      {
        title: "Custom Jacket Design Website",
        description: "Build a web app where users can design and customize jackets. Allow color, size, fabric, and logo customization. Show a 3D preview or live visualization of the final jacket. The design should be interactive and user-friendly. Reference: https://varsitybase.com"
      },
      {
        title: "NGO – Training and Skill Development Website",
        description: "Design a website for an NGO that runs training and skill programs. Include sections like About Us, Programs, Volunteer Signup, and Success Stories. Add an option for Donations or Partnership Enquiries. Keep the tone inspiring and the layout simple and accessible. Reference: https://edunetfoundation.org"
      },
      {
        title: "Skill Development Portal For State Govt.",
        description: "Create a website similar to Naan Mudhalvan, which provides students with career and skill development resources. Include course listings, institute details, and skill pathways. Add sections for student login, training providers, and career guidance. The goal is to help students explore career options and find the right training programs. Reference: https://www.naanmudhalvan.tn.gov.in"
      }
    ],
    techStack: ["MERN Stack (MongoDB, Express.js, React.js, Node.js)", "HTML, CSS, JavaScript & PHP", "GitHub (CI/CD Integration) for version control and automated deployment"],
    submissionProcess: [
      "Upload your complete project code to GitHub (make repository public)",
      "Deploy your project on Vercel or Netlify",
      "Submit the live project link and GitHub repository link",
      "Create a short PDF report describing your approach, design choices, and learning experience"
    ],
    note: "Use of AI tools (like ChatGPT, GitHub Copilot, etc.) is allowed — however, students must clearly understand and explain their own code during the interview.",
    timeline: "All students must complete and submit their chosen task within 5 days.",
    shortlistingCriteria: [
      { criteria: "Innovation & Learning Capability", weightage: "30%" },
      { criteria: "Timely Project Completion", weightage: "50%" },
      { criteria: "Enhanced Features & Implementation", weightage: "20%" }
    ]
  },
  detailedTasks: [
    {
      title: "Temple Tourism Website",
      problem: "Many tourists and locals lack a single, well-organized, visually engaging resource to explore India's temples — their histories, beliefs, best times to visit, nearby travel routes and logistics. This causes poor trip planning and missed cultural understanding.",
      objectives: ["Provide searchable, well-structured temple profiles across India", "Present history, beliefs, visiting tips, best season/time, and travel routes for each temple", "Make the site mobile-friendly, accessible, and visually attractive for local and international users"],
      features: ["Landing page with region/state/pilgrimage trail filters", "Temple profile pages with details, best time to visit, and map route", "Search by name, state, deity, or amenities", "Interactive map view and itinerary builder", "Multi-language support and accessibility compliance", "Admin panel to add/edit temple data"],
      techStack: "Frontend: React/Next.js + Tailwind CSS; Backend: Node.js/Express or Django; DB: PostgreSQL/MongoDB; Hosting: Vercel/Heroku"
    },
    {
      title: "HMIS – Hospital Management System",
      problem: "Many small hospitals and clinics lack an integrated system to manage patients, appointments, billing and staff, leading to inefficiencies.",
      objectives: ["Build a modular HMIS for patient registration, appointment, billing, and staff management", "Provide role-based dashboards for admin, doctors, reception, and billing staff"],
      features: ["Patient registration, appointment scheduling, and medical history tracking", "Doctor dashboard with appointments and patient notes", "Billing and invoicing module with receipt generation", "Staff management and admin analytics"],
      techStack: "Frontend: React + Bootstrap/Tailwind; Backend: Django or Node.js; DB: PostgreSQL; Hosting: Render/Heroku"
    },
    {
      title: "Custom Jacket Design Website",
      problem: "Customers need a seamless platform to design jackets with live visualization before purchase.",
      objectives: ["Allow customization of color, size, fabric, and logo", "Show a real-time 2D/3D preview of the design"],
      features: ["Design studio with customization options", "Logo upload and preview", "Live 2D/3D rendering", "Price calculation and order summary", "Admin panel for managing designs and orders"],
      techStack: "Frontend: React + Three.js; Backend: Node.js or Django; Storage: Firebase/AWS; Payment: Stripe"
    },
    {
      title: "NGO – Training and Skill Development Website",
      problem: "NGOs often need a simple yet inspiring web presence to display programs, recruit volunteers, and collect donations.",
      objectives: ["Create an inspiring website to showcase NGO programs and impact", "Enable volunteer signups and donation collection"],
      features: ["About Us, Programs, Success Stories sections", "Volunteer signup form", "Donation/Partnership enquiry system", "Event calendar and blog", "Admin panel for content management"],
      techStack: "Frontend: React + Tailwind CSS; Backend: Node.js/Django; DB: MongoDB/PostgreSQL; Payment: Razorpay/Stripe"
    },
    {
      title: "Skill Development Portal for State Govt.",
      problem: "Students need a unified portal like Naan Mudhalvan for accessing career guidance, course details, and training programs.",
      objectives: ["Provide course listings, institute details, and career pathways", "Include login for students, training providers, and admins"],
      features: ["Course and institute search with filters", "Career guidance and aptitude quizzes", "Role-based dashboards for users", "Admin moderation and analytics"],
      techStack: "Frontend: Next.js + Tailwind; Backend: Django REST or Node.js; DB: PostgreSQL; Hosting: AWS/GCP"
    }
  ]
}, {
  id: 3,
  role: "Google Workspace Admin Intern",
  icon: Settings,
  location: "Remote",
  duration: "3 Months",
  tag: "Admin",
  description: "Assist in managing Google Workspace (Gmail, Drive, Classroom, Admin Console, etc.). Learn about automation, user management, and Workspace integrations.",
  skills: ["Google Admin Console", "Sheets", "GAM commands", "APIs (preferred)", "Basic scripting"],
  responsibilities: ["Manage Workspace users and groups", "Automate workflows using scripts or GAM", "Monitor licenses and reports"],
  perks: ["Certificate + Recommendation", "Hands-on Admin Experience", "Flexible Timings"],
  selectionProcess: {
    overview: "All students applying for the internship must complete any one of the tasks listed below within 5 days. This task will be used for evaluating and shortlisting candidates for the final interview.",
    tasks: [
      {
        title: "The Gemini-Powered Personalized Study Path Generator",
        description: "Use the Gemini API to analyze a student's performance data and dynamically generate personalized daily/weekly study plans, including links to resources and AI-generated flashcards."
      },
      {
        title: "Automated Assignment Lifecycle Management System",
        description: "Allow faculty to create, schedule, and publish assignments digitally. Enable students to submit assignments through a unified online portal. Provide tools for automated grading or structured manual evaluation."
      },
      {
        title: "Secure & Smart Exam Proctoring/Authentication with Vision AI",
        description: "Prototype a proof-of-concept for a secure exam environment. The system will leverage device camera data and Vision AI/Gemini (Visual Analysis) to continuously verify identity and detect unauthorized activity."
      },
      {
        title: "The AI-Driven Code Review and Debugging Assistant",
        description: "Develop an integrated tool using Gemini's reasoning to perform an initial code review, identify bugs/non-optimal structures, and provide a natural language explanation of the issue and a suggested fix."
      }
    ],
    techStack: ["Frontend (for user-interface)", "Backend (for logic and API's)", "Google Workspace Tools", "GitHub (CI/CD Integration) for version control and automated deployment"],
    submissionProcess: [
      "Upload your complete project code to GitHub (make repository public)",
      "Deploy your project on Vercel or Netlify",
      "Submit the live project link and GitHub repository link",
      "Create a short PDF report describing your approach, design choices, and learning experience"
    ],
    note: "Use of AI tools (like ChatGPT, GitHub Copilot, etc.) is allowed — however, students must clearly understand and explain their own code during the interview.",
    timeline: "All students must complete and submit their chosen task within 5 days.",
    shortlistingCriteria: [
      { criteria: "Innovation & Learning Capability", weightage: "30%" },
      { criteria: "Timely Project Completion", weightage: "50%" },
      { criteria: "Enhanced Features & Implementation", weightage: "20%" }
    ]
  },
  detailedTasks: [
    {
      title: "The Gemini-Powered Personalized Study Path Generator",
      problem: "Many students struggle to organize and follow effective study routines. This system uses Gemini API to analyze performance data (test scores, weak areas, learning pace) and generate a dynamic, AI-personalized study plan. It will include weekly/daily schedules, recommended resources, and auto-generated flashcards for each subject.",
      objectives: ["Personalize study plans using AI", "Track progress and adapt plans dynamically", "Generate AI-based learning materials like flashcards", "Improve student outcomes through guided learning"],
      features: ["Student Profile and Performance Analytics Dashboard", "AI-generated personalized daily/weekly study path", "Integrated flashcards and resource recommendations", "Adaptive goal setting and motivation tracker"],
      techStack: "Frontend: React / Next.js; Backend: Node.js / Django; AI Integration: Gemini API; Database: MongoDB / Firebase; Hosting: Vercel / AWS",
      deliverables: ["Functional web app with user and admin login", "Dynamic plan generation engine", "Flashcard and analytics module", "Report dashboard for teachers and students"]
    },
    {
      title: "Automated Assignment Lifecycle Management System",
      problem: "Manual assignment management is time-consuming for both faculty and students. This system streamlines assignment creation, submission, grading, and review through a unified digital portal.",
      objectives: ["Digitalize assignment workflows", "Simplify submission and grading processes", "Provide structured manual and automated grading tools", "Maintain transparency and timely notifications"],
      features: ["Faculty dashboard to upload and schedule assignments", "Student submission interface with status tracking", "Auto-grading (MCQs, coding tasks) and manual evaluation tools", "Plagiarism detection integration", "Notification and reminder system"],
      techStack: "Frontend: Angular / React; Backend: Django / Node.js; Database: PostgreSQL / Firebase; AI Tools: Gemini API (for grading assistance); Hosting: AWS / Render",
      deliverables: ["Functional role-based portal (Admin, Faculty, Student)", "Assignment upload, grading, and analytics system", "Auto-report generation and feedback module"]
    },
    {
      title: "Secure & Smart Exam Proctoring/Authentication with Vision AI",
      problem: "Online exams face major integrity issues like impersonation and cheating. This project uses Vision AI and Gemini's visual reasoning to ensure identity verification and detect suspicious activities in real-time.",
      objectives: ["Build a secure online exam monitoring system", "Verify student identity using Vision AI", "Detect unauthorized behavior through continuous analysis", "Maintain privacy while ensuring exam integrity"],
      features: ["Live face verification and activity tracking", "AI detection of multiple faces or mobile use", "Automated exam session logging", "Admin dashboard with real-time alerts"],
      techStack: "Frontend: React / Vue.js; Backend: Flask / Node.js; AI Integration: Gemini (Vision), OpenCV, TensorFlow; Database: MongoDB / Firebase; Hosting: Google Cloud / AWS",
      deliverables: ["AI-based secure exam platform", "Vision AI proctoring and alert module", "Admin monitoring interface", "Performance and security report"]
    },
    {
      title: "The AI-Driven Code Review and Debugging Assistant",
      problem: "Manual code review is time-consuming and requires expertise. This system leverages Gemini's reasoning power to automatically analyze code, detect bugs, and suggest improvements with explanations.",
      objectives: ["Automate code review and debugging", "Provide human-readable explanations for errors", "Suggest performance and structural optimizations", "Integrate with IDEs or online editors"],
      features: ["Code upload or editor-based review", "Gemini-powered analysis of syntax and logic", "Bug detection and optimization suggestions", "Explanation and learning module for students"],
      techStack: "Frontend: React / Monaco Editor; Backend: FastAPI / Flask; AI Integration: Gemini API; Database: PostgreSQL / MongoDB; Hosting: Render / AWS",
      deliverables: ["Functional AI code reviewer web app", "Explanation engine using Gemini reasoning", "Code optimization report generator", "Optional IDE plugin integration"]
    }
  ]
}];

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction, 
    clearPendingAction 
  } = useProtectedAction();

  const internship = internships.find(i => i.id === Number(id));
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: ""
  });

  useEffect(() => {
    if (!internship) {
      navigate('/career');
    }
  }, [internship, navigate]);

  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'apply_internship') {
        setIsApplyDialogOpen(true);
      }
    });
  }, [completePendingAction]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!internship) return;

    try {
      const { data: dbInternships, error: fetchError } = await supabase
        .from('internships')
        .select('id, title')
        .ilike('title', `%${internship.role.split(' ')[0]}%`)
        .limit(1);

      if (fetchError) throw fetchError;

      let internshipId: string;
      
      if (dbInternships && dbInternships.length > 0) {
        internshipId = dbInternships[0].id;
      } else {
        const { data: newInternship, error: createError } = await supabase
          .from('internships')
          .insert({
            title: internship.role,
            company: 'Ravi Rautela Mentorship Hub',
            description: internship.description,
            duration: internship.duration,
          })
          .select()
          .single();

        if (createError) throw createError;
        internshipId = newInternship.id;
      }

      const { error: applyError } = await supabase
        .from('internship_applications')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          internship_id: internshipId,
          status: 'applied'
        });

      if (applyError) throw applyError;

      toast({
        title: "Application Submitted! 🎉",
        description: `Your application for ${internship?.role} has been received. Check your dashboard to track status.`
      });
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsApplyDialogOpen(false);
    setApplicationForm({
      name: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: ""
    });
  };

  if (!internship) return null;

  const Icon = internship.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Fixed Header */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b mb-8 -mx-4 px-4 py-4 transition-all duration-300 ease-in-out">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/career')}
                className="mb-4"
              >
                ← Back to Careers
              </Button>
              
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-lg bg-primary w-fit">
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{internship.role}</h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{internship.duration}</span>
                    </div>
                    <Badge variant="secondary">#{internship.tag}</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button 
                    size="lg"
                    onClick={() => {
                      executeProtectedAction(
                        'apply_internship',
                        internship,
                        () => {
                          setIsApplyDialogOpen(true);
                        }
                      );
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About the Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {internship.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    Skills Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {internship.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Perks & Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {internship.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Selection Process for Full Stack and Google Workspace */}
              {(internship.id === 2 || internship.id === 3) && 'selectionProcess' in internship && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-primary" />
                      Selection Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{internship.selectionProcess.overview}</p>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Choose Any One Task:</h4>
                      <div className="space-y-4">
                        {internship.selectionProcess.tasks.map((task, idx) => (
                          <Card key={idx} className="border-border/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">{idx + 1}. {task.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Technology Stack Options:</h4>
                      <ul className="space-y-2">
                        {internship.selectionProcess.techStack.map((tech, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm text-muted-foreground">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Submission Process:</h4>
                      <ol className="space-y-2">
                        {internship.selectionProcess.submissionProcess.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-primary font-semibold">{idx + 1}.</span>
                            <span className="text-sm text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground italic">
                          <strong>Note:</strong> {internship.selectionProcess.note}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Timeline:</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {internship.selectionProcess.timeline}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Shortlisting Criteria:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {internship.selectionProcess.shortlistingCriteria.map((item, idx) => (
                          <Card key={idx} className="border-border/50 text-center">
                            <CardContent className="pt-6">
                              <div className="text-3xl font-bold text-primary mb-2">{item.weightage}</div>
                              <p className="text-sm text-muted-foreground">{item.criteria}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Detailed Task Information:</h4>
                      <div className="space-y-4">
                        {internship.detailedTasks.map((task, idx) => (
                          <Card key={idx} className="border-border/50">
                            <CardHeader>
                              <CardTitle className="text-base">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1">Problem Statement:</p>
                                <p className="text-sm text-muted-foreground">{task.problem}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1">Objectives:</p>
                                <ul className="space-y-1">
                                  {task.objectives.map((obj, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary">•</span>
                                      {obj}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1">Key Features:</p>
                                <ul className="space-y-1">
                                  {task.features.map((feat, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary">•</span>
                                      {feat}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="pt-2">
                                <Badge variant="secondary" className="text-xs">
                                  {task.techStack}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Apply Button */}
              <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t py-6">
                <Button 
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    executeProtectedAction(
                      'apply_internship',
                      internship,
                      () => {
                        setIsApplyDialogOpen(true);
                      }
                    );
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Apply Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {internship?.role}</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your application
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplySubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" required value={applicationForm.name} onChange={e => setApplicationForm({
                ...applicationForm,
                name: e.target.value
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required value={applicationForm.email} onChange={e => setApplicationForm({
                ...applicationForm,
                email: e.target.value
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" type="tel" required value={applicationForm.phone} onChange={e => setApplicationForm({
                ...applicationForm,
                phone: e.target.value
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume / Portfolio Link *</Label>
              <Input id="resume" placeholder="https://..." required value={applicationForm.resume} onChange={e => setApplicationForm({
                ...applicationForm,
                resume: e.target.value
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Why do you want this internship? *</Label>
              <Textarea id="coverLetter" rows={4} required value={applicationForm.coverLetter} onChange={e => setApplicationForm({
                ...applicationForm,
                coverLetter: e.target.value
              })} />
            </div>
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={clearPendingAction}
        message="Please sign in to continue with your application 🚀"
      />
    </div>
  );
};

export default InternshipDetail;