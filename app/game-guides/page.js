// pages/pdf-viewer.js (or app/pdf-viewer/page.js for App Router)
"use client"
import React, { useState } from 'react';

const PDFViewer = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  // PDF files in your public folder - update these paths according to your actual files
  const pdfFiles = [
    {
      name: 'Sector Shaker Guide',
      url: '/sector.pdf', // File should be at public/sample1.pdf
      description: 'Faculty Guide for Sector Shaker'
    },
    {
      name: 'Last City Guide',
      url: '/lastcitypdf.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Last City Game'
    },
    {
      name: 'Netritva Guide',
      url: '/netritva.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Netritva Game'
    },
    {
      name: 'Project Management Guide',
      url: '/project-managementf.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for project-management Game'
    },
    {
      name: 'Rat Race Guide',
      url: '/rat-race-pdf.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Rat Race Game'
    },
    {
      name: 'Indian Business Strategy Guide',
      url: '/indian-business.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Indian Business Strategy Game'
    },
    {
      name: 'Taxila Ecosystem Guide',
      url: '/taxila-eco.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Taxila Ecosystem Game'
    },
    {
      name: 'Taxila Solve Simulation Guide',
      url: '/taxila-solve.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Taxila Solve Simulation Game'
    },
    {
      name: 'Sariska Hills Guide',
      url: '/sariska-hills.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Sariska Hills Game'
    },
    {
      name: 'Samundra Rakshak Guide',
      url: '/samudra.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Samundra Rakshak Game'
    },
    {
      name: 'Innovation Academy Faculty Manual Guide',
      url: '/innov.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Innovation Academy Faculty Manual'
    },
     {
      name: 'Six Sima Simulation Faculty guide',
      url: '/six-sigms.pdf', // File should be at public/manual.pdf
      description: 'Faculty Guide for Six Sima Simulation Faculty guide'
    }
  ];

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
  };

  const handleDownload = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = pdf.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = (pdf) => {
    window.open(pdf.url, '_blank');
  };

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Game Guides for Faculty</h1>
            {selectedPdf && (
              <button
                onClick={handleClosePdf}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to List</span>
              </button>
            )}
          </div>
          
          {!selectedPdf ? (
            // PDF List View
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pdfFiles.map((pdf, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300"
                >
                  <div className="flex items-start space-x-4">
                    {/* PDF Icon */}
                    <div className="flex-shrink-0">
                      <svg
                        className="w-12 h-12 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* PDF Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
                        {pdf.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {pdf.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handlePdfClick(pdf)}
                          className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openInNewTab(pdf)}
                          className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          Open in Tab
                        </button>
                        <button
                          onClick={() => handleDownload(pdf)}
                          className="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {pdfFiles.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">No PDF files available</p>
                </div>
              )}
            </div>
          ) : (
            // PDF Viewer - Embedded in iframe
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* PDF Viewer Header */}
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedPdf.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedPdf.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openInNewTab(selectedPdf)}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                      title="Open in new tab"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDownload(selectedPdf)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      title="Download PDF"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* PDF Iframe */}
              <div className="relative" style={{ height: '80vh' }}>
                <iframe
                  src={selectedPdf.url}
                  className="w-full h-full border-0"
                  title={selectedPdf.name}
                  loading="lazy"
                >
                  <p className="p-4 text-center text-gray-600">
                    Your browser does not support PDFs. 
                    <a 
                      href={selectedPdf.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      Click here to view the PDF
                    </a>
                  </p>
                </iframe>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
    
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default PDFViewer;