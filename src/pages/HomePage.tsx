import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Star,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sparkles,
  FileText,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pricingToggle, setPricingToggle] = useState<'monthly' | 'annual'>('monthly');
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-white" />,
      title: "All assets in one private vault",
      description: "Organize passwords, accounts, keys, and documents in your encrypted personal vault.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Users className="h-10 w-10 text-white" />,
      title: "Granular beneficiary access",
      description: "Assign view, manage, or emergency rights to family members with full control.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Lock className="h-10 w-10 text-white" />,
      title: "Optional TOTP MFA",
      description: "Add multi-factor authentication when you want it, disable when you don't.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-white" />,
      title: "Audit logs & reminders",
      description: "Complete transparency with activity logs and automated legacy reminders.",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  const features = [
    {
      title: "Digital Asset Vault",
      description: "Store passwords, crypto keys, accounts, and documents with AES-256 encryption at rest and TLS in transit. Search, filter, and tag everything.",
      image: "🔐"
    },
    {
      title: "Legal Documents",
      description: "Upload wills, trusts, and legal papers with versioning, notes, and secure download capabilities.",
      image: "📋"
    },
    {
      title: "Beneficiary Management",
      description: "Assign access rights, set up verification workflows, and send notifications to your chosen heirs.",
      image: "👥"
    },
    {
      title: "Legacy Messages",
      description: "Record video or text messages, schedule delivery by time or verification, with encrypted storage.",
      image: "💬"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Create your vault",
      description: "Set up your secure digital vault in minutes with bank-level encryption."
    },
    {
      number: "2", 
      title: "Add assets & documents",
      description: "Upload passwords, keys, legal documents, and any digital assets you want to protect."
    },
    {
      number: "3",
      title: "Assign beneficiaries & set reminders",
      description: "Choose who gets access to what, and when. Set up automated legacy planning reminders."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      features: [
        "Up to 25 digital assets",
        "2 beneficiaries",
        "Basic document storage (100MB)",
        "Email support",
        "AES-256 encryption",
        "Mobile app access",
        "Export your data anytime"
      ]
    },
    {
      name: "Pro",
      price: { monthly: 9, annual: 84 },
      features: [
        "Unlimited digital assets",
        "5 beneficiaries",
        "Advanced document storage (1GB)",
        "Priority support",
        "TOTP MFA",
        "Audit logs",
        "Legacy message scheduling",
        "Advanced search & tagging"
      ],
      popular: true
    },
    {
      name: "Family",
      price: { monthly: 19, annual: 180 },
      features: [
        "Everything in Pro",
        "Unlimited beneficiaries",
        "Family vault sharing",
        "Document versioning",
        "Advanced role permissions",
        "Phone support",
        "Custom retention policies"
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Finally, a simple way to organize our digital life for our kids. The interface is so intuitive.",
      author: "M.K.",
      role: "Family trustee"
    },
    {
      quote: "As a small business owner, HeirGuard gives me peace of mind about my digital assets and client data.",
      author: "J.R.",
      role: "Small business owner"
    },
    {
      quote: "I recommend HeirGuard to all my estate planning clients. It fills a crucial gap in digital legacy planning.",
      author: "S.L.",
      role: "Estate planning attorney"
    }
  ];

  const faqs = [
    {
      question: "How secure is my data?",
      answer: "Your data is encrypted with AES-256 at rest and TLS in transit. We use industry-standard security practices and never have access to your unencrypted data."
    },
    {
      question: "Is multi-factor authentication required?",
      answer: "No, TOTP MFA is completely optional. You can enable or disable it anytime in your Security settings based on your comfort level."
    },
    {
      question: "How do beneficiaries gain access?",
      answer: "Beneficiaries receive access based on the rules you set - either immediately, after verification, or on scheduled dates. They must verify their identity through our secure process."
    },
    {
      question: "What are the document size limits?",
      answer: "Free accounts can store up to 100MB total, Pro accounts get 1GB, and Family accounts get unlimited storage. Individual files can be up to 50MB each."
    },
    {
      question: "How are legacy messages delivered?",
      answer: "Legacy messages are delivered based on your schedule - either at specific dates or after beneficiary verification. All messages are encrypted until delivery."
    },
    {
      question: "Can I export or delete my data?",
      answer: "Yes, you can export all your data anytime or request complete account deletion. We provide full data portability and respect your right to be forgotten."
    },
    {
      question: "How does billing work?",
      answer: "We use Stripe and PayPal for secure payments. You can cancel anytime with no fees, and we'll export your data before closing your account."
    },
    {
      question: "What support do you offer?",
      answer: "Free users get email support, Pro users get priority email support, and Family users get phone support. We typically respond within 24 hours."
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://heirguard.com/#organization",
                "name": "HeirGuard",
                "url": "https://heirguard.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://heirguard.com/logo.png"
                },
                "description": "Secure digital asset & legacy vault for families and professionals"
              },
              {
                "@type": "Product",
                "@id": "https://heirguard.com/#product",
                "name": "HeirGuard",
                "description": "A private digital-asset & legacy vault that lets you organize passwords, accounts, keys, and legal documents, assign beneficiary access, and schedule legacy messages—securely and simply.",
                "brand": {
                  "@id": "https://heirguard.com/#organization"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "USD",
                  "lowPrice": "0",
                  "highPrice": "19"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Sticky Navbar */}
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'} border-b border-gray-200`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className="relative">
                    <Shield className="h-8 w-8 text-blue-600 transition-all duration-300 group-hover:text-blue-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    HeirGuard
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#security" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  Security
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  FAQ
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button variant="primary" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="primary" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
        </div>
        
            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="space-y-4">
                  <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-white/50 transition-all duration-200">Features</a>
                  <a href="#security" className="block text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-white/50 transition-all duration-200">Security</a>
                  <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-white/50 transition-all duration-200">Pricing</a>
                  <a href="#faq" className="block text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-white/50 transition-all duration-200">FAQ</a>
                  <div className="pt-4 space-y-2">
                    {isAuthenticated ? (
                      <Link to="/dashboard">
                        <Button variant="primary" size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button variant="outline" size="sm" className="w-full mb-2">
                            Sign in
                          </Button>
                        </Link>
                        <Link to="/register">
                          <Button variant="primary" size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Sign up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-lg rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-pink-400/25 to-red-400/25 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div data-animate id="hero-content" className={`text-left transition-all duration-1000 ${visibleElements.has('hero-content') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6 animate-fade-in">
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" style={{animationDuration: '3s'}} />
                  New: Advanced encryption & MFA support
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default">
                    Secure assets.
                  </span>
                  <span className="block bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default" style={{animationDelay: '0.2s'}}>
                    Empower heirs.
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                  The most trusted digital legacy platform. Organize passwords, crypto keys, legal documents, and schedule encrypted messages for your loved ones.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button variant="primary" size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Go to Dashboard</span>
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button variant="primary" size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          <span>Create your vault</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" className="group border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                        <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        <span>Watch demo</span>
                      </Button>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
                    <div className="text-gray-400 text-sm">Families Protected</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                    <div className="text-gray-400 text-sm">Uptime</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="flex items-center justify-center space-x-1 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                      ))}
                    </div>
                    <div className="text-gray-400 text-sm">User Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div data-animate id="hero-visual" className={`relative transition-all duration-1000 ${visibleElements.has('hero-visual') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="relative">
                  {/* Main Dashboard Mockup */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-6 w-6 text-blue-400" />
                        <span className="text-white font-semibold">HeirGuard Dashboard</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Lock className="h-5 w-5 text-green-400" />
                          <span className="text-white text-sm">Banking Passwords</span>
                        </div>
                        <div className="text-green-400 text-xs">Encrypted</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-purple-400" />
                          <span className="text-white text-sm">Family Access</span>
                        </div>
                        <div className="text-purple-400 text-xs">3 Members</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-400" />
                          <span className="text-white text-sm">Legacy Messages</span>
                        </div>
                        <div className="text-blue-400 text-xs">Scheduled</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-xl animate-float">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-xl animate-float" style={{animationDelay: '1s'}}>
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 left-20 w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20" data-animate id="benefits-header">
              <div className={`transition-all duration-1000 ${visibleElements.has('benefits-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Trusted by 1000+ families worldwide
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-relaxed lg:leading-relaxed">
                  Everything you need to protect your digital legacy
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Bank-level security meets family-first design. Your digital assets, safely passed down through generations.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`benefit-${index}`}
                  className={`group relative text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${visibleElements.has(`benefit-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{transitionDelay: `${index * 150}ms`}}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-all duration-700`}></div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                    <div className="w-full h-full bg-white rounded-3xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                        {benefit.icon}
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" style={{animationDelay: '1s'}}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Highlights */}
        <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20" data-animate id="features-header">
              <div className={`transition-all duration-1000 ${visibleElements.has('features-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
                  <Shield className="h-4 w-4 mr-2" />
                  Powerful Features
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Everything you need in one secure vault
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  From digital assets to legal documents, HeirGuard provides enterprise-grade security with family-friendly simplicity.
                </p>
              </div>
            </div>

            <div className="space-y-32">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`feature-${index}`}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 ${visibleElements.has(`feature-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000`}
                  style={{transitionDelay: `${index * 200}ms`}}
                >
                  <div className="flex-1 text-center lg:text-left">
                    <div className="text-8xl mb-8 filter drop-shadow-2xl">{feature.image}</div>
                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {feature.title === 'Digital Asset Vault' && (
                        <>
                          <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">AES-256 Encryption</span>
                          <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">TLS in Transit</span>
                          <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">Smart Tagging</span>
                        </>
                      )}
                      {feature.title === 'Legal Documents' && (
                        <>
                          <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">Version Control</span>
                          <span className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30">Secure Upload</span>
                          <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">Easy Download</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 group">
                      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center">
                        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">{feature.image}</div>
                        <div className="text-center">
                          <h4 className="text-white font-semibold mb-2">Interactive Demo</h4>
                          <p className="text-gray-400 text-sm">Experience {feature.title.toLowerCase()} in action</p>
                          <div className="mt-4 flex justify-center">
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping mx-2" style={{animationDelay: '0.5s'}}></div>
                            <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20" data-animate id="steps-header">
              <div className={`transition-all duration-1000 ${visibleElements.has('steps-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-blue-800 text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Simple 3-Step Process
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  How it works
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get started in minutes with our intuitive setup process. Your digital legacy, secured in three simple steps.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`step-${index}`}
                  className={`text-center group ${visibleElements.has(`step-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}
                  style={{transitionDelay: `${index * 200}ms`}}
                >
                  <div className="relative mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {step.number}
                    </div>
                    {/* Connection line */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 opacity-30"></div>
                    )}
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Hover effect card */}
                  <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <div className="text-sm text-gray-700 font-medium">
                      {index === 0 && "✨ Quick setup in under 2 minutes"}
                      {index === 1 && "🔐 Bank-level encryption for all uploads"}
                      {index === 2 && "👥 Granular access control for each heir"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16" data-animate id="steps-cta">
              <div className={`transition-all duration-1000 ${visibleElements.has('steps-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link to="/register">
                  <Button variant="primary" size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Start your vault today</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section id="security" className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20" data-animate id="security-header">
              <div className={`transition-all duration-1000 ${visibleElements.has('security-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
                  <Lock className="h-4 w-4 mr-2" />
                  Bank-Level Security
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent">
                  Security & Privacy
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Military-grade encryption meets family-first privacy. Your digital legacy, protected with enterprise-level security you can trust.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { text: "AES-256 encryption at rest", icon: <Lock className="h-5 w-5" /> },
                { text: "TLS encryption in transit", icon: <Shield className="h-5 w-5" /> },
                { text: "Optional TOTP multi-factor authentication", icon: <CheckCircle className="h-5 w-5" /> },
                { text: "Role-based access control", icon: <Users className="h-5 w-5" /> },
                { text: "Automatic token rotation", icon: <Sparkles className="h-5 w-5" /> },
                { text: "Rate limiting protection", icon: <Shield className="h-5 w-5" /> },
                { text: "Complete audit logs", icon: <FileText className="h-5 w-5" /> },
                { text: "Privacy-by-design architecture", icon: <Lock className="h-5 w-5" /> },
                { text: "Data export & deletion tools", icon: <Crown className="h-5 w-5" /> },
                { text: "Cookie controls & consent", icon: <CheckCircle className="h-5 w-5" /> }
              ].map((item, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`security-item-${index}`}
                  className={`flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group ${visibleElements.has(`security-item-${index}`) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{transitionDelay: `${index * 50}ms`}}
                >
                  <div className="text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20" data-animate id="security-notice">
              <div className={`transition-all duration-1000 ${visibleElements.has('security-notice') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-12 w-12 text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">GDPR Compliant & Privacy-First</h4>
                  <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                    <strong>Note:</strong> MFA is optional and can be enabled/disabled anytime in Security settings. We believe in giving you complete control over your security preferences.
                  </p>
                  <div className="flex justify-center space-x-6 text-sm">
                    <a href="/privacy" className="text-blue-300 hover:text-blue-200 transition-colors duration-200 hover:underline flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Privacy Policy
                    </a>
                    <a href="/terms" className="text-blue-300 hover:text-blue-200 transition-colors duration-200 hover:underline flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Terms of Service
                    </a>
                    <span className="text-green-300 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      SOC 2 Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Choose the plan that works for your family
              </p>
              
              {/* Pricing Toggle */}
              <div className="mt-8 flex items-center justify-center space-x-4">
                <span className={`text-sm ${pricingToggle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
                <button
                  onClick={() => setPricingToggle(pricingToggle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 bg-blue-600"
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${pricingToggle === 'annual' ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <span className={`text-sm ${pricingToggle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Annual <span className="text-green-600">(Save 20%)</span>
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`relative rounded-lg border ${plan.popular ? 'border-blue-600 shadow-lg' : 'border-gray-200'} p-8`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
          <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price[pricingToggle]}
                      </span>
                      <span className="text-gray-600">/{pricingToggle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                  </div>
                  
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link to="/register">
                      <Button 
                        variant={plan.popular ? "primary" : "outline"} 
                        size="lg" 
                        className="w-full"
                      >
                        Get started
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-500">
              Secure payments via Stripe and PayPal. Cancel anytime with no fees.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                What our users say
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Band */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-8">
              Start safeguarding your legacy today
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                  <Link to="/dashboard">
                  <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                    Go to Dashboard
                    </Button>
                  </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                      Create your vault
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    See live demo
                    </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo & Description */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold">HeirGuard</span>
        </div>
                <p className="text-gray-400 text-sm">
                  Secure assets. Empower heirs. The private digital vault for modern families.
            </p>
          </div>
          
              {/* Product */}
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#features" className="hover:text-white">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                  <li><a href="#security" className="hover:text-white">Security</a></li>
                  <li><a href="/docs" className="hover:text-white">Documentation</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                  <li><a href="/careers" className="hover:text-white">Careers</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="/cookies" className="hover:text-white">Cookie Policy</a></li>
                </ul>
                  </div>
              </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-gray-400">
                © 2024 HeirGuard. All rights reserved.
                  </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-4 md:mt-0">
                <span>🔒 AES-256 Encrypted</span>
                <span>🛡️ SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;