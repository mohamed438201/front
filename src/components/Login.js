import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Toaster, toast } from 'react-hot-toast';

const API_BASE = "https://sadq-proxy.pes450569.workers.dev";

// -------------------------------------------------------------------
// --- المكونات الفرعية (تم نقلها للخارج وتطبيق التصميم الجديد) ---
// -------------------------------------------------------------------

const LoginForm = ({ loginData, setLoginData, login, isLoading, error, setError }) => (
  <div className="d-flex justify-content-center align-items-center vh-100 p-4 font-sans text-right">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-3 shadow p-5 w-100" // استخدمنا كلاس card الافتراضي
      style={{ maxWidth: '450px' }}
    >
      <div className="position-relative">
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fs-1 mb-3 mx-auto logo-icon"
          >
            <i className="fas fa-shield-alt"></i>
          </motion.div>
          <h1 className="h3 fw-bold text-dark-blue-900 mb-2">نظام صادق المتقدم</h1>
          <p className="text-muted">لوحة التحكم الإدارية الذكية</p>
        </div>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="alert alert-danger d-flex align-items-center gap-2"
            >
              <div><i className="fas fa-exclamation-triangle"></i></div>
              <div className="flex-grow-1">
                <p className="mb-0"> {error}</p>
              </div>
              <button onClick={() => setError('')} className="btn-close"></button>
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={login} className="mt-4">
          <div className="mb-3">
            <label className="form-label fw-medium text-muted-dark">رقم الموظف أو البريد الإلكتروني</label>
            <input
              type="text"
              value={loginData.employee_id}
              onChange={(e) => setLoginData({ ...loginData, employee_id: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium text-muted-dark">كلمة المرور</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 custom-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner-border spinner-border-sm"></span> : <i className="fas fa-sign-in-alt"></i>}
            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  </div>
);

const LoadingOverlay = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(249, 250, 251, 0.7)', zIndex: 9999 }}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="h5 fw-bold text-dark-blue-900 mt-2">جاري التحميل...</p>
      </div>
    </div>
);

const NewsForm = ({ title, formData, setFormData, onSubmit, isAdding, onCancel }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4 p-md-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold text-dark-blue-900 d-flex align-items-center gap-2">
          <i className={isAdding ? "fas fa-plus-circle" : "fas fa-edit"}></i>{title}
        </h2>
        <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onCancel} className="btn btn-light rounded-circle">
          <i className="fas fa-times"></i>
        </motion.button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3"><label className="form-label">عنوان الخبر</label><input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required /></div>
        <div className="mb-3"><label className="form-label">وصف الخبر</label><textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="form-control" required></textarea></div>
        <div className="mb-3"><label className="form-label">رابط الصورة (اختياري)</label><input type="url" name="url" value={formData.url} onChange={handleChange} className="form-control" /></div>
        <div className="form-check mb-4"><input type="checkbox" name="status" checked={formData.status} onChange={handleChange} className="form-check-input" id="newsStatusCheck" /><label className="form-check-label ms-2" htmlFor="newsStatusCheck">نشر الخبر</label></div>
        <div className="d-flex gap-3 mt-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn flex-grow-1 custom-btn-primary">{isAdding ? 'إضافة الخبر' : 'تحديث الخبر'}</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={onCancel} className="btn btn-light flex-grow-1">إلغاء</motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const DashboardView = ({ stats, recentLogs, loadDashboardData }) => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold text-dark-blue-900">لوحة التحكم</h2>
        <motion.button whileHover={{ scale: 1.05, rotate: 180 }} onClick={loadDashboardData} className="btn btn-light rounded-circle" title="تحديث"><i className="fas fa-sync-alt"></i></motion.button>
      </div>
      <div className="row g-4">
        {/* Stat Cards */}
        {[
          { icon: 'fas fa-users', title: 'إجمالي الموظفين', value: stats?.total_employees || 0 },
          { icon: 'fas fa-newspaper', title: 'إجمالي الأخبار', value: stats?.total_news || 0 },
          { icon: 'fas fa-key', title: 'سجل الدخول', value: stats?.total_login_logs || 0 }
        ].map((stat, index) => (
          <div key={index} className="col-md-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="card p-4 h-100">
              <div className="d-flex align-items-center gap-3"><div className="logo-icon fs-4"><i className={stat.icon}></i></div><div><h3 className="h6 text-muted mb-0">{stat.title}</h3></div></div>
              <div className="h2 fw-bold text-dark-blue-900 mt-3">{stat.value}</div>
            </motion.div>
          </div>
        ))}
        {/* Charts and Logs */}
        <div className="col-lg-7"><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="card p-4 h-100"><h3 className="h5 fw-bold mb-3">تحليلات النظام</h3><div style={{ height: '300px' }}><ResponsiveContainer width="100%" height="100%"><BarChart data={[{ name: 'الموظفين', value: stats?.total_employees || 0 }, { name: 'الأخبار', value: stats?.total_news || 0 }, { name: 'الدخول', value: stats?.total_login_logs || 0 }]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="var(--primary-color)" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></motion.div></div>
        <div className="col-lg-5"><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="card p-4 h-100"><h3 className="h5 fw-bold mb-3">أحدث تسجيلات الدخول</h3><div className="list-group list-group-flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>{recentLogs.length > 0 ? recentLogs.slice(0, 5).map((log, i) => <div key={i} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0"><div className="d-flex align-items-center gap-2"><i className={`fas ${log.success ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`}></i><div><p className="fw-medium mb-0">{log.employee_id}</p><p className="text-muted small mb-0">{new Date(log.created_at).toLocaleString('ar-EG')}</p></div></div><span className="badge bg-light text-dark">{log.ip_address}</span></div>) : <p>لا توجد سجلات.</p>}</div></motion.div></div>
      </div>
    </div>
);

