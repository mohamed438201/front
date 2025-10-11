import React, { useEffect, useRef, useState } from "react";

// مكون لإضافة روابط Bootstrap و Font Awesome إلى رأس الصفحة
const PageSetup = () => {
  useEffect(() => {
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
    bootstrapCSS.integrity = 'sha384-dpuaG1suU0eT09tx5plTaGMLBsfDL8K8WxRb8GERTgbNFRoP/EnnZIrZTplbX7qK';
    bootstrapCSS.crossOrigin = 'anonymous';
    document.head.appendChild(bootstrapCSS);

    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(fontAwesome);
    
    const bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    bootstrapJS.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
    bootstrapJS.crossOrigin = 'anonymous';
    document.body.appendChild(bootstrapJS);

    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);
  return null;
};


// ====================================================================
// 1. المكونات الفرعية (مبنية باستخدام كلاسات Bootstrap)
// ====================================================================

const Navbar = ({ onNavLinkClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <a className="navbar-brand d-flex align-items-center gap-2" href="#home" onClick={(e) => onNavLinkClick(e, 'home')}>
                    <img src="https://sadq.rf.gd/assets/uploads/logo1.png" alt="شعار صادق" style={{height: '40px'}}/>
                    <strong>صادق</strong>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#home" onClick={(e) => onNavLinkClick(e, 'home')}>الرئيسية</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about" onClick={(e) => onNavLinkClick(e, '#about')}>حول المنصة</a></li>
                        <li className="nav-item"><a className="nav-link" href="#features" onClick={(e) => onNavLinkClick(e, '#features')}>المزايا</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact" onClick={(e) => onNavLinkClick(e, '#contact')}>اتصل بنا</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const HeroSection = ({ onSearch, isSearching, query, setQuery }) => (
    <section className="hero-section d-flex align-items-center" id="home">
        <div className="container text-center">
            <h1 className="hero-title">صادق: بوصلتك نحو الحقيقة</h1>
            <p className="hero-subtitle mx-auto">نستخدم الذكاء الاصطناعي للتحقق من الأخبار والمعلومات، ونقدم لك إجابات دقيقة مدعومة بمصادر رسمية وموثوقة.</p>
            <div className="search-wrapper mx-auto">
                <h2 className="search-heading">اسأل بذكاء، واحصل على إجابة موثوقة</h2>
                <form onSubmit={onSearch} className="search-form">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="مثال: هل تم إلغاء الدراسة غداً بسبب الطقس؟" value={query} onChange={(e) => setQuery(e.target.value)} required disabled={isSearching} />
                        <button type="submit" className="btn btn-primary" disabled={isSearching}>
                            {isSearching ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="fas fa-search"></i>}
                            <span className="ms-2">{isSearching ? 'جارٍ البحث...' : 'تحقق الآن'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
);

const AboutSection = () => (
    <section className="section-padding" id="about">
        <div className="container">
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <div className="about-content">
                        <span className="section-tag">من نحن؟</span>
                        <h2 className="section-title">منصة موثوقة تابعة لوزارة الصحة المصرية</h2>
                        <p className="section-description">"صادق" هي مبادرة رسمية تهدف إلى مكافحة انتشار المعلومات الخاطئة والشائعات. باستخدام أحدث تقنيات الذكاء الاصطناعي، نقوم بتحليل الأخبار والبيانات ونتحقق من صحتها عبر مقارنتها بقواعد بياناتنا المحدثة باستمرار من المصادر الرسمية.</p>
                        <ul className="list-unstyled features-list mt-4">
                            <li><i className="fas fa-check-circle text-success me-2"></i> تحليل ذكي وسريع للمعلومات.</li>
                            <li><i className="fas fa-check-circle text-success me-2"></i> ربط مباشر مع قواعد البيانات الرسمية.</li>
                            <li><i className="fas fa-check-circle text-success me-2"></i> تقديم إجابات واضحة ومصادر موثوقة.</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop" className="img-fluid rounded-4 shadow-lg" alt="طبيبة تستخدم جهاز لوحي للتحقق من المعلومات" />
                </div>
            </div>
        </div>
    </section>
);

const FeaturesSection = () => (
    <section className="section-padding bg-light" id="features">
        <div className="container">
            <div className="text-center section-header">
                <span className="section-tag">لماذا صادق؟</span>
                <h2 className="section-title">مزايا تجعلنا خيارك الأول</h2>
            </div>
            <div className="row g-4">
                <div className="col-md-4"><div className="card feature-card h-100"><div className="card-body"><div className="feature-icon"><i className="fas fa-robot"></i></div><h3 className="card-title mt-4">الذكاء الاصطناعي</h3><p className="card-text">تحليل دقيق للغة لفهم سياق الخبر وكشف التضليل.</p></div></div></div>
                <div className="col-md-4"><div className="card feature-card h-100"><div className="card-body"><div className="feature-icon"><i className="fas fa-bolt"></i></div><h3 className="card-title mt-4">سرعة فائقة</h3><p className="card-text">نتائج موثوقة خلال ثوانٍ معدودة لاتخاذ قرارات سريعة.</p></div></div></div>
                <div className="col-md-4"><div className="card feature-card h-100"><div className="card-body"><div className="feature-icon"><i className="fas fa-certificate"></i></div><h3 className="card-title mt-4">موثوقية عالية</h3><p className="card-text">كل إجابة مدعومة بمصادر رسمية يمكنك الرجوع إليها.</p></div></div></div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="footer text-white" id="contact">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-5"><h3 className="footer-title">صادق</h3><p>منصة رسمية تابعة لوزارة الصحة المصرية للتحقق من الأخبار والمعلومات.</p><div className="social-links mt-4"><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a><a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a><a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a></div></div>
                <div className="col-lg-3 col-md-6"><h3 className="footer-title">روابط هامة</h3><ul className="list-unstyled footer-links"><li><a href="#home">الرئيسية</a></li><li><a href="#about">حول المنصة</a></li><li><a href="/report">الإبلاغ عن خبر</a></li><li><a href="/privacy">سياسة الخصوصية</a></li></ul></div>
                <div className="col-lg-4 col-md-6"><h3 className="footer-title">اتصل بنا</h3><ul className="list-unstyled contact-list"><li><i className="fas fa-phone-alt"></i><span>16000</span></li><li><i className="fas fa-envelope"></i><span>info@sadeq.gov.eg</span></li><li><i className="fas fa-map-marker-alt"></i><span>القاهرة، وزارة الصحة المصرية</span></li></ul></div>
            </div>
            <div className="footer-bottom text-center pt-4 mt-4"><p>&copy; 2025 جميع الحقوق محفوظة لمنصة صادق - وزارة الصحة المصرية.</p></div>
        </div>
    </footer>
);

const AiSearchResultsPage = ({ result, onBack, isSearching }) => (
    <main className="results-page">
        <div className="container">
            {isSearching ? (
                <div className="card text-center searching-state"><div className="card-body"><div className="spinner-border" role="status"></div><h3 className="mt-4">جارٍ البحث والتحليل...</h3><p className="text-muted">نستخدم الذكاء الاصطناعي لفهم سؤالك والبحث في قاعدة بياناتنا لإيجاد إجابة دقيقة.</p></div></div>
            ) : (
                <>
                    <button onClick={onBack} className="btn btn-outline-primary btn-back mb-4"><i className="fas fa-arrow-right me-2"></i> طرح سؤال جديد</button>
                    {result && result.answer ? (
                        <div className="card results-card">
                            <div className="card-body">
                                <h3 className="card-title"><i className="fas fa-magic-wand-sparkles me-2"></i> إجابة صادق</h3>
                                <p className="answer-text">{result.answer}</p>
                                {result.references && Array.isArray(result.references) && result.references.length > 0 && (
                                    <div className="references-section mt-4 pt-4 border-top">
                                        <h4><i className="fas fa-book-open me-2"></i> المصادر الرسمية</h4>
                                        <ul className="list-group list-group-flush">
                                            {result.references.map((ref, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span>{ref.title}</span>
                                                    {ref.url && ref.url !== '#' && (<a href={ref.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light">عرض المصدر</a>)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="card no-results-card text-center"><div className="card-body"><i className="fas fa-search-minus display-4 text-warning mb-3"></i><h3>لم يتم العثور على نتيجة</h3><p className="text-muted">لم نتمكن من العثور على خبر مطابق. قد يكون الخبر غير متوفر أو يمكنك محاولة صياغة السؤال بشكل مختلف.</p><a href="/report" className="btn btn-warning mt-3"><i className="fas fa-flag me-2"></i> الإبلاغ عن خبر مفقود</a></div></div>
                    )}
                </>
            )}
        </div>
    </main>
);

// ====================================================================
// 2. المكون الرئيسي (App)
// ====================================================================

export default function App() {
    const [page, setPage] = useState('home');
    const [query, setQuery] = useState('');
    const [aiSearchResult, setAiSearchResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim() || isSearching) return;
        setIsSearching(true); setPage('results');
        try {
            const response = await fetch(`https://sadq-proxy.pes450569.workers.dev/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setAiSearchResult(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAiSearchResult({ answer: null, references: [] });
        } finally {
            setIsSearching(false);
        }
    };
    
    const handleNavLinkClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetId === 'home') {
            setPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (targetElement) {
            if(page !== 'home') {
                setPage('home');
                setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth' }), 100);
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // لإغلاق القائمة المنسدلة في الموبايل بعد الضغط
        const navbarCollapse = document.querySelector('#navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            new window.bootstrap.Collapse(navbarCollapse).hide();
        }
    };
    
    return (
        <>
            <PageSetup />
            <CustomStyles />
            <Navbar onNavLinkClick={handleNavLinkClick} />
            <div style={{ display: page === 'home' ? 'block' : 'none' }}>
                <HeroSection onSearch={handleSearch} isSearching={isSearching} query={query} setQuery={setQuery} />
                <main>
                  <AboutSection />
                  <FeaturesSection />
                </main>
                <Footer />
            </div>
            <div style={{ display: page === 'results' ? 'block' : 'none' }}>
                <AiSearchResultsPage result={aiSearchResult} onBack={() => setPage('home')} isSearching={isSearching} />
            </div>
        </>
    );
}

// ====================================================================
// 3. التنسيقات المخصصة (CSS) فوق Bootstrap
// ====================================================================

const CustomStyles = () => (
  <style>{`
    :root {
      --primary-color: #1e3c72;
      --secondary-color: #2a5298;
      --dark-color: #111827;
      --light-bg-color: #f8f9fa;
      --bs-primary-rgb: 30, 60, 114;
      --bs-body-font-family: 'Cairo', sans-serif;
    }
    body {
        padding-top: 82px; /* For fixed navbar */
    }
    h1, h2, h3, h4, h5, h6, .navbar-brand strong {
        font-weight: 800 !important;
        color: var(--dark-color);
    }
    .section-padding { padding: 100px 0; }
    
    /* --- Navbar Customization --- */
    .navbar { transition: all 0.3s ease-in-out; background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); }
    .navbar.scrolled { padding-top: 0.75rem; padding-bottom: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .navbar-brand { font-size: 1.5rem; }
    .nav-link { font-weight: 700; color: var(--dark-color); }
    .nav-link:hover { color: var(--primary-color); }

    /* --- Hero Section --- */
    .hero-section { padding: 120px 0; background: linear-gradient(rgba(30, 60, 114, 0.9), rgba(42, 82, 152, 0.9)), url('https://sadq.rf.gd/assets/uploads/banner.png') center/cover no-repeat; color: #fff; }
    .hero-title { font-size: clamp(2.8rem, 5vw, 4rem); font-weight: 800 !important; }
    .hero-subtitle { font-size: 1.25rem; max-width: 700px; opacity: 0.9; }
    .search-wrapper { background: #fff; border-radius: 1rem; padding: 3rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); margin-top: 3rem; max-width: 800px; }
    .search-heading { color: var(--dark-color); }
    .search-form .form-control { padding: 1rem 1.5rem; border-radius: 99px 0 0 99px; border-right: 0; }
    .search-form .btn-primary { padding: 1rem 2rem; border-radius: 0 99px 99px 0; }

    /* --- About & Features --- */
    .section-tag { display: inline-block; background-color: rgba(30, 60, 114, 0.1); color: var(--primary-color); padding: 5px 15px; border-radius: 99px; font-weight: 700; margin-bottom: 1rem; }
    .section-header { margin-bottom: 4rem; }
    .about-content .section-description { font-size: 1.1rem; color: #6b7280; }
    .features-list { font-size: 1.1rem; }
    .feature-card { text-align: center; border: 0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: all 0.3s ease-in-out; }
    .feature-card:hover { transform: translateY(-10px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    .feature-icon { width: 70px; height: 70px; margin: 0 auto; background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)); color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.75rem; }

    /* --- Footer --- */
    .footer { background-color: var(--dark-color); }
    .footer-title { color: #fff; border-bottom: 2px solid var(--primary-color); padding-bottom: 0.75rem; display: inline-block; }
    .footer-links a { color: rgba(255,255,255,0.7); transition: all 0.2s ease; }
    .footer-links a:hover { color: #fff; padding-right: 5px; }
    .contact-list li { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .social-links a { color: #fff; background: rgba(255,255,255,0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
    .social-links a:hover { background: var(--primary-color); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); }

    /* --- Results Page --- */
    .results-page { padding: 60px 0; background-color: #f0f4f8; min-height: 100vh; }
    .btn-back { font-weight: 700; }
    .searching-state, .no-results-card { padding: 4rem; }
  `}</style>
);
