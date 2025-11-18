import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  ArrowRight,
  Heart,
  Settings,
  GraduationCap,
  MapPin,
  Shield,
  CheckCircle,
  Award,
  ThumbsUp,
  Map,
  FileText,
  MessageCircle,
  Zap,
  BadgeCheck,
  ShieldCheck,
  BookOpen,
  PhoneCall
} from 'lucide-react'
import ChatWidget from '../../components/Chat/ChatWidget'

const Home = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Healthcare Services",
      description: "Professional medical care, home visits, and health consultations with certified healthcare providers.",
      features: ["Doctor Home Visits", "Telemedicine", "Medical Checkups", "Emergency Care"],
      color: "from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-500/20 to-pink-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1593078166039-c9878df5c520?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Radio & Electronics Repair",
      description: "Expert repair services for radios, audio equipment, and vintage electronics with warranty.",
      features: ["Radio Repair", "Audio Equipment", "Vintage Electronics", "Quick Service"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=400&h=300&fit=crop",
      title: "Home Tuition",
      description: "Personalized academic tutoring and skill development sessions at your convenience.",
      features: ["Academic Subjects", "Test Preparation", "Skill Development", "Flexible Timing"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    }
  ]

  const stats = [
    { number: "5K+", label: "Happy Customers" },
    { number: "50+", label: "Expert Professionals" },
    { number: "24/7", label: "Service Available" },
    { number: "98%", label: "Satisfaction Rate" }
  ]

  const bookingSteps = [
    {
      step: "01",
      title: "Book Service",
      description: "Choose your service and schedule appointment online or by phone"
    },
    {
      step: "02",
      title: "Expert Visit",
      description: "Our certified professional visits your location at scheduled time"
    },
    {
      step: "03",
      title: "Quality Service",
      description: "Receive professional service with guaranteed satisfaction"
    },
    {
      step: "04",
      title: "Support",
      description: "24/7 customer support and service warranty included"
    }
  ]

  // New Sections Data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "Healthcare",
      rating: 5,
      text: "The doctor arrived within 30 minutes when my father had an emergency. Professional and caring service!",
      avatar: "https://images.unsplash.com/photo-1755519024827-fd05075a7200?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Mike Chen",
      service: "Radio Repair",
      rating: 5,
      text: "Fixed my vintage radio that no one else could repair. Excellent work and reasonable pricing!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Priya Patel",
      service: "Home Tuition",
      rating: 5,
      text: "My daughter's math grades improved from C to A in just 2 months. The tutor was amazing!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]

  const teamMembers = [
    {
      name: "Dr. Robert Davis",
      role: "Senior Healthcare Provider",
      experience: "15+ years",
      specialty: "Emergency Medicine",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Lisa Wong",
      role: "Electronics Specialist",
      experience: "12+ years",
      specialty: "Vintage Electronics",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "David Miller",
      role: "Head Tutor",
      experience: "10+ years",
      specialty: "STEM Subjects",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    }
  ]

  const serviceAreas = [
    "Downtown District", "Northside", "South Park", "Eastwood", "West Hills", 
    "Riverside", "Mountain View", "Lakefront", "City Center", "Suburban Areas"
  ]

  const faqs = [
    {
      question: "How quickly can you respond to emergency healthcare calls?",
      answer: "We guarantee response within 30 minutes for emergency healthcare services in our service area."
    },
    {
      question: "Do you offer warranty on radio repairs?",
      answer: "Yes, all our repair services come with a 90-day warranty on parts and labor."
    },
    {
      question: "What subjects do you cover in home tuition?",
      answer: "We cover all major academic subjects from K-12, plus test preparation and college-level courses."
    },
    {
      question: "Are your service providers certified and background checked?",
      answer: "Absolutely! All our professionals are certified, licensed, and undergo thorough background checks."
    }
  ]

  const pricing = [
    {
      service: "Healthcare Consultation",
      price: "$99",
      duration: "per visit",
      features: ["Doctor Home Visit", "Basic Checkup", "Prescription", "Follow-up Call"]
    },
    {
      service: "Radio Repair",
      price: "$49",
      duration: "starting from",
      features: ["Diagnosis", "Basic Repairs", "90-day Warranty", "Parts Included"]
    },
    {
      service: "Home Tuition",
      price: "$35",
      duration: "per hour",
      features: ["Certified Tutor", "Customized Lessons", "Progress Reports", "Flexible Scheduling"]
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Custom styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
          }
          33% { 
            transform: translateY(-20px) translateX(10px) rotate(120deg) scale(1.1); 
          }
          66% { 
            transform: translateY(10px) translateX(-10px) rotate(240deg) scale(0.9); 
          }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.3);
          }
        }
        @keyframes subtle-bounce {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes icon-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float 15s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-subtle-bounce {
          animation: subtle-bounce 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-icon-pulse {
          animation: icon-pulse 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .backdrop-blur-glass {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .backdrop-blur-dark {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .semi-circle {
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .icon-container {
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
        }
      `}</style>

      
      
      {/* Emergency Banner */}
<section 
  id="emergency"
  ref={(el) => (sectionRefs.current.emergency = el)}
  className="relative bg-gradient-to-r from-red-400 via-red-500 to-pink-500 text-white py-2"
>
  <div className="container mx-auto px-4 text-center">
    <div className="flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-4">
      <div className="flex items-center space-x-2">
        <Zap className="h-3 w-3 animate-pulse" />
        <span className="font-bold text-sm">24/7 Emergency Services Available</span>
      </div>
      <div className="flex items-center space-x-2">
        <a href="tel:5551234567" className="bg-white text-red-500 font-medium py-1 px-3 rounded-full hover:bg-red-50 transition-all duration-300 flex items-center space-x-1 text-xs">
          <PhoneCall className="h-3 w-3" />
          <span>Call Now: (555) 123-4567</span>
        </a>
      </div>
    </div>
  </div>
</section>

{/* Hero Section */}
<section 
  id="hero"
  ref={(el) => (sectionRefs.current.hero = el)}
  className="relative bg-gradient-to-br from-purple-900 via-black to-white text-white py-16 lg:py-24 overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-black/80 to-white/10"></div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Your Local
          <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient">
            Service Partner
          </span>
        </h1>
        <p className="text-xl text-purple-100 leading-relaxed">
          Professional healthcare, electronics repair, and home tuition services at your doorstep. 
          Serving our community with trust and excellence since 2010.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/book" 
            className="bg-gradient-to-r from-white to-purple-100 text-purple-900 font-semibold py-3 px-6 rounded-xl shadow-2xl flex items-center justify-center space-x-2 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
              <Calendar className="h-5 w-5" />
              <span>Book Service</span>
            </div>
          </Link>
          <button className="border-2 border-white/80 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center space-x-2 backdrop-blur-glass transition-all duration-300 hover:scale-105 hover:bg-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </div>
          </button>
        </div>
        <div className="flex items-center space-x-4 text-sm text-purple-200">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Serving Local Community</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>24/7 Emergency Services</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="backdrop-blur-glass rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:rotate-1">
          <div className="overflow-hidden rounded-2xl w-full h-64 bg-gradient-to-br from-purple-700/90 to-black/90 relative shadow-2xl shadow-purple-500/50">
            <img 
              src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Community Services" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-purple-900/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-2 drop-shadow-lg">5K+ Happy Customers</div>
                <div className="text-sm opacity-90 drop-shadow-md">Trusted Local Services</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-2xl shadow-purple-500/70 animate-glow">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">5K+ Customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Stats Section */}
      <section 
        id="stats"
        ref={(el) => (sectionRefs.current.stats = el)}
        className="bg-gradient-to-r from-gray-900 via-black to-blue-900 py-12 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-gradient">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services"
        ref={(el) => (sectionRefs.current.services = el)}
        className="bg-gradient-to-b from-gray-900 via-black to-blue-900 py-16 lg:py-24 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional, reliable, and affordable services for all your needs. 
              We bring expertise right to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="transition-all duration-500 hover:scale-105 hover:-translate-y-4"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="group relative overflow-hidden bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-blue-500/20 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image Section - Replaced Icons with Images */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="flex-1">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl mt-4 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center justify-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
                        <span>Book Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="process"
        ref={(el) => (sectionRefs.current.process = el)}
        className="py-16 lg:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-gradient">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Simple 4-step process to get the service you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group transition-all duration-500 hover:scale-110 hover:-translate-y-2"
              >
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-glow">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Testimonials Section */}
      <section
        id="testimonials"
        ref={(el) => (sectionRefs.current.testimonials = el)}
        className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-gradient">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-purple-300">{testimonial.service}</span>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Service Areas Section */}
      {/*<section
        id="areas"
        ref={(el) => (sectionRefs.current.areas = el)}
        className="py-16 lg:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Service Areas
            </h2>
            <p className="text-xl text-gray-300">
              We proudly serve these local communities
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {serviceAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <div className="flex items-center justify-center space-x-2 text-blue-300">
                  <Map className="h-5 w-5" />
                  <span className="font-semibold">Covering 20+ mile radius from city center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* NEW: Pricing Section */}
      <section
        id="pricing"
        ref={(el) => (sectionRefs.current.pricing = el)}
        className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              No hidden fees - know exactly what you're paying for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.service}</h3>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">{plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Team Section */}
      <section
        id="team"
        ref={(el) => (sectionRefs.current.team = el)}
        className="py-16 lg:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Meet Our Experts
            </h2>
            <p className="text-xl text-gray-300">
              Certified professionals dedicated to serving you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-pink-500/30"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-purple-300 mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm mb-1">Experience: {member.experience}</p>
                <p className="text-gray-400 text-sm">Specialty: {member.specialty}</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <BadgeCheck className="h-5 w-5 text-blue-400" />
                  <ShieldCheck className="h-5 w-5 text-green-400" />
                  <Award className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: FAQ Section */}
      <section
        id="faq"
        ref={(el) => (sectionRefs.current.faq = el)}
        className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-300 pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section
  id="cta"
  ref={(el) => (sectionRefs.current.cta = el)}
  className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 py-16 lg:py-24 overflow-hidden border-t border-gray-200"
>
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="absolute -top-48 -left-48 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl animate-float"></div>
  <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gray-300/40 rounded-full blur-3xl animate-float-delay"></div>
  <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gray-100/60 rounded-full blur-3xl animate-float-slow"></div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Need Professional Service Today?
      </h2>
      <p className="text-xl text-gray-700 leading-relaxed">
        Join thousands of satisfied customers who trust us for their healthcare, 
        electronics repair, and tutoring needs. Quick, reliable, and affordable.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/book"
          className="bg-gradient-to-r from-gray-900 to-black text-white font-semibold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
            <Calendar className="h-5 w-5" />
            <span>Book Service Now</span>
          </span>
        </Link>
        <Link
          to="/contact"
          className="border-2 border-gray-800 text-gray-900 font-medium py-3 px-6 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center space-x-2 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
            <Phone className="h-5 w-5" />
            <span>Call: (555) 123-4567</span>
          </span>
        </Link>
      </div>
      <div className="text-gray-600 text-sm flex items-center justify-center">
        <Shield className="h-4 w-4 mr-2 text-gray-700" />
        All services include satisfaction guarantee and warranty
      </div>
    </div>
  </div>
</section>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default Home