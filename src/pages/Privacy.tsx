import { PublicHeader } from "@/components/layout/PublicHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Next Billion Lab"
        description="Privacy Policy for Next Billion Lab - How we protect student data and privacy"
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="border-border/50">
            <CardContent className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">Last updated: December 7, 2024</p>
              
              <div className="prose prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">1. Our Commitment to Student Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Next Billion Lab is committed to protecting the privacy of our students, especially minors. 
                    We comply with applicable data protection laws including COPPA (Children's Online Privacy Protection Act) 
                    and GDPR where applicable. We collect only the minimum data necessary to provide our educational services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
                  
                  <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">From Students:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>First name (required)</li>
                    <li>Age/date of birth (to assign appropriate curriculum track)</li>
                    <li>Email address (for account access)</li>
                    <li>Project work and submissions</li>
                    <li>Progress and completion data</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">From Parents/Guardians:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Relationship to student</li>
                    <li>Payment information (processed securely via Stripe)</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">Automatically Collected:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Device information and browser type</li>
                    <li>Usage patterns within the platform</li>
                    <li>Error logs for technical support</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">3. How We Use Information</h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong>Educational Delivery:</strong> To provide personalized learning experiences</li>
                    <li><strong>Progress Tracking:</strong> To show students and parents their learning progress</li>
                    <li><strong>Communication:</strong> To send important updates about classes, assignments, and the program</li>
                    <li><strong>AI Coaching:</strong> To provide personalized AI-powered feedback and suggestions</li>
                    <li><strong>Improvement:</strong> To improve our curriculum and platform</li>
                    <li><strong>Certification:</strong> To issue completion certificates</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">4. Information We Never Collect or Share</h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>We never sell student data to third parties</li>
                    <li>We never use student data for advertising purposes</li>
                    <li>We never share identifiable student information publicly without consent</li>
                    <li>We do not collect unnecessary sensitive information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">5. Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use trusted third-party services to operate our platform:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li><strong>Supabase:</strong> Secure database hosting</li>
                    <li><strong>Stripe:</strong> Payment processing (PCI compliant)</li>
                    <li><strong>Resend:</strong> Email delivery</li>
                    <li><strong>AI Services:</strong> For AI coaching features (no student data is used to train external AI models)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">6. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure authentication systems</li>
                    <li>Regular security audits</li>
                    <li>Limited employee access to student data</li>
                    <li>Row-level security on all database tables</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">7. Parental Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Parents and guardians have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Review their child's personal information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of their child's account and data</li>
                    <li>Withdraw consent for data collection</li>
                    <li>Receive a copy of their child's data</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    To exercise these rights, contact us at privacy@nextbillionlab.com
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">8. Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain student data for as long as the account is active, plus 2 years for certificate verification 
                    purposes. Upon request, we will delete all personal data within 30 days, except where required by law 
                    to retain certain records.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">9. Cookies and Tracking</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use essential cookies for authentication and platform functionality. We do not use 
                    advertising or tracking cookies. Analytics data is anonymized and used only to improve the platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">10. Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this policy to reflect changes in our practices or for legal reasons. 
                    We will notify registered users of material changes via email.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">11. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For privacy-related inquiries:<br />
                    Email: privacy@nextbillionlab.com<br />
                    <br />
                    Data Protection Officer contact available upon request for institutional partners.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
