import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Code2, Settings, Briefcase, MapPin, Clock, Award, CheckCircle2, Bell, Search, Home, Building2, Cog, Monitor, BarChart3, TrendingUp, ClipboardCheck, Lightbulb, Users, DollarSign, PieChart, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
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
const jobCategories = [{
  icon: Home,
  label: "Remote",
  href: "#"
}, {
  icon: Building2,
  label: "MNC",
  href: "#"
}, {
  icon: Cog,
  label: "Engineering",
  href: "#"
}, {
  icon: Monitor,
  label: "Software & IT",
  href: "#"
}, {
  icon: BarChart3,
  label: "Data Science",
  href: "#"
}, {
  icon: TrendingUp,
  label: "Marketing",
  href: "#"
}, {
  icon: ClipboardCheck,
  label: "Project Mgmt",
  href: "#"
}, {
  icon: Briefcase,
  label: "Internship",
  href: "#"
}, {
  icon: Award,
  label: "Fortune 500",
  href: "#"
}, {
  icon: DollarSign,
  label: "Sales",
  href: "#"
}, {
  icon: PieChart,
  label: "Analytics",
  href: "#"
}];
const Career = () => {
  const { toast } = useToast();
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction, 
    clearPendingAction 
  } = useProtectedAction();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInternship, setSelectedInternship] = useState<typeof internships[0] | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: ""
  });
  
  // Handle pending action after login
  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'apply_internship' && action.data) {
        setSelectedInternship(action.data);
        setIsApplyDialogOpen(true);
      }
    });
  }, [completePendingAction]);
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = searchQuery === "" || internship.role.toLowerCase().includes(searchQuery.toLowerCase()) || internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === "" || internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = selectedCategory === "" || internship.tag.toLowerCase() === selectedCategory.toLowerCase() || selectedCategory === "Remote" && internship.location.includes("Remote") || selectedCategory === "Internship";
    return matchesSearch && matchesLocation && matchesCategory;
  });
  const handleSearch = () => {
    toast({
      title: "Search Applied",
      description: `Found ${filteredInternships.length} matching opportunities`
    });
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInternship) return;

    try {
      // For hardcoded internships, we need to map them to database internships
      // First, try to find matching internship in Supabase by title
      const { data: dbInternships, error: fetchError } = await supabase
        .from('internships')
        .select('id, title')
        .ilike('title', `%${selectedInternship.role.split(' ')[0]}%`)
        .limit(1);

      if (fetchError) throw fetchError;

      let internshipId: string;
      
      if (dbInternships && dbInternships.length > 0) {
        internshipId = dbInternships[0].id;
      } else {
        // If not found, create a new internship record
        const { data: newInternship, error: createError } = await supabase
          .from('internships')
          .insert({
            title: selectedInternship.role,
            company: 'Ravi Rautela Mentorship Hub',
            description: selectedInternship.description,
            duration: selectedInternship.duration,
          })
          .select()
          .single();

        if (createError) throw createError;
        internshipId = newInternship.id;
      }

      // Now insert the application
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
        description: `Your application for ${selectedInternship?.role} has been received. Check your dashboard to track status.`
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
    setSelectedInternship(null);
    setApplicationForm({
      name: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: ""
    });
  };
  const handleNotifyMe = () => {
    toast({
      title: "Notification Set! 🔔",
      description: "We'll notify you when new internship opportunities are posted."
    });
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search Hero Section */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Heading */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">Opportunities</h1>
              
            </div>

            {/* Search Form */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input placeholder="Enter skills / designations / companies" className="pl-10 h-12 border-border" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  </div>
                  
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger className="md:w-[200px] h-12 border-border">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative md:w-[200px]">
                    <Input placeholder="Enter location" className="h-12 border-border" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
                  </div>

                  <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {jobCategories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.label;
              return <Button key={index} variant={isSelected ? "default" : "outline"} className="gap-2 h-11 px-4 hover:border-primary hover:text-primary transition-all" onClick={() => handleCategoryClick(category.label)}>
                    <Icon className="w-4 h-4" />
                    {category.label}
                    <ChevronRight className="w-4 h-4" />
                  </Button>;
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Listings */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          

          {filteredInternships.length === 0 ? <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No internships match your search criteria</p>
              <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setLocationFilter("");
            setSelectedCategory("");
          }}>
                Clear Filters
              </Button>
            </div> : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredInternships.map((internship, index) => {
            const Icon = internship.icon;
            const cardColors = [
              { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", iconBg: "bg-blue-500" },
              { bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-pink-200 dark:border-pink-800", iconBg: "bg-pink-500" },
              { bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-200 dark:border-cyan-800", iconBg: "bg-cyan-500" }
            ];
            const colorScheme = cardColors[index % 3];
            
            return <Card key={internship.id} className={`${colorScheme.bg} ${colorScheme.border} border-2 overflow-hidden group animate-fade-in-up hover-lift`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${colorScheme.iconBg} w-fit`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {internship.id === 1 && "💼"} 
                      {internship.id === 2 && "💻"} 
                      {internship.id === 3 && "⚙️"} 
                      {internship.role}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {internship.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {internship.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{internship.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="w-full gap-2 shadow-sm"
                        onClick={() => {
                          window.location.href = `/internship/${internship.id}`;
                        }}
                      >
                        I am Interested
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>;
          })}
            </div>}

          {/* Details Dialog */}
          <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedInternship?.role}</DialogTitle>
                <DialogDescription>
                  Complete internship details and requirements
                </DialogDescription>
              </DialogHeader>
              
              {selectedInternship && (
                <div className="space-y-6 pt-4">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{selectedInternship.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{selectedInternship.duration}</span>
                    </div>
                    <Badge variant="secondary">#{selectedInternship.tag}</Badge>
                  </div>

                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedInternship.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedInternship.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Perks & Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedInternship.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                          <span className="text-muted-foreground">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Selection Process for Full Stack and Google Workspace */}
                  {(selectedInternship.id === 2 || selectedInternship.id === 3) && 'selectionProcess' in selectedInternship && (
                    <div className="space-y-6 pt-6 border-t">
                      <div>
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                          <Lightbulb className="w-6 h-6 text-primary" />
                          Selection Process
                        </h3>
                        <p className="text-muted-foreground mb-4">{selectedInternship.selectionProcess.overview}</p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-lg mb-3">Choose Any One Task:</h4>
                          <div className="space-y-4">
                            {selectedInternship.selectionProcess.tasks.map((task, idx) => (
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

                        <div className="mb-6">
                          <h4 className="font-semibold text-lg mb-3">Technology Stack Options:</h4>
                          <ul className="space-y-2">
                            {selectedInternship.selectionProcess.techStack.map((tech, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-sm text-muted-foreground">{tech}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-lg mb-3">Submission Process:</h4>
                          <ol className="space-y-2">
                            {selectedInternship.selectionProcess.submissionProcess.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-primary font-semibold">{idx + 1}.</span>
                                <span className="text-sm text-muted-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground italic">
                              <strong>Note:</strong> {selectedInternship.selectionProcess.note}
                            </p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-lg mb-3">Timeline:</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {selectedInternship.selectionProcess.timeline}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-lg mb-3">Shortlisting Criteria:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {selectedInternship.selectionProcess.shortlistingCriteria.map((item, idx) => (
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
                            {selectedInternship.detailedTasks.map((task, idx) => (
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
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        executeProtectedAction(
                          'apply_internship',
                          selectedInternship,
                          () => {
                            setIsDetailsDialogOpen(false);
                            setIsApplyDialogOpen(true);
                          }
                        );
                      }}
                    >
                      Apply for this Position
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Apply Dialog */}
          <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Apply for {selectedInternship?.role}</DialogTitle>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto text-center p-8 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Don't see your ideal role?</CardTitle>
              <CardDescription className="text-base mt-4">
                Stay tuned — more opportunities are coming soon! Get notified when new internships are posted.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button size="lg" variant="outline" className="gap-2" onClick={handleNotifyMe}>
                <Bell className="w-5 h-5" />
                Notify Me 🔔
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={clearPendingAction}
        message="Please sign in to continue with your application 🚀"
      />
    </div>;
};
export default Career;