import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Shield, Brain, Users, Newspaper, Phone, Mail, MapPin, Menu, X, ArrowRight, CheckCircle, Star } from "lucide-react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'team', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => setAlert({ show: false, message: '' }), 4500);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;
    setIsSearching(true);
    setPage('results');
    try {
      const workerUrl = 'https://sadq-proxy.pes450569.workers.dev';
      const response = await fetch(`${workerUrl}/api/search?q=${encodeURIComponent(query)}`);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format. Expected JSON.");
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Mock result for demo
      setAiSearchResult({
        answer: `تم العثور على معلومات حول "${query}". صادق هي منصة رائدة في تقديم الأخبار الموثوقة والدقيقة باستخدام تقنيات الذكاء الاصطناعي الحديثة. نحن نضمن لك أعلى مستويات الجودة والدقة في جميع المعلومات المقدمة.`,
        source: 'database',
        references: {
          'https://example.com': 'المصدر الرسمي لصادق - الأخبار الموثوقة'
        }
      });
    } catch (error) {
      console.error('Error fetching data from API:', error);
      showAlert('حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSearching(false);
    }
  };

  const [aiSearchResult, setAiSearchResult] = useState(null);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-white border-t-transparent rounded-full mx-auto mb-8"
          />
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            جاري تحميل صادق...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const teamMembers = [
    { name: "محمد شريف", role: "مؤسس ومطور", image: "https://placehold.co/400x400/1e3c72/white?text=MS" },
    { name: "أحمد علي", role: "مدير تقني", image: "https://placehold.co/400x400/2a5298/white?text=AA" },
    { name: "سارة محمد", role: "مصممة UX/UI", image: "https://placehold.co/400x400/1e3c72/white?text=SM" },
    { name: "خالد حسن", role: "خبير ذكاء اصطناعي", image: "https://placehold.co/400x400/2a5298/white?text=KH" }
  ];

  const blogPosts = [
    { title: "كيف يغير الذكاء الاصطناعي عالم الأخبار؟", date: "15 مارس 2024", excerpt: "استكشاف أحدث التقنيات التي تستخدمها منصات الأخبار الحديثة..." },
    { title: "أهمية التحقق من المصادر في العصر الرقمي", date: "10 مارس 2024", excerpt: "دليل شامل للتمييز بين الأخبار الموثوقة والمزيفة..." },
    { title: "صادق تحصل على جائزة الابتكار الحكومي", date: "5 مارس 2024", excerpt: "تم تكريم منصتنا من قبل وزارة الاتصالات المصرية..." }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Alert */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md"
          >
            <div className="flex items-center gap-2">
              <X className="w-5 h-5" />
              <span>{alert.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => { e.preventDefault(); setPage('home'); window.scrollTo(0, 0); }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                صادق
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['home', 'about', 'services', 'team', 'blog', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`font-medium transition-colors ${
                    activeSection === item ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item === 'home' && 'الرئيسية'}
                  {item === 'about' && 'من نحن'}
                  {item === 'services' && 'الخدمات'}
                  {item === 'team' && 'الفريق'}
                  {item === 'blog' && 'المدونة'}
                  {item === 'contact' && 'اتصل بنا'}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4"
              >
                <div className="flex flex-col gap-4 pt-4 border-t">
                  {['home', 'about', 'services', 'team', 'blog', 'contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      className="font-medium text-gray-700 hover:text-blue-600 py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item === 'home' && 'الرئيسية'}
                      {item === 'about' && 'من نحن'}
                      {item === 'services' && 'الخدمات'}
                      {item === 'team' && 'الفريق'}
                      {item === 'blog' && 'المدونة'}
                      {item === 'contact' && 'اتصل بنا'}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full mb-6"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">منصة رسمية تابعة للحكومة المصرية</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                منصة <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">صادق</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
                ابحث عن الأخبار والمعلومات بثقة باستخدام تقنيات الذكاء الاصطناعي المتقدمة
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="ابحث عن أي خبر أو معلومة..."
                      className="flex-1 bg-transparent px-6 py-4 text-white placeholder-blue-200 focus:outline-none"
                      disabled={isSearching}
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSearching ? (
                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          ابحث
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">
                من نحن
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed">
                منصة صادق هي مبادرة حكومية مصرية رائدة تهدف إلى توفير معلومات وأخبار موثوقة ودقيقة باستخدام أحدث تقنيات الذكاء الاصطناعي والتحقق من المصادر.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: Brain, title: "الذكاء الاصطناعي", desc: "نستخدم تقنيات الذكاء الاصطناعي المتقدمة للتحقق من صحة المعلومات وتحليل المصادر" },
                { icon: Shield, title: "الموثوقية", desc: "جميع المعلومات تخضع لعملية تحقق صارمة من قبل فريق متخصص لضمان الدقة والموثوقية" },
                { icon: Zap, title: "السرعة", desc: "احصل على إجابات فورية ودقيقة لأسئلتك في ثوانٍ معدودة" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">
                خدماتنا
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed">
                نقدم مجموعة شاملة من الخدمات المصممة لتلبية احتياجاتك في الحصول على المعلومات الدقيقة والموثوقة
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { title: "البحث الذكي", desc: "ابحث عن أي معلومة باستخدام لغتك الطبيعية واحصل على إجابات دقيقة ومفصلة" },
                { title: "التحقق من الأخبار", desc: "تحقق من صحة أي خبر أو معلومة تنتشر على وسائل التواصل الاجتماعي" },
                { title: "تحليل المصادر", desc: "تحليل شامل لمصادر المعلومات لتحديد موثوقيتها ومصداقيتها" },
                { title: "تقارير مخصصة", desc: "احصل على تقارير مفصلة حول أي موضوع مع تحليل شامل للمصادر" },
                { title: "تنبيهات فورية", desc: "تلقى تنبيهات فورية عند ظهور معلومات جديدة حول المواضيع التي تهتم بها" },
                { title: "دعم فني", desc: "دعم فني متاح على مدار الساعة لمساعدتك في استخدام المنصة" }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">
                فريق العمل
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed">
                خلف كل نجاح عظيم فريق عمل متميز ومتفاني في تحقيق الأهداف
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-2xl mx-auto object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">
                المدونة والأخبار
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed">
                ابقَ على اطلاع دائم بأحدث التطورات والأخبار من خلال مدونتنا الرسمية
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                  <div className="p-6">
                    <div className="text-blue-600 text-sm font-medium mb-2">{post.date}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-blue-600 font-medium group"
                      whileHover={{ x: 4 }}
                    >
                      اقرأ المزيد
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">
                تواصل معنا
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed">
                نحن هنا لمساعدتك والإجابة على جميع استفساراتك
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { icon: Phone, title: "الهاتف", info: "16000", desc: "خدمة عملاء متاحة 24/7" },
                { icon: Mail, title: "البريد الإلكتروني", info: "info@sadeq.gov.eg", desc: "رد خلال 24 ساعة" },
                { icon: MapPin, title: "المقر", info: "القاهرة، مصر", desc: "الجمهورية العربية المصرية" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-xl font-bold text-blue-600 mb-2">{contact.info}</p>
                  <p className="text-gray-600">{contact.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">صادق</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                منصة رسمية تابعة للحكومة المصرية تهدف إلى توفير معلومات وأخبار موثوقة ودقيقة باستخدام أحدث تقنيات الذكاء الاصطناعي.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {['الرئيسية', 'من نحن', 'الخدمات', 'الفريق'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">الخدمات</h4>
              <ul className="space-y-3">
                {['البحث الذكي', 'التحقق من الأخبار', 'تحليل المصادر', 'تقارير مخصصة'].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{service}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 جميع الحقوق محفوظة - المنصة الرسمية للحكومة المصرية</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
