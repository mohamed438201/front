import React, { useEffect, useState } from "react";

// ====================================================================
// 1. المكونات الفرعية (معادة البناء بالكامل للتصميم الجديد)
// ====================================================================

const Navbar = ({ onNavLinkClick }) => (
    <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
            <a className="navbar-brand" href="#home" onClick={(e) => onNavLinkClick(e, 'home')}>
                <img src="https://sadq.rf.gd/assets/uploads/logo1.png" alt="شعار صادق" />
                <span>صادق</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span></span><span></span><span></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="#home" onClick={(e) => onNavLinkClick(e, 'home')}>الرئيسية</a></li>
                    <li className="nav-item"><a className="nav-link" href="#about" onClick={(e) => onNavLinkClick(e, '#about')}>عن المنصة</a></li>
                    <li className="nav-item"><a className="nav-link" href="#features" onClick={(e) => onNavLinkClick(e, '#features')}>المزايا</a></li>
                    <li className="nav-item"><a className="nav-link" href="#contact" onClick={(e) => onNavLinkClick(e, '#contact')}>اتصل بنا</a></li>
                </ul>
            </div>
        </div>
    </nav>
);

const HeroSection = ({ onSearch, isSearching, query, setQuery }) => (
    <section className="hero-section" id="home">
        <div className="container text-center">
            <h1 className="hero-title">بوصلتك نحو الحقيقة</h1>
            <p className="hero-subtitle">استخدم قوة الذكاء الاصطناعي للتحقق من الأخبار والمعلومات، واحصل على إجابات دقيقة مدعومة بالمصادر الرسمية.</p>
            <form onSubmit={onSearch} className="search-form">
                <div className="input-group-wrapper">
                    <i className="fas fa-search input-icon"></i>
                    <input type="text" className="form-control" placeholder="اكتب سؤالك أو الخبر هنا..." value={query} onChange={(e) => setQuery(e.target.value)} required disabled={isSearching} />
                    <button type="submit" className="btn btn-primary" disabled={isSearching}>
                        {isSearching ? <span className="spinner-border spinner-border-sm"></span> : <span>تحقق الآن</span>}
                    </button>
                </div>
            </form>
        </div>
    </section>
);

const AboutSection = () => (
    <section className="section-padding" id="about">
        <div className="container">
            <div className="row align-items-center g-5">
                <div className="col-lg-6 order-lg-2">
                    <div className="content-block">
                        <span className="section-tag">من نحن؟</span>
                        <h2 className="section-title">منصة رسمية لمكافحة المعلومات المضللة</h2>
                        <p className="section-description">"صادق" هي مبادرة تابعة لوزارة الصحة المصرية، مصممة لتكون خط الدفاع الأول ضد الشائعات والأخبار الكاذبة. نحن نجمع بين دقة المصادر الحكومية وقوة تحليل الذكاء الاصطناعي لنقدم لك الحقيقة بوضوح وشفافية.</p>
                        <ul className="list-unstyled features-list mt-4">
                            <li><i className="fas fa-check-circle"></i> تحليل ذكي وسريع للمحتوى.</li>
                            <li><i className="fas fa-check-circle"></i> ربط مباشر وموثوق مع قواعد البيانات الرسمية.</li>
                            <li><i className="fas fa-check-circle"></i> تقديم إجابات واضحة مع المصادر للتحقق.</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="image-wrapper">
                      <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop" className="img-fluid" alt="طبيبة تستخدم جهاز لوحي للتحقق من المعلومات" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FeaturesSection = () => (
    <section className="section-padding features-section" id="features">
        <div className="container">
            <div className="text-center section-header">
                <span className="section-tag">لماذا صادق؟</span>
                <h2 className="section-title">منصة متكاملة للموثوقية</h2>
            </div>
            <div className="bento-grid">
                <div className="bento-item item-large">
                    <div className="feature-icon"><i className="fas fa-robot"></i></div>
                    <h3>تحليل ذكي بالذكاء الاصطناعي</h3>
                    <p>نستخدم نماذج لغوية متقدمة لفهم السياق، كشف التناقضات، وتقييم مصداقية المحتوى بدقة تتجاوز الطرق التقليدية.</p>
                </div>
                <div className="bento-item">
                    <div className="feature-icon"><i className="fas fa-bolt"></i></div>
                    <h3>سرعة فائقة</h3>
                    <p>احصل على نتائج التحقق خلال ثوانٍ معدودة.</p>
                </div>
                <div className="bento-item">
                    <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                    <h3>مصادر موثوقة</h3>
                    <p>كل إجابة يتم دعمها بمصادر رسمية ومعتمدة.</p>
                </div>
            </div>
        </div>
    </section>
);

// ... باقي المكونات يمكن إعادة تصميمها بنفس النهج ...

// ====================================================================
// 2. المكون الرئيسي (App)
// ====================================================================

