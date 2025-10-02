import React, { useState, useEffect } from "react";

const API_BASE = "https://sadq-proxy.pes450569.workers.dev";

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginData, setLoginData] = useState({ employee_id: '', password: '' });
  const [newNews, setNewNews] = useState({ title: '', description: '', url: '', status: true });
  const [editNews, setEditNews] = useState({ id: '', title: '', description: '', url: '', status: true });
  const [reportsData, setReportsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  // ============ Login ============
  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const params = new URLSearchParams(loginData).toString();
      const response = await fetch(`${API_BASE}/sadik/login?${params}`);
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('employee_data', JSON.stringify(data.employee));
        setEmployeeData(data.employee);
        setIsLoggedIn(true);
        setSuccess(data.message);
        loadDashboardData();
        setCurrentView('dashboard');
      } else {
        setError(data.message || 'فشل تسجيل الدخول');
      }
    } catch (err) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ Logout ============
  const logout = () => {
    localStorage.removeItem('employee_data');
    setIsLoggedIn(false);
    setEmployeeData(null);
    setCurrentView('login');
    setLoginData({ employee_id: '', password: '' });
  };

  // ============ Load Dashboard Data ============
  const loadDashboardData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [statsResp, newsResp, reportsResp] = await Promise.all([
        fetch(`${API_BASE}/sadik/admin-dashboard`),
        fetch(`${API_BASE}/sadik/news`),
        fetch(`${API_BASE}/admin/reports`)
      ]);

      const statsData = await statsResp.json();
      const newsData = await newsResp.json();
      const reportsData = await reportsResp.json();

      if (statsData.success) {
        setStats(statsData.stats || {});
        setRecentLogs(statsData.recent_logs || []);
      }
      if (newsData.success) {
        setNewsData(newsData.news || []);
      }
      if (reportsData.success) {
        setReportsData(reportsData.reports || []);
      }
    } catch (err) {
      setError('❌ خطأ في تحميل البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ Add News (GET) ============
  const addNews = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...newNews,
        employee_id: employeeData?.employee_id || '',
        status: newNews.status ? 1 : 0
      };
      const params = new URLSearchParams(payload).toString();
      const response = await fetch(`${API_BASE}/sadik/add-news?${params}`);
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setNewNews({ title: '', description: '', url: '', status: true });
        loadDashboardData();
        setCurrentView('news');
      } else {
        setError(data.message || 'فشل إضافة الخبر');
      }
    } catch (err) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ Update News (GET) ============
  const updateNews = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        news_id: editNews.id,
        title: editNews.title,
        description: editNews.description,
        url: editNews.url,
        status: editNews.status ? 1 : 0
      };
      const params = new URLSearchParams(payload).toString();
      const response = await fetch(`${API_BASE}/sadik/update-news?${params}`);
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        loadDashboardData();
        setCurrentView('news');
      } else {
        setError(data.message || 'فشل تحديث الخبر');
      }
    } catch (err) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ Delete News ============
  const confirmDeleteNews = (newsId) => {
    setNewsToDelete(newsId);
    setShowConfirmModal(true);
  };

  const executeDeleteNews = async () => {
    setShowConfirmModal(false);
    if (!newsToDelete) return;
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const params = new URLSearchParams({ news_id: newsToDelete }).toString();
      const response = await fetch(`${API_BASE}/sadik/delete-news?${params}`);
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        loadDashboardData();
      } else {
        setError(data.message || 'فشل حذف الخبر');
      }
    } catch (err) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
      setNewsToDelete(null);
    }
  };

  // ============ Load News for Edit ============
  const loadNewsForEdit = async (newsId) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/sadik/news/${newsId}`);
      const data = await response.json();
      if (data.success) {
        setEditNews({
          id: data.news.id,
          title: data.news.title,
          description: data.news.description,
          url: data.news.url || '',
          status: data.news.status === 1
        });
        setCurrentView('edit-news');
      } else {
        setError(data.message || 'لم يتم العثور على الخبر');
      }
    } catch (err) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ Update Report Status ============
  const updateReportStatus = async (reportId, newStatus) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const params = new URLSearchParams({ report_id: reportId, status: newStatus }).toString();
      const response = await fetch(`${API_BASE}/admin/reports/${reportId}/status?${params}`);
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        loadDashboardData();
      } else {
        setError(data.message || 'فشل تحديث الحالة');
      }
    } catch (err) {
      setError('❌ خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ useEffect ============
  useEffect(() => {
    const saved = localStorage.getItem('employee_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEmployeeData(parsed);
        setIsLoggedIn(true);
        setCurrentView('dashboard');
        loadDashboardData();
      } catch (e) {
        localStorage.removeItem('employee_data');
      }
    }
  }, []);

  // ============ Loading Overlay ============
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // ============ Login Form ============
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">نظام صادق</h1>
          {error && <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 mb-6 rounded"><p>❌ {error}</p></div>}
          {success && <div className="bg-green-100 border-r-4 border-green-500 text-green-700 p-4 mb-6 rounded"><p>✅ {success}</p></div>}
          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الموظف</label>
              <input
                type="text"
                name="employee_id"
                value={loginData.employee_id}
                onChange={(e) => setLoginData({...loginData, employee_id: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل رقم الموظف"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============ Main Dashboard ============
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">نظام صادق - لوحة التحكم</h1>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 mr-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">القائمة الرئيسية</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => { setCurrentView('dashboard'); loadDashboardData(); }}
                  className={`w-full text-right px-4 py-3 rounded-lg transition duration-300 ${
                    currentView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📊 لوحة التحكم
                </button>
                <button
                  onClick={() => { setCurrentView('news'); loadDashboardData(); }}
                  className={`w-full text-right px-4 py-3 rounded-lg transition duration-300 ${
                    currentView.includes('news') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📰 الأخبار
                </button>
                <button
                  onClick={() => { setCurrentView('reports'); loadDashboardData(); }}
                  className={`w-full text-right px-4 py-3 rounded-lg transition duration-300 ${
                    currentView === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🐞 البلاغات
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {error && <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 mb-6 rounded"><p>❌ {error}</p></div>}
            {success && <div className="bg-green-100 border-r-4 border-green-500 text-green-700 p-4 mb-6 rounded"><p>✅ {success}</p></div>}

            {/* Dashboard */}
            {currentView === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <span className="text-blue-600 text-2xl">👥</span>
                      </div>
                      <div className="mr-4">
                        <p className="text-gray-600">إجمالي الموظفين</p>
                        <p className="text-3xl font-bold text-gray-800">{stats?.total_employees || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full">
                        <span className="text-green-600 text-2xl">📰</span>
                      </div>
                      <div className="mr-4">
                        <p className="text-gray-600">إجمالي الأخبار</p>
                        <p className="text-3xl font-bold text-gray-800">{stats?.total_news || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <span className="text-purple-600 text-2xl">✅</span>
                      </div>
                      <div className="mr-4">
                        <p className="text-gray-600">سجل تسجيل الدخول</p>
                        <p className="text-3xl font-bold text-gray-800">{stats?.total_login_logs || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">أحدث تسجيلات الدخول</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {recentLogs.length > 0 ? (
                      recentLogs.slice(0, 5).map((log, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800">موظف: {log.employee_id || 'غير معروف'}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {log.created_at ? new Date(log.created_at).toLocaleString('ar-EG') : 'غير متوفر'}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {log.success ? 'نجاح' : 'فشل'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">لا توجد سجلات حديثة</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* News Management */}
            {currentView === 'news' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">إدارة الأخبار</h2>
                  <button
                    onClick={() => setCurrentView('add-news')}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition duration-300"
                  >
                    إضافة خبر
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {newsData.length > 0 ? (
                          newsData.map((news) => (
                            <tr key={news.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{news.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  news.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {news.status ? 'منشور' : 'مسودة'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2 space-x-reverse">
                                  <button
                                    onClick={() => loadNewsForEdit(news.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                  >
                                    تعديل
                                  </button>
                                  <button
                                    onClick={() => confirmDeleteNews(news.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                  >
                                    حذف
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                              لا توجد أخبار
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Add News */}
            {currentView === 'add-news' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">إضافة خبر جديد</h2>
                  <button
                    onClick={() => setCurrentView('news')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    رجوع
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <form onSubmit={addNews} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الخبر</label>
                      <input
                        type="text"
                        name="title"
                        value={newNews.title}
                        onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل عنوان الخبر"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">وصف الخبر</label>
                      <textarea
                        name="description"
                        value={newNews.description}
                        onChange={(e) => setNewNews({...newNews, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل وصف الخبر"
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة (اختياري)</label>
                      <input
                        type="text"
                        name="url"
                        value={newNews.url}
                        onChange={(e) => setNewNews({...newNews, url: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل رابط الصورة"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="status"
                        name="status"
                        checked={newNews.status}
                        onChange={(e) => setNewNews({...newNews, status: e.target.checked})}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                      <label htmlFor="status" className="mr-2 text-sm font-medium text-gray-700">نشر الخبر مباشرة</label>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg"
                      >
                        إضافة الخبر
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit News */}
            {currentView === 'edit-news' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">تعديل خبر</h2>
                  <button
                    onClick={() => setCurrentView('news')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    رجوع
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <form onSubmit={updateNews} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الخبر</label>
                      <input
                        type="text"
                        name="title"
                        value={editNews.title}
                        onChange={(e) => setEditNews({...editNews, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل عنوان الخبر"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">وصف الخبر</label>
                      <textarea
                        name="description"
                        value={editNews.description}
                        onChange={(e) => setEditNews({...editNews, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل وصف الخبر"
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة (اختياري)</label>
                      <input
                        type="text"
                        name="url"
                        value={editNews.url}
                        onChange={(e) => setEditNews({...editNews, url: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل رابط الصورة"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="status"
                        name="status"
                        checked={editNews.status}
                        onChange={(e) => setEditNews({...editNews, status: e.target.checked})}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                      <label htmlFor="status" className="mr-2 text-sm font-medium text-gray-700">نشر الخبر مباشرة</label>
                    </div>
                    <div className="flex space-x-4 space-x-reverse pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
                      >
                        تحديث الخبر
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmDeleteNews(editNews.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg"
                      >
                        حذف الخبر
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Reports */}
            {currentView === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">البلاغات</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportsData.length > 0 ? (
                          reportsData.map((report) => (
                            <tr key={report.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  report.status === 'verified' ? 'bg-green-100 text-green-800' :
                                  report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {report.status === 'verified' ? 'تم التحقق' :
                                   report.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2 space-x-reverse">
                                  <button
                                    onClick={() => updateReportStatus(report.id, 'verified')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                  >
                                    تأكيد
                                  </button>
                                  <button
                                    onClick={() => updateReportStatus(report.id, 'rejected')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                  >
                                    رفض
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                              لا توجد بلاغات
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">هل أنت متأكد من حذف هذا الخبر؟</p>
            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={executeDeleteNews}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                تأكيد
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
