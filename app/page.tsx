'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaHandshake,
} from 'react-icons/fa';

interface Partner {
  id: number;
  companyLogo: string;
  studentPhoto: string;
  studentName: string;
  role: string;
  linkedIn: string;
  batch: string;
}

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeBatch, setActiveBatch] = useState<string>('All');
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleHover = () => setExpanded(true);
  const handleLeave = () => setExpanded(false);

  useEffect(() => {
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    const line = timelineRef.current?.querySelector('.timeline-line');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(timelineItems || []).indexOf(entry.target as Element);
            const height = (index / (timelineItems?.length || 1)) * 100;
            if (line) {
              (line as HTMLElement).style.height = `${height}%`;
              (line as HTMLElement).style.transition = 'height 1s ease-out';
            }
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineItems?.forEach((item) => observer.observe(item));

    return () => {
      timelineItems?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const partners: Partner[] = [
    {
      id: 1,
      companyLogo: '/google.png',
      studentPhoto: '/student1.jpg',
      studentName: 'Roshan',
      role: 'SDE @ Google',
      linkedIn: 'https://linkedin.com/in/anjali-sharma',
      batch: '2023-2027',
    },
    {
      id: 2,
      companyLogo: '/microsoft.webp',
      studentPhoto: '/student2.jpg',
      studentName: 'Neeraj',
      role: 'Data Analyst @ Microsoft',
      linkedIn: 'https://linkedin.com/in/rohan-mehta',
      batch: '2023-2027',
    },
    {
      id: 3,
      companyLogo: '/amazon.png',
      studentPhoto: '/student1.jpg',
      studentName: 'Pratik',
      role: 'SDE @ Google',
      linkedIn: 'https://linkedin.com/in/anjali-sharma',
      batch: '2024-2028',
    },
    {
      id: 4,
      companyLogo: '/flipkart.png',
      studentPhoto: '/student1.jpg',
      studentName: 'Esha',
      role: 'SDE @ Google',
      linkedIn: 'https://linkedin.com/in/anjali-sharma',
      batch: '2025-2029',
    },
    {
      id: 5,
      companyLogo: '/oracle.png',
      studentPhoto: '/james gosling.jpeg',
      studentName: 'James Ghosling',
      role: 'SDE @ Oracle',
      linkedIn: 'https://www.linkedin.com/in/jamesgosling/',
      batch: '2026-2030',
    },
  ];

  const filteredPartners =
    activeBatch === 'All'
      ? partners
      : partners.filter((partner) => partner.batch === activeBatch);

  const batches = ['All', '2023-2027', '2024-2028', '2025-2029', '2026-2030'];

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-[#1e2028] to-[#001f4d] border-b-2 border-[#5f6b78] py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/PW.jpg"
            alt="PW Logo"
            className="rounded-full w-[60px] h-[60px] object-cover"
          />
          <span className="text-white font-bold text-xl">PW Institute of Innovation</span>
        </div>
        <button
          className="px-6 py-2 rounded-md bg-[#001f3f] text-white font-semibold transition-all duration-300 hover:bg-slate-200 hover:text-[#001f3f] hover:shadow-[0_0_15px_rgba(192,192,192,0.8)]"
        >
          Login
        </button>
      </nav>

      {/* Video Banner */}
      <div className="relative w-full h-screen">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60 -z-10"
        >
          <source src="/bg video.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h3 className="text-3xl sm:text-5xl font-bold text-[#163363] drop-shadow-[0_1px_3px_rgba(100,100,100,0.8)] hover:underline underline-offset-2 transition-all duration-100">
            PhysicsWallah Institute of Innovation
          </h3>
          <p className="text-lg sm:text-2xl text-[#16305b] font-medium drop-shadow-[0_1px_3px_rgba(100,100,100,0.8)] hover:underline underline-offset-4 transition-all duration-300 mt-2">
            Innovation Begins Here
          </p>
        </div>
      </div>

      {/* Social Bar */}
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 transition-all duration-400 z-50 ${expanded ? 'bg-[#001f3f] p-3 rounded-l-xl' : 'p-3 rounded-full bg-[#001f3f]'
          } border border-white shadow-lg flex flex-col gap-3 items-center justify-center`}
      >
        {!expanded && <FaHandshake className="text-white text-xl" />}
        {expanded && (
          <>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition">
              <FaLinkedin />
            </a>
            <a href="mailto:your-email@gmail.com" className="text-white hover:scale-110 transition">
              <FaEnvelope />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition">
              <FaYoutube />
            </a>
          </>
        )}
      </div>

      {/* Why Hire From Us Section */}
<section className="py-20 bg-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-16">Why Top Companies Hire From PW Institute</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Card 1 - Industry-Aligned Curriculum */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="bg-[#001f3f] w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#001f3f] mb-3">Industry-Aligned Curriculum</h3>
        <p className="text-gray-700">
          Our courses are co-created with industry leaders from Google, Microsoft, and Amazon. Students work on real-world projects from day one, making them job-ready.
        </p>
      </div>

      {/* Card 2 - 100% Merit-Based */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="bg-[#001f3f] w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#001f3f] mb-3">100% Merit-Based</h3>
        <p className="text-gray-700">
          We operate on a strict no-quota, no-payment policy to companies. Every hire is based purely on student talent and capability - we never pay for placements.
        </p>
      </div>

      {/* Card 3 - Soft Skills Focus */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="bg-[#001f3f] w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#001f3f] mb-3">Soft Skills Excellence</h3>
        <p className="text-gray-700">
          Beyond technical skills, we train students in communication, leadership, and teamwork through mandatory courses and weekly mock interviews.
        </p>
      </div>

      {/* Card 4 - Verified Talent Pool */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="bg-[#001f3f] w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#001f3f] mb-3">Verified Talent Pool</h3>
        <p className="text-gray-700">
          Our rigorous assessment system includes weekly coding tests, project evaluations, and industry certifications - so you only see the best candidates.
        </p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="mt-16 bg-[#001f3f] rounded-xl p-8 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold mb-2">100%</div>
          <div className="text-gray-300">Merit-Based Placements</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">250+</div>
          <div className="text-gray-300">Hiring Partners</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">94%</div>
          <div className="text-gray-300">Placement Rate</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">0</div>
          <div className="text-gray-300">Placement Fees</div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#001f3f] mb-6">Our Placement Partners</h2>

        {/* Batch Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-gray-200">
            {batches.map((batch) => (
              <button
                key={batch}
                onClick={() => setActiveBatch(batch)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeBatch === batch
                    ? 'bg-[#001f3f] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {batch}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="relative group bg-white p-4 rounded-full shadow-md w-[180px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setHovered(partner.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={partner.companyLogo}
                  alt="Company"
                  className="h-14 mx-auto transition-transform duration-300 group-hover:scale-110"
                />

                {/* Student Info Popup */}
                <div className={`absolute -top-28 left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-3 shadow-xl w-[180px] transition-all duration-300 ${hovered === partner.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}>
                  <a
                    href={partner.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={partner.studentPhoto}
                      alt={partner.studentName}
                      className="w-14 h-14 rounded-full mx-auto border-2 border-[#001f3f] object-cover shadow-md"
                    />
                  </a>
                  <div className="mt-2 text-sm space-y-1">
                    <h6 className="font-bold text-[#001f3f]">{partner.studentName}</h6>
                    <p className="text-gray-600">{partner.role}</p>
                    <p className="text-xs text-gray-500 font-medium">{partner.batch} Batch</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 py-10 col-span-full">
              No placements found for {activeBatch} batch
            </div>
          )}
        </div>
      </section>
    
       {/* Roadmap Section */}
<section className="py-20 bg-white" ref={timelineRef}>
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-16">
      Our Placement Process
    </h2>

    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 h-0 w-1 bg-gray-300 transform -translate-x-1/2 timeline-line"></div>

      {/* Timeline items */}
      <div className="space-y-16">
        {/* Step 1 */}
        <div className="relative w-full flex justify-between items-center timeline-item">
          <div className="w-full md:w-[45%] p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#001f3f] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Company Outreach</h3>
                <p className="text-gray-700">
                  Our admin team proactively reaches out to top companies to establish placement partnerships and discuss potential opportunities.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex w-[10%] justify-center">
            <div className="w-5 h-5 rounded-full bg-[#001f3f]"></div>
          </div>
          <div className="hidden md:block w-[45%]"></div>
        </div>

        {/* Step 2 */}
        <div className="relative w-full flex justify-between items-center timeline-item ">
          <div className="hidden md:block w-[45%]"></div>
          <div className="hidden md:flex w-[10%] justify-center">
            <div className="w-5 h-5 rounded-full bg-[#001f3f]"></div>
          </div>
          <div className="w-full md:w-[45%] p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#001f3f] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Opportunity Discussion</h3>
                <p className="text-gray-700">
                  Companies share job descriptions, requirements, and compensation details with our placement team for evaluation and approval.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative w-full flex justify-between items-center timeline-item ">
          <div className="w-full md:w-[45%] p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#001f3f] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Opportunity Posting</h3>
                <p className="text-gray-700">
                  Approved opportunities are posted on the student dashboard with clear eligibility criteria and application deadlines.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex w-[10%] justify-center">
            <div className="w-5 h-5 rounded-full bg-[#001f3f]"></div>
          </div>
          <div className="hidden md:block w-[45%]"></div>
        </div>

        {/* Step 4 */}
        <div className="relative w-full flex justify-between items-center timeline-item ">
          <div className="hidden md:block w-[45%]"></div>
          <div className="hidden md:flex w-[10%] justify-center">
            <div className="w-5 h-5 rounded-full bg-[#001f3f]"></div>
          </div>
          <div className="w-full md:w-[45%] p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#001f3f] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Student Applications</h3>
                <p className="text-gray-700">
                  Eligible students apply through the portal with their resumes, portfolios, and other required documents for consideration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="relative w-full flex justify-between items-center timeline-item">
          <div className="w-full md:w-[45%] p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#001f3f] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Application Review</h3>
                <p className="text-gray-700">
                  Companies review applications and schedule interviews with shortlisted candidates through our platform.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex w-[10%] justify-center">
            <div className="w-5 h-5 rounded-full bg-[#001f3f]"></div>
          </div>
          <div className="hidden md:block w-[45%]"></div>
        </div>

        {/* Step 6 */}
        <div className="relative w-full flex justify-between items-center timeline-item">
          <div className="hidden md:block w-[45%]"></div>
          <div className="hidden md:flex w-[10%] justify-center">
            <div className="w-5 h-5 rounded-full bg-[#001f3f]"></div>
          </div>
          <div className="w-full md:w-[45%] p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#001f3f] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1">
                6
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Final Decision</h3>
                <p className="text-gray-700">
                  Students receive acceptance/rejection notifications via email with constructive feedback when available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Founders Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-16">Our Visionary Founders</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Founder 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 group">
          <img 
            src="/founder1.jpg" 
            alt="Alakh Pandey" 
            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#001f3f] transition-all duration-300"></div>
        </div>
        <h3 className="text-2xl font-bold text-[#001f3f] mb-2">Alakh Pandey</h3>
        <p className="text-lg text-gray-600 mb-4">Founder & CEO</p>
        <p className="text-gray-700 max-w-md">
          "Our vision is to create an ecosystem where talent meets opportunity without barriers. 
          We're building India's most student-centric institution where innovation and industry needs converge."
        </p>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          className="mt-4 inline-flex items-center text-[#001f3f] hover:text-blue-700 transition-colors"
        >
          <FaLinkedin className="mr-2" /> Connect on LinkedIn
        </a>
      </div>

      {/* Founder 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 group">
          <img 
            src="/founder2.jpg" 
            alt="Prateek Maheshwari" 
            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#001f3f] transition-all duration-300"></div>
        </div>
        <h3 className="text-2xl font-bold text-[#001f3f] mb-2">Prateek Maheshwari</h3>
        <p className="text-lg text-gray-600 mb-4">Co-Founder</p>
        <p className="text-gray-700 max-w-md">
          "We're committed to 100% merit-based placements. Our industry partnerships ensure students 
          get real-world exposure from day one, bridging the gap between academia and industry."
        </p>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          className="mt-4 inline-flex items-center text-[#001f3f] hover:text-blue-700 transition-colors"
        >
          <FaLinkedin className="mr-2" /> Connect on LinkedIn
        </a>
      </div>
    </div>
  </div>
</section>

{/* FAQ Section */}
<section className="py-20 bg-white">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-16">Frequently Asked Questions</h2>
    
    <div className="space-y-6">
      {/* FAQ Item 1 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
          <h3 className="text-xl font-semibold text-[#001f3f]">Are these placements really 100% free for students?</h3>
          <svg className="w-6 h-6 text-[#001f3f] transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="px-6 pb-6 pt-0 text-gray-700">
          <p className="mt-2">
            Absolutely! We have a strict no-placement-fee policy. Our revenue model is based on tuition fees only. 
            Companies pay us for accessing top talent, not the students. This is clearly mentioned in all our student agreements.
          </p>
        </div>
      </div>

      {/* FAQ Item 2 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
          <h3 className="text-xl font-semibold text-[#001f3f]">How do you ensure the quality of placements?</h3>
          <svg className="w-6 h-6 text-[#001f3f] transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="px-6 pb-6 pt-0 text-gray-700">
          <p className="mt-2">
            We have a dedicated placement cell that verifies each company's credentials, job roles, and compensation packages before allowing them to participate. 
            Our alumni network also provides real feedback about their experiences with these companies.
          </p>
        </div>
      </div>

      {/* FAQ Item 3 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
          <h3 className="text-xl font-semibold text-[#001f3f]">What's the average placement package?</h3>
          <svg className="w-6 h-6 text-[#001f3f] transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="px-6 pb-6 pt-0 text-gray-700">
          <p className="mt-2">
            For our 2023 batch, the average package was ₹12.5 LPA, with the highest at ₹42 LPA. However, we emphasize that quality of role and growth opportunities 
            matter more than just the starting compensation.
          </p>
        </div>
      </div>

      {/* FAQ Item 4 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
          <h3 className="text-xl font-semibold text-[#001f3f]">Can international students participate in placements?</h3>
          <svg className="w-6 h-6 text-[#001f3f] transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="px-6 pb-6 pt-0 text-gray-700">
          <p className="mt-2">
            Yes, we have specific placement drives for international students. Many of our partner companies offer global positions and sponsorship for work visas. 
            Our career services team provides specialized support for visa processes and international relocation.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Interactive Footer */}
<footer className="bg-gradient-to-r from-[#1e2028] to-[#001f4d] text-white pt-16 pb-8">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div>
        <img src="/PW.jpg" alt="PW Logo" className="h-16 mb-4" />
        <p className="mb-4">Innovating education to create industry-ready professionals.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            <FaYoutube size={20} />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-300 transition-colors">Placement Statistics</a></li>
          <li><a href="#" className="hover:text-blue-300 transition-colors">Our Recruiters</a></li>
          <li><a href="#" className="hover:text-blue-300 transition-colors">Student Testimonials</a></li>
          <li><a href="#" className="hover:text-blue-300 transition-colors">Upcoming Drives</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <FaEnvelope className="mr-2" /> placements@pwi.edu
          </li>
          <li>+91 98765 43210</li>
          <li>PW Tower, Sector 62, Noida, UP</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
        <p className="mb-4">Get updates on placement opportunities</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your email" 
            className="px-4 py-2 w-full rounded-l-md text-gray-800 focus:outline-none"
          />
          <button className="bg-[#001f3f] px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p>© 2023 PW Institute of Innovation. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-blue-300 transition-colors">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}