export default function App() {
    // ... (هنا نضع كل الـ State والمنطق البرمجي كما هو)
    const [page, setPage] = useState('home');
    const [query, setQuery] = useState('');
    const [aiSearchResult, setAiSearchResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // نفس دالة البحث السابقة
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
    
    // نفس دالة التنقل السابقة
    const handleNavLinkClick = (e, targetId) => {
      // ... (المنطق هنا لم يتغير)
    };
    
    return (
        <>
            <CustomStyles />
            <Navbar onNavLinkClick={handleNavLinkClick} />
            
            <div className="aurora-background">
                <div className="aurora-shape shape1"></div>
                <div className="aurora-shape shape2"></div>
            </div>

            <main>
                <HeroSection onSearch={handleSearch} isSearching={isSearching} query={query} setQuery={setQuery} />
                <AboutSection />
                <FeaturesSection />
                {/* <Footer /> */}
            </main>
        </>
    );
}

// ====================================================================
// 3. كل التنسيقات الجديدة (CSS)
// ====================================================================

const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700;800&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css');
    
    :root {
      --primary-color: #6d28d9; /* Indigo */
      --secondary-color: #db2777; /* Pink */
      --dark-color: #111827;
      --text-color: #374151;
      --text-muted: #6b7280;
      --bg-color: #f9fafb;
      --bg-glass: rgba(255, 255, 255, 0.5);
      --border-color: rgba(255, 255, 255, 0.7);
      --radius: 1rem;
      --shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.05);
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body {
      font-family: 'Cairo', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      direction: rtl;
      overflow-x: hidden;
    }

    /* Aurora Background Effect */
    .aurora-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }
    .aurora-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(150px);
      opacity: 0.3;
    }
    .aurora-shape.shape1 {
      width: 500px;
      height: 500px;
      background: var(--primary-color);
      top: -150px;
      left: -150px;
      animation: drift 20s infinite alternate linear;
    }
    .aurora-shape.shape2 {
      width: 400px;
      height: 400px;
      background: var(--secondary-color);
      bottom: -100px;
      right: -100px;
      animation: drift 25s infinite alternate linear;
    }
    @keyframes drift {
      from { transform: rotate(0deg) translateX(20px) translateY(20px); }
      to { transform: rotate(360deg) translateX(-20px) translateY(-20px); }
    }

    /* General Styling */
    .section-padding { padding: 120px 0; }
    .section-header { margin-bottom: 4rem; }
    .section-tag { display: inline-block; background: rgba(109, 40, 217, 0.1); color: var(--primary-color); padding: 8px 20px; border-radius: 99px; font-weight: 700; margin-bottom: 1rem; }
    .section-title { font-size: clamp(2rem, 5vw, 2.75rem); font-weight: 800; color: var(--dark-color); }
    .section-description { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; }

    /* Navbar */
    .navbar {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: var(--transition);
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.7);
    }
    .navbar-brand { font-weight: 800; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
    .navbar-brand img { height: 40px; }
    .nav-link { font-weight: 700; color: var(--dark-color) !important; position: relative; }
    .nav-link::after { content: ''; position: absolute; bottom: -5px; right: 0; width: 0; height: 2px; background: var(--primary-color); transition: var(--transition); }
    .nav-link:hover::after { width: 100%; }
    .navbar-toggler { border: none; }
    .navbar-toggler span { background-color: var(--dark-color); display: block; height: 2px; width: 25px; margin: 5px 0; transition: var(--transition); }
    
    /* Hero Section */
    .hero-section {
      min-height: 80vh;
      display: flex;
      align-items: center;
      padding: 120px 0 60px;
    }
    .hero-title {
      font-size: clamp(3rem, 7vw, 5rem);
      font-weight: 800;
      color: var(--dark-color);
      line-height: 1.2;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeInDown 1s ease-out;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      max-width: 650px;
      margin: 1.5rem auto 3rem;
      color: var(--text-muted);
      animation: fadeInUp 1s ease-out 0.3s both;
    }
    .search-form { animation: fadeInUp 1s ease-out 0.6s both; }
    .input-group-wrapper { position: relative; }
    .input-icon { position: absolute; top: 50%; right: 1.5rem; transform: translateY(-50%); color: var(--text-muted); }
    .form-control {
      padding: 1.25rem 3.5rem 1.25rem 1.5rem;
      border-radius: 99px !important;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow);
      font-size: 1.1rem;
    }
    .form-control:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.1);
    }
    .btn-primary {
      position: absolute;
      top: 50%;
      left: 0.5rem;
      transform: translateY(-50%);
      border-radius: 99px !important;
      padding: 0.9rem 1.8rem;
      font-weight: 700;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      border: none;
      transition: var(--transition);
    }
    .btn-primary:hover { transform: translateY(-50%) scale(1.05); }

    /* About Section */
    .image-wrapper { position: relative; }
    .image-wrapper img {
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
    }
    .features-list { font-size: 1.1rem; }
    .features-list li { margin-bottom: 1rem; }
    .features-list i { color: var(--primary-color); }
    
    /* Features Section - Bento Grid */
    .features-section { background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, auto);
      gap: 1.5rem;
    }
    .bento-item {
      background: var(--bg-glass);
      padding: 2rem;
      border-radius: var(--radius);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow);
      transition: var(--transition);
    }
    .bento-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -4px rgba(0,0,0,0.07);
    }
    .bento-item.item-large {
      grid-column: span 2;
      grid-row: span 2;
      padding: 2.5rem;
    }
    .bento-item h3 { margin: 1.5rem 0 0.5rem; font-size: 1.5rem; }
    .bento-item p { color: var(--text-muted); }
    .feature-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      font-size: 1.75rem;
    }
    @media (max-width: 992px) {
      .bento-grid { grid-template-columns: 1fr; }
      .bento-item.item-large { grid-column: span 1; grid-row: span 1; }
    }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }

  `}</style>
);
