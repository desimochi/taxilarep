// app/contact/page.js

export const metadata = {
  title: 'Contact Us | Taxila Business School',
  description: 'Get in touch with Taxila Business School. Call, email, or visit our campus in Jaipur.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Header Banner */}
      {/* Simulating the soft gradient background from the top of your image */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Contact Us
        </h1>
      </div>

      {/* 2. Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Details (Matching your image) */}
          <div className="space-y-8">
            
            {/* Title & Description */}
            <div>
              <div className="inline-block">
                <h2 className="text-3xl font-normal text-slate-900 relative">
                  Get in <span className="font-light">Touch</span>
                </h2>
                {/* The red underline effect */}
                <div className="h-1 w-16 bg-red-600 mt-2"></div>
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Please give us a call, drop us an email or fill out the contact form. We're always here to help and will get back to you as soon as possible.
              </p>
            </div>

            {/* Contact Icons List */}
            <div className="space-y-8 mt-8">
              
              {/* Item 1: Visit Us */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 text-yellow-400">
                    {/* Location Pin Icon */}
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">Visit Us:</h3>
                  <p className="mt-1 text-gray-600">
                    Sector 9, Mandir Marg, Patel Marg, Mansarovar, Jaipur, Rajasthan, India 302020
                  </p>
                </div>
              </div>

              {/* Item 2: Mail Us */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 text-yellow-400">
                    {/* Mail Icon */}
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">Mail Us:</h3>
                  <p className="mt-1 text-gray-600">
                    <a href="mailto:info@taxila.in" className="hover:text-blue-600 transition-colors">info@taxila.in</a>
                  </p>
                </div>
              </div>

              {/* Item 3: Call/WhatsApp Us */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 text-yellow-400">
                    {/* Phone Icon */}
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">Call/WhatsApp Us:</h3>
                  <p className="mt-1 text-gray-600">
                    <a href="tel:+918404040404" className="hover:text-blue-600 transition-colors">+91- 8404040404</a>
                  </p>
                </div>
              </div>

              {/* Item 4: Skype */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 text-yellow-400">
                    {/* Skype S Icon */}
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.9 2C13.5 2 14.1 2 14.7 2.1C14.1 2 13.5 2 12.9 2ZM11.1 22C10.5 22 9.9 22 9.3 21.9C9.9 22 10.5 22 11.1 22ZM22 11.1C22 17.2 17.2 22 11.1 22C10.4 22 9.7 21.9 9 21.8C8 22.5 6.9 23 5.6 23C2.5 23 0 20.5 0 17.4C0 16.1 0.4 14.9 1.1 13.9C1 13.2 1 12.5 1 11.8C1 5.7 5.8 0.9 11.9 0.9C12.6 0.9 13.3 1 14 1.1C15 0.4 16.2 0 17.4 0C20.5 0 23 2.5 23 5.6C23 6.9 22.6 8.1 21.9 9.1C22 9.7 22 10.4 22 11.1ZM17.1 16.5C17.1 13.3 14.7 11.7 12 11.7C9.3 11.7 9 11 9 10.4C9 9.7 9.8 9.2 11 9.2C12.1 9.2 12.8 9.5 13.5 10L14.7 8.3C13.7 7.6 12.4 7.2 11 7.2C8.2 7.2 6.3 8.7 6.3 10.9C6.3 13.6 8.5 14.7 11.1 14.7C14.3 14.7 14.4 15.6 14.4 16C14.4 16.8 13.3 17.4 12 17.4C10.7 17.4 9.6 16.9 8.9 16.2L7.3 18.1C8.4 19.1 10.1 19.6 11.9 19.6C15.2 19.6 17.1 18.1 17.1 16.5Z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">Skype:</h3>
                  <p className="mt-1 text-gray-600">
                    Taxila Business School
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Placeholder for the form (implied by text "fill out the contact form") */}
          <div className="  p-8   flex flex-col justify-center">
            {/* You can implement the actual form here later */}
           <img src="/contact.jpg" alt="Contact us" className="mx-auto" />
          </div>

        </div>
      </div>
    </main>
  );
}