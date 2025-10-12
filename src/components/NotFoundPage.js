// src/components/NotFoundPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8', // خلفية رمادية فاتحة وناعمة
        fontFamily: "'Cairo', sans-serif",
        padding: '2rem',
        overflow: 'hidden',
        position: 'relative', // لإضافة الأشكال الرسومية
    },
    contentWrapper: {
        maxWidth: '550px',
        textAlign: 'center',
        zIndex: '2',
        position: 'relative',
    },
    errorCode: {
        fontSize: 'clamp(8rem, 25vw, 12rem)',
        fontWeight: '800',
        lineHeight: '1',
        // لون أزرق غامق جداً وأنيق
        color: '#1e3c72',
        marginBottom: '0.5rem',
    },
    title: {
        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
        fontWeight: '700',
        color: '#34495e', // لون نصي داكن وأقل حدة
        marginBottom: '1rem',
    },
    description: {
        fontSize: '1.1rem',
        color: '#7f8c8d', // لون رمادي ناعم
        lineHeight: '1.8',
        marginBottom: '2.5rem',
    },
    homeButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 2.5rem',
        backgroundColor: '#1e3c72', // نفس اللون الأزرق الغامق
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(30, 60, 114, 0.2)',
        border: 'none',
    },
    // شكل رسومي مجرد للخلفية
    backgroundShape: {
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: '1',
    }
};

const NotFoundPage = () => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        ...styles.homeButton,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 8px 25px rgba(30, 60, 114, 0.3)' : '0 4px 15px rgba(30, 60, 114, 0.2)',
    };

    return (
        <div style={styles.pageContainer}>
            {/* الأشكال الرسومية في الخلفية */}
            <div style={{ ...styles.backgroundShape, width: '400px', height: '400px', background: 'rgba(42, 82, 152, 0.1)', top: '10%', left: '10%' }}></div>
            <div style={{ ...styles.backgroundShape, width: '300px', height: '300px', background: 'rgba(220, 53, 69, 0.05)', bottom: '15%', right: '15%' }}></div>
            
            <div style={styles.contentWrapper}>
                <h1 style={styles.errorCode}>404</h1>
                <h2 style={styles.title}>الصفحة غير موجودة</h2>
                <p style={styles.description}>
                    عفواً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم حذفها أو أن الرابط الذي اتبعته غير صحيح.
                </p>
                <Link
                    to="/"
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <i className="fas fa-home"></i>
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
