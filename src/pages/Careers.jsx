import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Heart, 
  Smile, 
  Zap, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Search,
  Filter,
  X
} from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    desc: 'Comprehensive medical insurance for you and family, plus mental health support programs.',
    color: 'bg-rose-100 text-rose-700 border-rose-200'
  },
  {
    icon: Zap,
    title: 'Flexible & Hybrid Work',
    desc: 'Work from home options, flexible hours, and modern collaborative office spaces.',
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    icon: Award,
    title: 'Learning & Growth',
    desc: 'Annual learning stipend, mentorship programs, and fast-track career advancement.',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  {
    icon: Smile,
    title: 'Team Celebrations & Perks',
    desc: 'Generous employee gift discounts, birthday treats, and quarterly team retreats.',
    color: 'bg-sky-100 text-sky-700 border-sky-200'
  }
];

const openJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer (React / Next.js)',
    department: 'Engineering',
    location: 'Gurugram (Hybrid)',
    type: 'Full-time',
    experience: '4+ Years',
    desc: 'Build lightning-fast, high-converting storefront experiences and mobile-first web applications for millions of customers.'
  },
  {
    id: 2,
    title: 'Lead Product Designer (UI/UX)',
    department: 'Design',
    location: 'Gurugram / Remote',
    type: 'Full-time',
    experience: '5+ Years',
    desc: 'Craft intuitive, joyful gifting flows, design tokens, micro-interactions, and visual design systems.'
  },
  {
    id: 3,
    title: 'Supply Chain & Cold-Chain Manager',
    department: 'Operations',
    location: 'Bengaluru, KA',
    type: 'Full-time',
    experience: '3+ Years',
    desc: 'Oversee express floral and bakery cold-chain logistics, same-day delivery SLAs, and hub fulfillment networks.'
  },
  {
    id: 4,
    title: 'Brand Marketing Manager',
    department: 'Marketing',
    location: 'Mumbai (Hybrid)',
    type: 'Full-time',
    experience: '3+ Years',
    desc: 'Lead viral festive campaigns, influencer partnerships, and brand storytelling across digital platforms.'
  },
  {
    id: 5,
    title: 'Category Manager - Luxury Floral & Plants',
    department: 'Category Management',
    location: 'Gurugram, HR',
    type: 'Full-time',
    experience: '2+ Years',
    desc: 'Curate luxury botanical collections, partner with international growers, and optimize seasonal product launches.'
  },
  {
    id: 6,
    title: 'Customer Experience Lead',
    department: 'Customer Care',
    location: 'Remote',
    type: 'Full-time',
    experience: '2+ Years',
    desc: 'Ensure 100% customer delight by managing omnichannel support, live resolution teams, and escalation workflows.'
  }
];

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJob, setAppliedJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const departments = ['All', 'Engineering', 'Design', 'Operations', 'Marketing', 'Category Management', 'Customer Care'];

  const filteredJobs = openJobs.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApply = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAppliedJob(null);
    }, 2500);
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-20">
      
      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-amber-50/90 via-rose-50/70 to-orange-50/80 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-b border-rose-200/80 shadow-sm overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-500 mb-6">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-olive-800 font-semibold">Careers</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-rose-600 animate-spin" style={{ animationDuration: '6s' }} />
              Work With Giftora
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
              Shape the Future of <span className="bg-gradient-to-r from-olive-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Online Gifting</span> ✨
            </h1>
            <p className="text-stone-600 text-sm sm:text-base lg:text-lg mt-4 font-normal leading-relaxed">
              Join a team of passionate creators, engineers, floral designers, and logisticians bringing joy to over 10 million celebrations across the globe.
            </p>
          </div>
        </div>
      </div>

      {/* ── Culture & Perks ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Why You’ll Love Working Here
          </h2>
          <p className="text-stone-500 text-sm mt-2 font-sans">
            We empower our people with freedom, ownership, and rewards that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div 
                key={i} 
                className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${b.color} mb-4 shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open Positions Section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
                Current Open Roles ({filteredJobs.length})
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Explore exciting career opportunities across our teams.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search position or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50"
              />
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedDept === dept
                    ? 'bg-olive-600 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <p className="font-bold text-gray-800">No positions found matching your search</p>
                <p className="text-xs text-stone-500 mt-1">Try clearing your filters or searching another keyword.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="group bg-stone-50/70 hover:bg-white rounded-2xl border border-stone-200/90 p-6 transition-all duration-300 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-olive-100 text-olive-800 text-[11px] font-bold">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-gray-900 group-hover:text-olive-750 transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
                      {job.desc}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {job.experience}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setAppliedJob(job)}
                    className="px-5 py-2.5 rounded-full bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all whitespace-nowrap self-start md:self-center"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* ── Application Modal ── */}
      {appliedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in border border-stone-200">
            <button 
              onClick={() => setAppliedJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h3 className="font-display font-extrabold text-2xl text-gray-900">Application Submitted!</h3>
                <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                  Thank you for applying for <strong>{appliedJob.title}</strong>. Our talent team will review your application and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-olive-600 uppercase tracking-wider">Apply For Role</span>
                  <h3 className="font-display font-extrabold text-xl text-gray-900">{appliedJob.title}</h3>
                  <p className="text-xs text-stone-500">{appliedJob.department} • {appliedJob.location}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Resume / LinkedIn Profile URL *</label>
                  <input required type="url" placeholder="https://linkedin.com/in/username" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs shadow-md transition-all mt-2"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
