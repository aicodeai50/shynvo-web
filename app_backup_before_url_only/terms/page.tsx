export const metadata = {
  title: "Terms of Service | Shynvo",
  description: "Terms of Service for using the Shynvo platform.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Legal
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Last updated: March 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-white/80">
          <section>
            <h2 className="text-lg font-semibold text-white">1. About Shynvo</h2>
            <p className="mt-2">
              Shynvo is a multi-environment AI platform designed for learning,
              building, thinking, and skill development across different
              environments such as University, Frontier, Arcade, and others.
            </p>
            <p className="mt-2">
              The platform is continuously evolving, and features may change
              over time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Use of the platform</h2>
            <p className="mt-2">
              By using Shynvo, you agree to use the platform responsibly and
              only for lawful purposes.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>You must not use the platform for illegal activities.</li>
              <li>You must not attempt to break, overload, or disrupt the system.</li>
              <li>You must not abuse, exploit, or misuse AI features.</li>
              <li>You must not upload harmful, malicious, or unsafe content.</li>
            </ul>
            <p className="mt-2">
              We reserve the right to suspend or restrict access if misuse is
              detected.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. AI-generated content</h2>
            <p className="mt-2">
              Shynvo provides AI-generated responses and outputs.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>AI responses may not always be accurate or complete.</li>
              <li>Outputs are for informational and educational purposes.</li>
              <li>You are responsible for how you use the information.</li>
            </ul>
            <p className="mt-2">
              Shynvo is not liable for decisions made based on AI outputs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Accounts</h2>
            <p className="mt-2">
              If you create an account, you are responsible for maintaining its
              security and for all activity under your account.
            </p>
            <p className="mt-2">
              You must provide accurate information. We may suspend accounts
              that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Payments and access</h2>
            <p className="mt-2">
              Some features may require payment.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Payments are processed by third-party providers such as Lemon Squeezy.</li>
              <li>Access may depend on your subscription or purchase.</li>
              <li>Features and pricing may change over time.</li>
            </ul>
            <p className="mt-2">
              Please refer to the Refund &amp; Billing page for details on
              cancellations and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Availability</h2>
            <p className="mt-2">
              We aim to keep Shynvo available at all times, but the service may
              experience downtime, interruptions, updates, modifications, or
              feature removals.
            </p>
            <p className="mt-2">
              We do not guarantee uninterrupted access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Intellectual property</h2>
            <p className="mt-2">
              All content, design, and systems within Shynvo are owned by or
              licensed to us.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>You may not copy, reproduce, or redistribute the platform.</li>
              <li>You may not reverse-engineer or attempt to extract core systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Termination</h2>
            <p className="mt-2">
              We may suspend or terminate access if these Terms are violated,
              the platform is misused, or if required by law.
            </p>
            <p className="mt-2">
              You may stop using the platform at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Limitation of liability</h2>
            <p className="mt-2">
              Shynvo is provided “as is” without guarantees.
            </p>
            <p className="mt-2">
              We are not liable for errors or inaccuracies in AI outputs, loss
              of data, interruptions, or indirect or consequential damages.
            </p>
            <p className="mt-2">
              Use the platform at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">10. Changes to these Terms</h2>
            <p className="mt-2">
              We may update these Terms at any time. Continued use of Shynvo
              means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">11. Contact</h2>
            <p className="mt-2">
              For questions about these Terms, contact:
            </p>
            <p className="mt-2">
              <a
                href="mailto:hi@shynvo.app"
                className="text-white underline underline-offset-4"
              >
                hi@shynvo.app
              </a>
            </p>
            <p className="mt-2">
              We typically respond within 24 hours.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
