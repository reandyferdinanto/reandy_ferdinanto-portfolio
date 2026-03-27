import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { FiArrowLeft, FiCheck, FiExternalLink, FiLayers, FiMonitor, FiServer } from 'react-icons/fi';

const servicePackages = [
  {
    id: 'personal-portfolio',
    icon: FiMonitor,
    name: 'Personal Portfolio',
    price: 'Rp 250.000',
    badge: 'Free Maintenance',
    summary: 'Cocok untuk personal branding, CV online, dan showcase project.',
    includes: [
      'Landing page personal yang responsif',
      'Section profil, skill, project, dan contact',
      'Optimasi tampilan desktop dan mobile',
      'Free maintenance untuk update minor',
    ],
    note: 'Harga ini untuk jasa pembuatan saja. Hosting dan domain belum termasuk.',
  },
  {
    id: 'company-landing-page',
    icon: FiLayers,
    name: 'Company Landing Page',
    price: 'Rp 500.000',
    badge: 'Business Ready',
    summary: 'Untuk company profile, landing promo, atau halaman brand bisnis.',
    includes: [
      'Landing page company / brand',
      'Section layanan, keunggulan, CTA, dan contact',
      'Struktur konten lebih rapi untuk kebutuhan bisnis',
      'Maintenance opsional sesuai kebutuhan',
    ],
    note: 'Harga ini untuk jasa pembuatan saja. Hosting, domain, dan maintenance tidak termasuk.',
  },
  {
    id: 'saas-web-app',
    icon: FiServer,
    name: 'SaaS / Web App',
    price: 'Mulai Rp 1.000.000',
    badge: 'Minimum Project',
    summary: 'Untuk dashboard, portal internal, atau SaaS dengan flow dan fitur custom.',
    includes: [
      'Analisis scope dan kebutuhan fitur',
      'Tampilan utama, form, dan alur user dasar',
      'Setup struktur project yang siap dikembangkan',
      'Biaya akhir mengikuti kompleksitas fitur',
    ],
    note: 'Harga awal hanya untuk jasa pembuatan. Hosting, domain, maintenance, dan pengembangan fitur lanjutan dihitung terpisah.',
  },
];

const extraCosts = [
  {
    title: 'Hosting Personal / Company',
    price: 'Sekitar Rp 38.900 / bln',
    detail:
      'Estimasi menggunakan paket Hostinger Business Web Hosting agar resource lebih lega, tidak terlalu mepet, dan lebih aman jika harga promo termurah sudah habis. Cocok untuk portfolio profesional atau company landing page.',
  },
  {
    title: 'Hosting SaaS / Web App',
    price: 'Sekitar Rp 106.900 / bln',
    detail:
      'Estimasi menggunakan Hostinger Cloud Startup sebagai baseline menengah untuk project SaaS atau web app. Ini memberi buffer resource yang lebih realistis dibanding mengambil paket paling murah.',
  },
  {
    title: 'Domain',
    price: '.com estimasi Rp 209.900 / tahun',
    detail:
      'Estimasi memakai harga normal / renewal supaya client tidak kaget saat promo habis. Jika sedang promo, biaya aktual bisa lebih rendah. Domain .id umumnya ada di kisaran Rp 210.900 / tahun.',
  },
  {
    title: 'Business Email',
    price: 'Sekitar Rp 14.900 / bln / mailbox',
    detail:
      'Opsional untuk company landing page atau SaaS yang butuh email profesional dengan domain sendiri. Dipasang sebagai estimasi aman, bukan promo terendah.',
  },
  {
    title: 'Maintenance',
    price: 'Personal gratis, business mulai Rp 100.000 / bln',
    detail:
      'Maintenance personal portfolio gratis untuk update minor. Company landing page mulai Rp 100.000 / bulan. SaaS / web app mulai Rp 250.000 / bulan tergantung scope support.',
  },
];

