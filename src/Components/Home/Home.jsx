import { motion } from 'framer-motion';
import './Home.css';

export default function HomePage() {
  const features = [
    { 
      title: "جدیدترین تجهیزات", 
      icon: "🏀", 
      text: "داغ‌ترین تجهیزات بسکتبال که برای بهترین عملکرد طراحی شده‌اند را کشف کنید." 
    },
    { 
      title: "نکات بازیکنان", 
      icon: "⚡", 
      text: "تکنیک‌های حرفه‌ای و اسرار تمرین پشت صحنه بازیکنان را بیاموزید." 
    },
    { 
      title: "اخبار بسکتبال", 
      icon: "📣", 
      text: "با رویدادهای جهانی بسکتبال و خبرهای فوری به‌روز بمانید." 
    }
  ];

  return (
    <div className="hp-container">

      {/* Hero Section */}
      <section className="hp-hero">
        {/* Overlay نارنجی ملایم */}
        <div className="hp-hero-overlay"></div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hp-hero-title"
        >
          جهان بسکتبال
        </motion.h1>

        <motion.div
          className="hp-basketball"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="hp-ball-inner"></div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="hp-features" dir="rtl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hp-section-title"
        >
          ویژگی‌های ما
        </motion.h2>

        <div className="hp-feature-grid">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -150 : 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.05, rotateX: 8, rotateY: -8 }}
              className="hp-feature-card"
            >
              <div className="hp-feature-overlay"></div>
              <div className="hp-feature-content" style={{ textAlign: 'right' }}>
                <div className="hp-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Player Reviews */}
      <section className="hp-reviews" dir="rtl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hp-section-title"
        >
          نظرات بازیکنان
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
          className="hp-review-card"
          style={{ textAlign: 'right' }}
        >
          <div className="hp-review-header">
            <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=80&q=80" alt="LeBron James"/>
            <h3>لبرون جیمز</h3>
          </div>
          <p>"این زمین بسکتبال فوق‌العاده است! ایده‌آل برای تمرین و شوت‌های پرشی من."</p>
        </motion.div>
      </section>

      {/* Loading Section */}
      <section className="hp-loading" dir="rtl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          در حال بارگذاری محتوا
        </motion.h2>

        <motion.div
          className="hp-loading-ball"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="hp-ball-inner"></div>
        </motion.div>
      </section>

    </div>
  );
}