const NewsManagementView = ({ newsData, setCurrentView, loadNewsForEdit, confirmDeleteNews }) => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold text-dark-blue-900">إدارة الأخبار</h2>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentView('add-news')} className="btn custom-btn-primary"><i className="fas fa-plus me-2"></i>إضافة خبر</motion.button>
      </div>
      <div className="card p-3">
        {newsData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless text-right align-middle">
              <thead><tr><th>العنوان</th><th>الوصف</th><th>الحالة</th><th className="text-center">الإجراءات</th></tr></thead>
              <tbody>{newsData.map((news) => <tr key={news.id}><td>{news.title}</td><td className="text-truncate" style={{ maxWidth: '300px' }}>{news.description}</td><td><span className={`badge ${news.status === 1 ? 'bg-success' : 'bg-warning'}`}>{news.status === 1 ? 'منشور' : 'مسودة'}</span></td><td><div className="d-flex justify-content-center gap-2"><button onClick={() => loadNewsForEdit(news.id)} className="btn btn-sm btn-outline-secondary rounded-circle"><i className="fas fa-edit"></i></button><button onClick={() => confirmDeleteNews(news.id)} className="btn btn-sm btn-outline-danger rounded-circle"><i className="fas fa-trash-alt"></i></button></div></td></tr>))}</tbody>
            </table>
          </div>
        ) : <p className="text-center p-4">لا توجد أخبار حالياً.</p>}
      </div>
    </div>
);

// ... باقي المكونات مثل ReportsView و Modals بنفس الطريقة ...