export default function OrderPage() {
  const [catalogs, setCatalogs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    reference_url: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    const { data } = await supabase.from('web_catalogs').select('*').order('sort_order', { ascending: true });
    if (data) setCatalogs(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form-section');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg) => {
    setFormData((prev) => ({
      ...prev,
      reference_url: `Paket: ${pkg.name}`,
      requirements: prev.requirements || `Saya tertarik dengan paket ${pkg.name} (${pkg.price}).`,
    }));
    setToast(`Paket ${pkg.name} dipilih.`);
    setTimeout(() => setToast(''), 3000);
    scrollToForm();
  };

  const handleSelectCatalog = (url) => {
    setFormData({ ...formData, reference_url: url });
    setToast('URL added to reference!');
    setTimeout(() => setToast(''), 3000);
    scrollToForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.requirements) {
      setToast('Please fill all required fields');
      setTimeout(() => setToast(''), 3000);
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('web_orders').insert([formData]);
    
    if (error) {
      setToast('Submission failed! ' + error.message);
    } else {
      setToast('Order submitted successfully! We will contact you soon.');
      setFormData({ name: '', email: '', whatsapp: '', reference_url: '', requirements: '' });
    }
    
    setIsSubmitting(false);
    setTimeout(() => setToast(''), 5000);
  };

  return (
    <>
      <Head>
        <title>Catalogue & Pricelist | Reandy Ferdinanto</title>
      </Head>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)', position: 'relative' }}>
        {toast && <div className="order__toast">{toast}</div>}
        
        <Link href="/" className="back__btn">
          <FiArrowLeft /> Back to Home
        </Link>
        
        <div className="order__container">
          
          <div className="order__header">
            <span className="order__eyebrow">Catalogue & Pricelist</span>
            <h2>Jasa Pembuatan Website</h2>
            <p>Pilih paket yang paling sesuai, cek biaya tambahan, lalu kirim brief lewat form order.</p>
          </div>

          <section className="pricing__section">
            <div className="pricing__intro">
              <h3>Paket Jasa</h3>
              <p>Harga di bawah ini adalah biaya jasa pembuatan. Belum termasuk hosting, domain, dan maintenance, kecuali personal portfolio yang mendapat free maintenance untuk update minor.</p>
            </div>

            <div className="pricing__grid">
              {servicePackages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <article key={pkg.id} className="pricing__card">
                    <div className="pricing__card-top">
                      <div className="pricing__icon">
                        <Icon />
                      </div>
                      <span className="pricing__badge">{pkg.badge}</span>
                    </div>
                    <div className="pricing__card-body">
                      <h3>{pkg.name}</h3>
                      <div className="pricing__price">{pkg.price}</div>
                      <p className="pricing__summary">{pkg.summary}</p>
                      <div className="pricing__list">
                        {pkg.includes.map((item) => (
                          <div key={item} className="pricing__list-item">
                            <FiCheck />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="pricing__note">{pkg.note}</p>
                    </div>
                    <button type="button" className="catalog__btn pricing__cta" onClick={() => handleSelectPackage(pkg)}>
                      Pilih Paket
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="pricing__section pricing__section--compact">
            <div className="pricing__intro">
              <h3>Biaya Tambahan</h3>
              <p>Estimasi ini dibuat agar client langsung paham biaya go-live di luar jasa pembuatan.</p>
            </div>

            <div className="extra__grid">
              {extraCosts.map((item) => (
                <article key={item.title} className="extra__card">
                  <h4>{item.title}</h4>
                  <div className="extra__price">{item.price}</div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="pricing__footnote">
              <strong>Catatan:</strong> estimasi biaya tambahan di atas sengaja memakai acuan paket menengah dan harga yang lebih aman, bukan promo termurah, supaya budget client tetap realistis walau promo berubah atau sudah habis.
            </div>
          </section>

          <div className="order__header">
            <h2>Template & Reference</h2>
            <p>Pilih contoh tampilan sebagai referensi jika ingin style yang mirip.</p>
          </div>

          {catalogs.length > 0 ? (
            <div className="catalog__grid">
              {catalogs.map(cat => (
                <div key={cat.id} className="catalog__item">
                  {cat.image_url && (
                    <div className="catalog__image">
                      <img src={cat.image_url} alt={cat.title} />
                    </div>
                  )}
                  <div className="catalog__details">
                    <h4>{cat.title}</h4>
                    <p>{cat.description}</p>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                      {cat.demo_url && (
                        <a href={cat.demo_url} target="_blank" rel="noopener noreferrer" className="catalog__btn" style={{flex: 1}}>
                          <FiExternalLink /> View Demo
                        </a>
                      )}
                      <button type="button" onClick={() => handleSelectCatalog(cat.demo_url || `Catalog: ${cat.title}`)} className="catalog__btn" style={{flex: 1, backgroundColor: 'var(--color-primary)', color: 'white'}}>
                        Use This
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-light)', fontStyle: 'italic' }}>No catalogs available at the moment.</p>
          )}

          <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.1)', margin: '2rem 0' }}></div>

          <div className="order__header" id="order-form-section">
            <h2>Order Form</h2>
            <p>Tulis kebutuhan project Anda. Jika sudah memilih paket atau template, detailnya akan ikut terisi sebagai referensi.</p>
          </div>

          <div className="order__form-container">
            <form onSubmit={handleSubmit} className="order__form">
              <div className="form__group">
                <label>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div className="form__group" style={{ flex: '1 1 300px' }}>
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                </div>
                <div className="form__group" style={{ flex: '1 1 300px' }}>
                  <label>WhatsApp Number</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+62 812..." />
                </div>
              </div>

              <div className="form__group">
                <label>Reference URL (Example website or catalog link)</label>
                <input type="text" name="reference_url" value={formData.reference_url} onChange={handleChange} placeholder="https://..." />
              </div>

              <div className="form__group">
                <label>Project Requirements / Description *</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} required rows="5" placeholder="I want an e-commerce website that has..." />
              </div>

              <button type="submit" disabled={isSubmitting} className="order__submit">
                {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
