import { PublicHeader } from "@/components/layout/PublicHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service | Next Billion Lab"
        description="Terms of Service for Next Billion Lab - AI Entrepreneurship Academy for Young Founders"
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="border-border/50">
            <CardContent className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
              <p className="text-muted-foreground mb-8">Last updated: December 2025</p>

              <div className="prose prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using Next Billion Lab ("the Platform"), you agree to be bound by these Terms of Service.
                    If you are registering on behalf of a minor (under 18 years of age), you confirm that you are the parent
                    or legal guardian of the minor and have the authority to bind them to these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">2. Parental Consent for Minors</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Platform is designed for students aged 9-16. By registering a minor for our programs:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                    <li>You confirm you are the parent or legal guardian of the student</li>
                    <li>You consent to your child's participation in our educational programs</li>
                    <li>You consent to the collection of limited personal information as described in our Privacy Policy</li>
                    <li>You agree to supervise your child's use of AI tools as appropriate for their age</li>
                    <li>You acknowledge that students may create and publish projects as part of the curriculum</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">3. Educational Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Next Billion Lab provides online entrepreneurship education including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                    <li>Live virtual classes with instructors</li>
                    <li>Self-paced curriculum and missions</li>
                    <li>AI-powered coaching and feedback</li>
                    <li>Project-based learning experiences</li>
                    <li>Certifications upon completion</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">4. AI Tools and Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our curriculum teaches students to use various AI tools including ChatGPT, Claude, Lovable, Canva, and others.
                    These are third-party services with their own terms of service. We recommend parental guidance when students
                    use external AI tools, especially for younger age groups (9-11).
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">5. User Content and Projects</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Students create projects, pitch decks, apps, and other content as part of the curriculum. Students retain
                    ownership of their original ideas and creations. By participating, you grant Next Billion Lab a license to
                    showcase anonymized or first-name-only student work for educational and promotional purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">6. Payment and Refunds</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Paid programs require payment in full or via approved installment plans. Refunds are available within
                    14 days of enrollment if the student has completed less than 25% of the curriculum. Contact
                    support@nextbillionlab.com for refund requests.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">7. Code of Conduct</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Students and guardians agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                    <li>Treat instructors, mentors, and fellow students with respect</li>
                    <li>Not share login credentials with others</li>
                    <li>Not use the platform for any illegal or harmful purposes</li>
                    <li>Report any concerning behavior to our team</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Next Billion Lab provides educational services and cannot guarantee specific outcomes such as business
                    success, revenue, or college admissions. We are not liable for any business decisions made based on
                    skills learned in our programs.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">9. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update these terms from time to time. Continued use of the platform after changes constitutes
                    acceptance of the new terms. Material changes will be communicated via email to registered users.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">10. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these terms, contact us at:<br />
                    Email: legal@nextbillionlab.com<br />
                    Or through our support channels on the platform.
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
