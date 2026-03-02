// app/privacy-policy/page.js

export const metadata = {
  title: 'Privacy Policy | Taxila Business School',
  description: 'Privacy Policy regarding data collection, usage, and protection at Taxila Business School.',
  openGraph: {
    title: 'Privacy Policy | Taxila Business School',
    description: 'Read our latest Privacy Policy updated October 9, 2025.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <header className="bg-slate-900 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ERP Taxila Privacy Policy
          </h1>
          <div className="mt-4 flex items-center text-slate-300 text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last updated: October 9, 2025
          </div>
        </header>

        {/* Content Body */}
        <div className="px-8 py-10 space-y-12 text-gray-700 leading-relaxed">
          
          {/* Section: Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What personal information do we collect?
            </h2>
            <p className="mb-4">
              When registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience. When you voluntarily send us electronic mail, we will keep a record of this information so that we can respond to you.
            </p>
            <p className="mb-6">
              We only collect information from you when you register on our site or fill out a form.
            </p>
            
            {/* DND Disclaimer Box */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800 font-medium">
                    Important Notice regarding Communication
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    In case you have submitted your personal information and contact details, we reserve the rights to call, SMS, Email or WhatsApp about our products and offers, even if your number has DND activated on it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section: Timing */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              When do we collect information?
            </h2>
            <p>
              We collect information from you when you register on our site, subscribe to a newsletter, respond to a survey, fill out a form, use Live Chat or enter information on our site.
            </p>
          </section>

          {/* Section: Usage */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How do we use your information?
            </h2>
            <p className="mb-4">
              We may use the information we collect from you when you register, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
            </p>
            <ul className="grid gap-2 pl-5 list-disc text-gray-600">
              <li>To improve our website in order to serve you better.</li>
              <li>To administer a contest, promotion, survey or other site feature.</li>
              <li>To quickly process your transactions.</li>
              <li>To send periodic emails regarding your order or other products and services.</li>
              <li>To follow up with them after correspondence (live chat, email or phone inquiries).</li>
            </ul>
          </section>

          {/* Section: Protection */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How do we protect your information?
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3 border border-gray-100">
              <p>We do not use vulnerability scanning and/or scanning to PCI standards.</p>
              <p>We use regular Malware Scanning.</p>
              <p>
                We take your privacy seriously and have implemented a variety of security measures to protect your personal information. We use industry-standard security protocols to safeguard your data and prevent unauthorized access, use, or disclosure.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section: Cookies */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How do we use cookies?
            </h2>
            <p className="mb-4 font-medium">We use cookies to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Understand and save user’s preferences for future visits.</li>
              <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. Since each browser is a little different, look at your browser’s Help Menu to learn the correct way to modify your cookies. If you turn cookies off, some features that make your site experience more efficient may not function properly.
            </p>
          </section>

          {/* Section: Third Party & Fair Practice */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Third-Party Behavioral Tracking
              </h2>
              <p className="text-sm">
                It’s also important to note that we allow third-party behavioural tracking to help us understand our website traffic and user engagement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Fair Information Practices
              </h2>
              <p className="text-sm mb-2">Should a data breach occur, we will take the following responsive action:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>We will notify you via email within 7 business days.</li>
                <li>We agree to the Individual Redress Principle (right to pursue enforceable rights against non-compliant data collectors).</li>
              </ul>
            </section>
          </div>

          <hr className="border-gray-200" />

          {/* Footer / Contact Section */}
          <section className="bg-slate-50 rounded-xl p-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contacting Us</h2>
            <p className="mb-6 text-gray-600">
              If there are any questions regarding this privacy policy, you may contact us using the information below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-2">Address</h3>
                <p className="text-gray-700">
                  TAXILA BUSINESS SCHOOL<br />
                  Sector-9, Mandir Marg, Mansarovar,<br />
                  Jaipur (Raj.) 302020
                </p>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-2">Contact Info</h3>
                <div className="space-y-2">
                  <p className="flex items-center justify-center sm:justify-start">
                    <span className="font-medium mr-2">Mobile:</span>
                    <a href="tel:+918404040404" className="text-blue-600 hover:underline">+91-8404040404</a>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start">
                    <span className="font-medium mr-2">Email:</span>
                    <a href="mailto:info@taxila.in" className="text-blue-600 hover:underline">info@taxila.in</a>
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}