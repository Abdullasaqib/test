// Build v31 - Improved page loading: eager load critical pages, subtle loading indicator
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { SchoolAdminRoute } from "@/components/school-admin/SchoolAdminRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SchoolAdminLayout } from "@/components/school-admin/SchoolAdminLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteLoadingIndicator } from "@/components/RouteLoadingIndicator";

// Eagerly load critical pages for instant navigation
import Academy from "./pages/Academy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DashboardCertification from "./pages/DashboardCertification";

// Lazy load less-frequently accessed pages
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AwaitingConsent = lazy(() => import("./pages/AwaitingConsent"));
const VerifyConsent = lazy(() => import("./pages/VerifyConsent"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const FreeAIGuide = lazy(() => import("./pages/FreeAIGuide"));
const SchoolsPage = lazy(() => import("./pages/SchoolsPage"));
const SchoolsPricing = lazy(() => import("./pages/SchoolsPricing"));
const SchoolsCurriculumGuide = lazy(() => import("./pages/SchoolsCurriculumGuide"));
const ParentsPage = lazy(() => import("./pages/ParentsPage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const BrandIdentityPage = lazy(() => import("./pages/BrandIdentityPage"));
const JuniorProgramPage = lazy(() => import("./pages/JuniorProgramPage"));
const TeenVentureProgramPage = lazy(() => import("./pages/TeenVentureProgramPage"));
const AdvancedProgramPage = lazy(() => import("./pages/AdvancedProgramPage"));
const AcademyApply = lazy(() => import("./pages/AcademyApply"));
const AcademyPitch = lazy(() => import("./pages/AcademyPitch"));
import Checkout from "./pages/Checkout"; // Eagerly load for conversion
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess"));
const Success2035 = lazy(() => import("./pages/Success2035"));
const SocialContent = lazy(() => import("./pages/SocialContent"));
const GovernmentPitch = lazy(() => import("./pages/GovernmentPitch"));
const RwandaPitch = lazy(() => import("./pages/RwandaPitch"));
const InvestorPitch = lazy(() => import("./pages/InvestorPitch"));
const Methodology = lazy(() => import("./pages/Methodology"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Ventures = lazy(() => import("./pages/Ventures"));
const ProductTour = lazy(() => import("./pages/ProductTour"));
const AIFoundationsPage = lazy(() => import("./pages/certification/AIFoundationsPage"));
const AIBuilderPage = lazy(() => import("./pages/certification/AIBuilderPage"));
const AILauncherPage = lazy(() => import("./pages/certification/AILauncherPage"));
import VibeCodingEssentialsPage from "./pages/certification/VibeCodingEssentialsPage";
const Partners = lazy(() => import("./pages/Partners"));
const SalesMaterialsHub = lazy(() => import("./pages/SalesMaterialsHub"));
const Masterclasses = lazy(() => import("./pages/Masterclasses"));

// Feature pages
const TheTankPage = lazy(() => import("./pages/features/TheTankPage"));
const FounderDNAPage = lazy(() => import("./pages/features/FounderDNAPage"));
const AICoachPage = lazy(() => import("./pages/features/AICoachPage"));
const PromptLibraryPage = lazy(() => import("./pages/features/PromptLibraryPage"));

// Coming Soon - Adult Programs
const CollegeFounders = lazy(() => import("./pages/CollegeFounders"));
const Professionals = lazy(() => import("./pages/Professionals"));
const Enterprise = lazy(() => import("./pages/Enterprise"));

// Pro dashboard pages (adults)
const ProOnboarding = lazy(() => import("./pages/pro/ProOnboarding"));
const ProHome = lazy(() => import("./pages/pro/ProHome"));
const ProCurriculum = lazy(() => import("./pages/pro/ProCurriculum"));
const ProCoach = lazy(() => import("./pages/pro/ProCoach"));
const ProTank = lazy(() => import("./pages/pro/ProTank"));
const ProSprints = lazy(() => import("./pages/pro/ProSprints"));
const ProCertificate = lazy(() => import("./pages/pro/ProCertificate"));
const ProSettings = lazy(() => import("./pages/pro/ProSettings"));

// Tier landing pages (youth) - eagerly loaded for instant Academy navigation
import FirstStep from "./pages/tier/FirstStep";
import FullFoundation from "./pages/tier/FullFoundation";
import AcceleratorPage from "./pages/tier/Accelerator";

// Tier landing pages (adults)
const ProfessionalBuilder = lazy(() => import("./pages/tier/ProfessionalBuilder"));
const CollegeFoundersTier = lazy(() => import("./pages/tier/CollegeFoundersTier"));

// Demo pages
const Demo = lazy(() => import("./pages/Demo"));
const DemoCoach = lazy(() => import("./pages/DemoCoach"));
const DemoTank = lazy(() => import("./pages/DemoTank"));
const DemoSkills = lazy(() => import("./pages/DemoSkills"));
const DemoCertification = lazy(() => import("./pages/DemoCertification"));

// Eagerly load core dashboard pages for instant navigation
import DashboardOnboarding from "./pages/DashboardOnboarding";
import DashboardProfileComplete from "./pages/DashboardProfileComplete";
import DashboardMission from "./pages/DashboardMission";
import DashboardCurriculum from "./pages/DashboardCurriculum";
import DashboardWeekDetail from "./pages/DashboardWeekDetail";
import DashboardSkillIntelligence from "./pages/DashboardSkillIntelligence";
import DashboardDNA from "./pages/DashboardDNA";
import DashboardBrainstorm from "./pages/DashboardBrainstorm";
import DashboardCoach from "./pages/DashboardCoach";
import DashboardAIToolbox from "./pages/DashboardAIToolbox";
import DashboardTank from "./pages/DashboardTank";
import DashboardTeam from "./pages/DashboardTeam";
import DashboardShowcase from "./pages/DashboardShowcase";
import DashboardSchedule from "./pages/DashboardSchedule";
import DashboardResources from "./pages/DashboardResources";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardSprint from "./pages/DashboardSprint";
import DashboardSprintTracks from "./pages/DashboardSprintTracks";
import DashboardMyStuff from "./pages/DashboardMyStuff";
import DashboardIndustryExplorer from "./pages/DashboardIndustryExplorer";

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminActivityLog = lazy(() => import("./pages/admin/AdminActivityLog"));
const AdminRevenue = lazy(() => import("./pages/admin/AdminRevenue"));
const AdminFounders = lazy(() => import("./pages/admin/AdminFounders"));
const AdminStudents = lazy(() => import("./pages/admin/AdminStudents"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications"));
const AdminCohorts = lazy(() => import("./pages/admin/AdminCohorts"));
const AdminCurriculum = lazy(() => import("./pages/admin/AdminCurriculum"));
const AdminCurriculumReview = lazy(() => import("./pages/admin/AdminCurriculumReview"));
const AdminCurriculumAudit = lazy(() => import("./pages/admin/AdminCurriculumAudit"));
const AdminMentors = lazy(() => import("./pages/admin/AdminMentors"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminEmailCampaigns = lazy(() => import("./pages/admin/AdminEmailCampaigns"));
const AdminPricing = lazy(() => import("./pages/admin/AdminPricing"));
const AdminEnrollments = lazy(() => import("./pages/admin/AdminEnrollments"));
const AdminCaseStudies = lazy(() => import("./pages/admin/AdminCaseStudies"));
const AdminAnnouncements = lazy(() => import("./pages/admin/AdminAnnouncements"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminSchools = lazy(() => import("./pages/admin/AdminSchools"));
const AdminDeals = lazy(() => import("./pages/admin/AdminDeals"));
const AdminSystemHealth = lazy(() => import("./pages/admin/AdminSystemHealth"));
const LogoGenerator = lazy(() => import("./pages/admin/LogoGenerator"));
const DemoQAChecklist = lazy(() => import("./pages/admin/DemoQAChecklist"));

// School admin pages
const SchoolDashboard = lazy(() => import("./pages/school-admin/SchoolDashboard"));
const SchoolStudents = lazy(() => import("./pages/school-admin/SchoolStudents"));
const SchoolSkills = lazy(() => import("./pages/school-admin/SchoolSkills"));
const SchoolReports = lazy(() => import("./pages/school-admin/SchoolReports"));
const SchoolSettings = lazy(() => import("./pages/school-admin/SchoolSettings"));

// Enterprise admin pages
import { EnterpriseAdminRoute } from "@/components/enterprise-admin/EnterpriseAdminRoute";
const EnterpriseDashboard = lazy(() => import("./pages/enterprise-admin/EnterpriseDashboard"));
const EnterpriseLearners = lazy(() => import("./pages/enterprise-admin/EnterpriseLearners"));
const EnterpriseProgress = lazy(() => import("./pages/enterprise-admin/EnterpriseProgress"));
const EnterpriseReports = lazy(() => import("./pages/enterprise-admin/EnterpriseReports"));
const EnterpriseSettings = lazy(() => import("./pages/enterprise-admin/EnterpriseSettings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const PageLoader = () => <RouteLoadingIndicator />;

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Academy />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/awaiting-consent" element={<ProtectedRoute><AwaitingConsent /></ProtectedRoute>} />
                    <Route path="/verify-consent" element={<VerifyConsent />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/manifesto" element={<Manifesto />} />
                    <Route path="/free-guide" element={<FreeAIGuide />} />
                    <Route path="/free-ai-guide" element={<Navigate to="/free-guide" replace />} />
                    <Route path="/schools" element={<SchoolsPage />} />
                    <Route path="/schools/pricing" element={<SchoolsPricing />} />
                    <Route path="/schools/curriculum" element={<SchoolsCurriculumGuide />} />
                    <Route path="/academy/parents" element={<ParentsPage />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                    <Route path="/brand-identity" element={<BrandIdentityPage />} />
                    <Route path="/junior-program" element={<JuniorProgramPage />} />
                    <Route path="/teen-venture" element={<TeenVentureProgramPage />} />
                    <Route path="/advanced-program" element={<AdvancedProgramPage />} />
                    <Route path="/academy/apply" element={<AcademyApply />} />
                    <Route path="/academy/pitch" element={<AcademyPitch />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/registration-success" element={<RegistrationSuccess />} />
                    <Route path="/success-2035" element={<Success2035 />} />
                    <Route path="/social-content" element={<SocialContent />} />
              <Route path="/government-pitch" element={<GovernmentPitch />} />
              <Route path="/uae-pitch" element={<Navigate to="/government-pitch" replace />} />
              <Route path="/rwanda-pitch" element={<RwandaPitch />} />
              <Route path="/investor-pitch" element={<InvestorPitch />} />
<Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/methodology" element={<Methodology />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/partnerships/materials" element={<SalesMaterialsHub />} />
                    <Route path="/masterclasses" element={<Masterclasses />} />
<Route path="/ventures" element={<Ventures />} />
                    <Route path="/product-tour" element={<ProductTour />} />
                    <Route path="/certification/ai-foundations" element={<AIFoundationsPage />} />
                    <Route path="/certification/ai-builder" element={<AIBuilderPage />} />
                    <Route path="/certification/ai-launcher" element={<AILauncherPage />} />
                    <Route path="/certification/vibe-coding-essentials" element={<VibeCodingEssentialsPage />} />
                    
                    {/* Feature detail pages */}
                    <Route path="/features/the-tank" element={<TheTankPage />} />
                    <Route path="/features/founder-dna" element={<FounderDNAPage />} />
                    <Route path="/features/ai-coach" element={<AICoachPage />} />
                    <Route path="/features/prompt-library" element={<PromptLibraryPage />} />
                    
                    {/* Coming Soon - Adult Programs */}
                    <Route path="/college-founders" element={<CollegeFounders />} />
                    <Route path="/professionals" element={<Professionals />} />
                    <Route path="/enterprise" element={<Enterprise />} />
                    
                    {/* Tier landing pages */}
                    <Route path="/ai-foundations" element={<FirstStep />} />
                    <Route path="/ai-builder" element={<FullFoundation />} />
                    <Route path="/ai-launcher" element={<AcceleratorPage />} />
                    
                    {/* Redirects for old tier routes */}
                    <Route path="/first-step" element={<Navigate to="/ai-foundations" replace />} />
                    <Route path="/full-foundation" element={<Navigate to="/ai-builder" replace />} />
                    <Route path="/accelerator" element={<Navigate to="/ai-launcher" replace />} />
                    <Route path="/parents" element={<Navigate to="/academy/parents" replace />} />
                    
                    {/* Adult tier landing pages */}
                    <Route path="/professional-builder" element={<ProfessionalBuilder />} />
                    <Route path="/college-tier" element={<CollegeFoundersTier />} />

                    {/* Demo routes - no auth required */}
                    <Route path="/demo" element={<Demo />}>
                      <Route path="coach" element={<DemoCoach />} />
                      <Route path="tank" element={<DemoTank />} />
                      <Route path="skills" element={<DemoSkills />} />
                      <Route path="certification" element={<DemoCertification />} />
                    </Route>

                    {/* Protected dashboard routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/dashboard/onboarding" element={<ProtectedRoute><DashboardOnboarding /></ProtectedRoute>} />
                    <Route path="/dashboard/profile-complete" element={<ProtectedRoute><DashboardProfileComplete /></ProtectedRoute>} />
                    <Route path="/dashboard/mission" element={<ProtectedRoute><DashboardMission /></ProtectedRoute>} />
                    <Route path="/dashboard/mission/:missionId" element={<ProtectedRoute><DashboardMission /></ProtectedRoute>} />
                    <Route path="/dashboard/curriculum" element={<ProtectedRoute><DashboardCurriculum /></ProtectedRoute>} />
                    <Route path="/dashboard/curriculum/week/:weekNumber" element={<ProtectedRoute><DashboardWeekDetail /></ProtectedRoute>} />
                    <Route path="/dashboard/skills" element={<ProtectedRoute><DashboardSkillIntelligence /></ProtectedRoute>} />
                    <Route path="/dashboard/dna" element={<ProtectedRoute><DashboardDNA /></ProtectedRoute>} />
                    <Route path="/dashboard/brainstorm" element={<ProtectedRoute><DashboardBrainstorm /></ProtectedRoute>} />
                    <Route path="/dashboard/coach" element={<ProtectedRoute><DashboardCoach /></ProtectedRoute>} />
                    <Route path="/dashboard/toolkit" element={<ProtectedRoute><DashboardAIToolbox /></ProtectedRoute>} />
                    <Route path="/dashboard/tank" element={<ProtectedRoute><DashboardTank /></ProtectedRoute>} />
                    <Route path="/dashboard/team" element={<ProtectedRoute><DashboardTeam /></ProtectedRoute>} />
                    <Route path="/dashboard/certification" element={<ProtectedRoute><DashboardCertification /></ProtectedRoute>} />
                    <Route path="/dashboard/certification/:slug" element={<ProtectedRoute><DashboardCertification /></ProtectedRoute>} />
                    <Route path="/dashboard/certification/:slug/lesson/:lessonId" element={<ProtectedRoute><DashboardCertification /></ProtectedRoute>} />
                    <Route path="/dashboard/showcase" element={<ProtectedRoute><DashboardShowcase /></ProtectedRoute>} />
                    <Route path="/dashboard/schedule" element={<ProtectedRoute><DashboardSchedule /></ProtectedRoute>} />
                    <Route path="/dashboard/resources" element={<ProtectedRoute><DashboardResources /></ProtectedRoute>} />
                    <Route path="/dashboard/sprint" element={<ProtectedRoute><DashboardSprint /></ProtectedRoute>} />
                    <Route path="/dashboard/sprint/tracks" element={<ProtectedRoute><DashboardSprintTracks /></ProtectedRoute>} />
                    <Route path="/dashboard/industry" element={<ProtectedRoute><DashboardIndustryExplorer /></ProtectedRoute>} />
                    <Route path="/dashboard/industry/:slug" element={<ProtectedRoute><DashboardIndustryExplorer /></ProtectedRoute>} />
                    <Route path="/dashboard/my-stuff" element={<ProtectedRoute><DashboardMyStuff /></ProtectedRoute>} />
                    <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />

                    {/* Protected pro routes (adults) */}
                    <Route path="/pro/onboarding" element={<ProtectedRoute><ProOnboarding /></ProtectedRoute>} />
                    <Route path="/pro" element={<ProtectedRoute><ProHome /></ProtectedRoute>} />
                    <Route path="/pro/home" element={<ProtectedRoute><ProHome /></ProtectedRoute>} />
                    <Route path="/pro/curriculum" element={<ProtectedRoute><ProCurriculum /></ProtectedRoute>} />
                    <Route path="/pro/coach" element={<ProtectedRoute><ProCoach /></ProtectedRoute>} />
                    <Route path="/pro/tank" element={<ProtectedRoute><ProTank /></ProtectedRoute>} />
                    <Route path="/pro/sprints" element={<ProtectedRoute><ProSprints /></ProtectedRoute>} />
                    <Route path="/pro/certificate" element={<ProtectedRoute><ProCertificate /></ProtectedRoute>} />
                    <Route path="/pro/settings" element={<ProtectedRoute><ProSettings /></ProtectedRoute>} />

                    {/* Admin routes */}
                    <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/activity" element={<AdminRoute><AdminLayout><AdminActivityLog /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/revenue" element={<AdminRoute><AdminLayout><AdminRevenue /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/founders" element={<AdminRoute><AdminLayout><AdminFounders /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/students" element={<AdminRoute><AdminLayout><AdminStudents /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/applications" element={<AdminRoute><AdminLayout><AdminApplications /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/cohorts" element={<AdminRoute><AdminLayout><AdminCohorts /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/curriculum" element={<AdminRoute><AdminLayout><AdminCurriculum /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/curriculum/review" element={<AdminRoute><AdminLayout><AdminCurriculumReview /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/curriculum/audit" element={<AdminRoute><AdminLayout><AdminCurriculumAudit /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/mentors" element={<AdminRoute><AdminLayout><AdminMentors /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/content" element={<AdminRoute><AdminLayout><AdminContent /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/analytics" element={<AdminRoute><AdminLayout><AdminAnalytics /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/settings" element={<AdminRoute><AdminLayout><AdminSettings /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/leads" element={<AdminRoute><AdminLayout><AdminLeads /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/email-campaigns" element={<AdminRoute><AdminLayout><AdminEmailCampaigns /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/pricing" element={<AdminRoute><AdminLayout><AdminPricing /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/enrollments" element={<AdminRoute><AdminLayout><AdminEnrollments /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/case-studies" element={<AdminRoute><AdminLayout><AdminCaseStudies /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/announcements" element={<AdminRoute><AdminLayout><AdminAnnouncements /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/schools" element={<AdminRoute><AdminLayout><AdminSchools /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/deals" element={<AdminRoute><AdminLayout><AdminDeals /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/system-health" element={<AdminRoute><AdminLayout><AdminSystemHealth /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/logo-generator" element={<AdminRoute><AdminLayout><LogoGenerator /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/qa-checklist" element={<AdminRoute><DemoQAChecklist /></AdminRoute>} />

                    {/* School admin routes */}
                    <Route path="/school-admin" element={<SchoolAdminRoute><SchoolAdminLayout><SchoolDashboard /></SchoolAdminLayout></SchoolAdminRoute>} />
                    <Route path="/school-admin/students" element={<SchoolAdminRoute><SchoolAdminLayout><SchoolStudents /></SchoolAdminLayout></SchoolAdminRoute>} />
                    <Route path="/school-admin/skills" element={<SchoolAdminRoute><SchoolAdminLayout><SchoolSkills /></SchoolAdminLayout></SchoolAdminRoute>} />
                    <Route path="/school-admin/reports" element={<SchoolAdminRoute><SchoolAdminLayout><SchoolReports /></SchoolAdminLayout></SchoolAdminRoute>} />
                    <Route path="/school-admin/settings" element={<SchoolAdminRoute><SchoolAdminLayout><SchoolSettings /></SchoolAdminLayout></SchoolAdminRoute>} />

                    {/* Enterprise admin routes */}
                    <Route path="/enterprise-admin" element={<EnterpriseAdminRoute><EnterpriseDashboard /></EnterpriseAdminRoute>} />
                    <Route path="/enterprise-admin/learners" element={<EnterpriseAdminRoute><EnterpriseLearners /></EnterpriseAdminRoute>} />
                    <Route path="/enterprise-admin/progress" element={<EnterpriseAdminRoute><EnterpriseProgress /></EnterpriseAdminRoute>} />
                    <Route path="/enterprise-admin/reports" element={<EnterpriseAdminRoute><EnterpriseReports /></EnterpriseAdminRoute>} />
                    <Route path="/enterprise-admin/settings" element={<EnterpriseAdminRoute><EnterpriseSettings /></EnterpriseAdminRoute>} />
                    {/* Catch all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
