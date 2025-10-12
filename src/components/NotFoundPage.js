// src/components/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // سنستخدم هذا للعودة للصفحة الرئيسية

// يمكنك وضع هذا الـ CSS في ملف منفصل أو استخدامه كـ inline style
const styles = {
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Cairo', sans-serif",
        padding: '2rem',
    },
    contentWrapper: {
        maxWidth: '600px',
    },
    errorCode: {
        fontSize: 'clamp(6rem, 25vw, 10rem)',
        fontWeight: '800',
        lineHeight: '1',
        color: '#e9ecef',
        textShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    title: {
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        fontWeight: '700',
        color: '#343a40',
        marginTop: '-2rem', // لعمل تداخل بسيط مع رقم 404
    },
    description: {
        fontSize: '1.15rem',
        color: '#6c757d',
        marginBottom: '2rem',
    },
    homeButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#6d28d9', // نفس اللون الاحترافي من التصميم السابق
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px -3px rgba(109, 40, 217, 0.3)',
    },
};

const NotFoundPage = () => {
    return (
        <div style={styles.pageContainer}>
            <div style={styles.contentWrapper}>
                <h1 style={styles.errorCode}>404</h1>
                <h2 style={styles.title}>عفواً، الصفحة غير موجودة</h2>
                <p style={styles.description}>
                    يبدو أنك تتبع رابطاً قديماً أو أن الصفحة قد تم حذفها. لا تقلق، يمكنك العودة إلى بر الأمان من هنا.
                </p>
                <Link to="/" style={styles.homeButton} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <i className="fas fa-home"></i>
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
