// src/components/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // تأكد من تثبيت react-router-dom

// تم تحديث الأنماط هنا
const styles = {
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        // استخدام تدرج لوني خفيف للخلفية
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: "'Cairo', sans-serif",
        padding: '2rem',
        overflow: 'hidden', // لمنع أي أشرطة تمرير غير مرغوب فيها
    },
    contentWrapper: {
        maxWidth: '600px',
    },
    errorCode: {
        fontSize: 'clamp(8rem, 30vw, 15rem)',
        fontWeight: '900',
        color: '#dee2e6', // لون أساسي فاتح
        position: 'relative',
        // --- هذا هو كود التأثير ثلاثي الأبعاد (3D) ---
        textShadow: `
            1px 1px 1px #ced4da,
            2px 2px 1px #ced4da,
            3px 3px 1px #adb5bd,
            4px 4px 1px #adb5bd,
            5px 5px 1px #9fa8b2,
            6px 6px 1px #9fa8b2,
            7px 7px 1px #8f9aaa,
            8px 8px 10px rgba(0, 0, 0, 0.4)
        `,
        animation: 'float 4s ease-in-out infinite',
    },
    title: {
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        fontWeight: '700',
        color: '#1e3c72', // لون أزرق غامق متناسق
        marginTop: '-3.5rem', // لزيادة التداخل مع الرقم
        position: 'relative', // لضمان ظهوره فوق الرقم
        zIndex: '1',
    },
    description: {
        fontSize: '1.15rem',
        color: '#495057',
        marginBottom: '2.5rem',
        maxWidth: '500px',
        margin: '1.5rem auto 2.5rem auto', // لضمان التوسيط
    },
    homeButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.8rem 2rem',
        // --- هذا هو اللون الأزرق الغامق الجديد للزر ---
        backgroundColor: '#1e3c72',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 20px -3px rgba(30, 60, 114, 0.4)',
        border: 'none', // إزالة أي حدود افتراضية
    },
};

// مكون لإضافة الحركات (Animation)
const PageStyles = () => (
    <style>{`
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
    `}</style>
);


const NotFoundPage = () => {
    // حالة لإدارة تأثير التحويم على الزر
    const [isHovered, setIsHovered] = useState(false);

    // دمج الأنماط الأساسية مع تأثير التحويم
    const buttonStyle = {
        ...styles.homeButton,
        transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? '0 8px 25px -5px rgba(30, 60, 114, 0.6)' : '0 5px 20px -3px rgba(30, 60, 114, 0.4)',
    };

    return (
        <>
            <PageStyles />
            <div style={styles.pageContainer}>
                <div style={styles.contentWrapper}>
                    <h1 style={styles.errorCode}>404</h1>
                    <h2 style={styles.title}>عفواً، هذه الصفحة مفقودة</h2>
                    <p style={styles.description}>
                        يبدو أنك سلكت طريقًا غير متوقع. لا تقلق، يمكنك العودة إلى بر الأمان من هنا.
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
        </>
    );
};

export default NotFoundPage;