// -------------------------------------------------------------
// --- المكون الرئيسي App (يحتوي على الحالة والمنطق فقط) ---
// -------------------------------------------------------------

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // مخصص لنموذج الدخول فقط
  const [loginData, setLoginData] = useState({ employee_id: '', password: '' });
  const [newNews, setNewNews] = useState({ title: '', description: '', url: '', status: true });
  const [editNews, setEditNews] = useState(null);
  const [reportsData, setReportsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, newsRes, reportsRes] = await Promise.all([
        fetch(`${API_BASE}/sadik/admin-dashboard`),
        fetch(`${API_BASE}/sadik/news`),
        fetch(`${API_BASE}/admin/reports`)
      ]);
      const statsData = await statsRes.json();
      const newsData = await newsRes.json();
      const reportsData = await reportsRes.json();
      setStats(statsData.stats || {});
      setRecentLogs(statsData.recent_logs || []);
      setNewsData(newsData.news || []);
      setReportsData(reportsData.reports || []);
    } catch (err) {
      toast.error('فشل في تحميل بيانات لوحة التحكم.');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const params = new URLSearchParams(loginData).toString();
      const response = await fetch(`${API_BASE}/sadik/login?${params}`);
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('employee_data', JSON.stringify(data.employee));
        setEmployeeData(data.employee);
        setIsLoggedIn(true);
        setCurrentView('dashboard');
        await fetchData();
        toast.success(`أهلاً بك، ${data.employee.name}`);
      } else {
        setError(data.message || 'فشل تسجيل الدخول');
      }
    } catch (err) {
      setError('خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('employee_data');
    setIsLoggedIn(false);
    setEmployeeData(null);
    setCurrentView('login');
  };
  
  const addNews = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('جاري إضافة الخبر...');
    try {
        const payload = { ...newNews, employee_id: employeeData?.employee_id, status: newNews.status ? 1 : 0 };
        const params = new URLSearchParams(payload).toString();
        const response = await fetch(`${API_BASE}/sadik/add-news?${params}`);
        const data = await response.json();
        if (data.success) {
            toast.success('تمت إضافة الخبر بنجاح!', { id: toastId });
            setNewNews({ title: '', description: '', url: '', status: true });
            setCurrentView('news');
            await fetchData();
        } else {
            toast.error(data.message || 'فشل إضافة الخبر', { id: toastId });
        }
    } catch (err) {
        toast.error('خطأ في الاتصال بالخادم', { id: toastId });
    }
  };

  const updateNews = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('جاري تحديث الخبر...');
    try {
      const payload = { news_id: editNews.id, title: editNews.title, description: editNews.description, url: editNews.url, status: editNews.status ? 1 : 0 };
      const params = new URLSearchParams(payload).toString();
      const response = await fetch(`${API_BASE}/sadik/update-news?${params}`);
      const data = await response.json();
      if (data.success) {
        toast.success('تم تحديث الخبر بنجاح!', { id: toastId });
        setEditNews(null);
        setCurrentView('news');
        await fetchData();
      } else {
        toast.error(data.message || 'فشل تحديث الخبر', { id: toastId });
      }
    } catch (err) {
        toast.error('خطأ في الاتصال بالخادم', { id: toastId });
    }
  };

  const confirmDeleteNews = (newsId) => {
    setItemToDelete(newsId);
    setShowConfirmModal(true);
  };

  const executeDeleteNews = async () => {
    setShowConfirmModal(false);
    if (!itemToDelete) return;
    const toastId = toast.loading('جاري حذف الخبر...');
    try {
      const params = new URLSearchParams({ news_id: itemToDelete }).toString();
      const response = await fetch(`${API_BASE}/sadik/delete-news?${params}`);
      const data = await response.json();
      if (data.success) {
        toast.success(data.message, { id: toastId });
        await fetchData();
      } else {
        toast.error(data.message || 'فشل حذف الخبر', { id: toastId });
      }
    } catch (err) {
      toast.error('خطأ في الاتصال بالخادم', { id: toastId });
    } finally {
      setItemToDelete(null);
    }
  };

  const loadNewsForEdit = async (newsId) => {
    const newsItem = newsData.find(n => n.id === newsId);
    if (newsItem) {
      setEditNews({ ...newsItem, status: newsItem.status === 1 });
      setCurrentView('edit-news');
    } else {
      toast.error('لم يتم العثور على الخبر');
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('employee_data');
    if (savedData) {
      setEmployeeData(JSON.parse(savedData));
      setIsLoggedIn(true);
      setCurrentView('dashboard');
      fetchData();
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView stats={stats} recentLogs={recentLogs} loadDashboardData={fetchData} />;
      case 'news': return <NewsManagementView newsData={newsData} setCurrentView={setCurrentView} loadNewsForEdit={loadNewsForEdit} confirmDeleteNews={confirmDeleteNews} />;
      case 'add-news': return <NewsForm title="إضافة خبر جديد" formData={newNews} setFormData={setNewNews} onSubmit={addNews} isAdding={true} onCancel={() => setCurrentView('news')} />;
      case 'edit-news': return <NewsForm title="تعديل الخبر" formData={editNews} setFormData={setEditNews} onSubmit={updateNews} isAdding={false} onCancel={() => setCurrentView('news')} />;
      // case 'reports': return <ReportsView ... />;
      default: return <DashboardView stats={stats} recentLogs={recentLogs} loadDashboardData={fetchData} />;
    }
  };

  if (!isLoggedIn) {
    return (
        <>
            <Toaster position="bottom-center" />
            <LoginForm loginData={loginData} setLoginData={setLoginData} login={login} isLoading={isLoading} error={error} setError={setError} />
            <GlobalStyles />
        </>
    );
  }
  
  return (
    <>
      <Toaster position="bottom-center" />
      {isLoading && <LoadingOverlay />}
      <div className="min-vh-100 font-sans text-right">
        <header className="bg-white sticky-top shadow-sm py-3">
          <div className="container-fluid px-4 px-md-5">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3"><div className="logo-icon"><i className="fas fa-shield-alt"></i></div><div><h1 className="h5 fw-bold text-dark-blue-900 mb-0">نظام صادق</h1><p className="text-muted small mb-0">لوحة التحكم</p></div></div>
              <div className="d-flex align-items-center gap-3"><div className="text-end d-none d-md-block"><div className="fw-bold">{employeeData?.name}</div><div className="small text-muted">{employeeData?.role}</div></div><motion.button whileHover={{ scale: 1.1 }} onClick={logout} className="btn btn-light rounded-circle" title="تسجيل الخروج"><i className="fas fa-sign-out-alt"></i></motion.button></div>
            </div>
          </div>
        </header>

        <div className="container-fluid px-4 px-md-5 py-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="card p-4">
                <nav className="d-grid gap-2">
                  {[
                    { view: 'dashboard', text: 'لوحة التحكم', icon: 'fas fa-tachometer-alt' },
                    { view: 'news', text: 'إدارة الأخبار', icon: 'fas fa-newspaper' },
                    { view: 'reports', text: 'البلاغات', icon: 'fas fa-bug' }
                  ].map(item => (
                    <button key={item.view} onClick={() => setCurrentView(item.view)} className={`btn text-end py-2 px-3 sidebar-btn ${currentView.includes(item.view) ? 'active' : ''}`}>
                      <div className="d-flex align-items-center gap-3"><i className={item.icon}></i><span>{item.text}</span></div>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>
            <div className="col-lg-9">
              <AnimatePresence mode="wait">
                <motion.div key={currentView} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                  {renderView()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <GlobalStyles />
    </>
  );
}

const GlobalStyles = () => (
    <style>{`
      /* --- CSS للتصميم الاحترافي المطور --- */
      @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
      @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

      :root {
        --primary-color: #4f46e5;
        --primary-color-dark: #4338ca;
        --primary-color-light: #e0e7ff;
        --text-color-dark: #111827;
        --text-color-light: #6b7280;
        --background-color: #f9fafb;
        --border-color: #e5e7eb;
        --card-background: #ffffff;
      }

      body, .font-sans {
        font-family: 'Cairo', sans-serif !important;
        background-color: var(--background-color);
        color: var(--text-color-dark);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      .card {
        border: 1px solid var(--border-color);
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
        background-color: var(--card-background);
      }
      
      .form-control {
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        padding: 0.75rem 1rem;
      }
      .form-control:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
      }
      
      .custom-btn-primary {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
        font-weight: 500;
        border-radius: 0.5rem;
        padding: 0.75rem 1.5rem;
        transition: background-color 0.3s ease;
      }
      .custom-btn-primary:hover {
        background-color: var(--primary-color-dark);
        border-color: var(--primary-color-dark);
      }
      
      .logo-icon {
        background-color: var(--primary-color);
        color: white;
        width: 48px;
        height: 48px;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
      }
      
      .sidebar-btn {
        transition: all 0.2s ease;
        font-weight: 500;
      }
      .sidebar-btn.active {
        background-color: var(--primary-color);
        color: white;
        box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.3);
      }
      .sidebar-btn:not(.active) { color: var(--text-color-light); }
      .sidebar-btn:not(.active):hover { background-color: var(--primary-color-light); color: var(--primary-color-dark); transform: translateX(-5px); }
      
      .table { border-collapse: separate; border-spacing: 0 0.5rem; }
      .table thead th { border: none; color: var(--text-color-light); font-weight: 500; text-transform: uppercase; font-size: 0.75rem; }
      .table tbody tr { background-color: var(--card-background); transition: transform 0.2s ease; }
      .table tbody tr:hover { transform: translateY(-3px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.07); }
      .table td, .table th { border: none; vertical-align: middle; }
      .table td:first-child, .table th:first-child { border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
      .table td:last-child, .table th:last-child { border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem; }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #aaa; }
    `}</style>
);
