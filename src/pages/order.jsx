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
    recommended: true,
    basePrice: 250000,
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
    basePrice: 500000,
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
    basePrice: 1000000,
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
    id: 'hosting-business',
    title: 'Hosting Personal / Company',
    price: 'Sekitar Rp 38.900 / bln',
    detail:
      'Estimasi menggunakan paket Hostinger Business Web Hosting agar resource lebih lega, tidak terlalu mepet, dan lebih aman jika harga promo termurah sudah habis. Cocok untuk portfolio profesional atau company landing page.',
  },
  {
    id: 'hosting-saas',
    title: 'Hosting SaaS / Web App',
    price: 'Sekitar Rp 106.900 / bln',
    detail:
      'Estimasi menggunakan Hostinger Cloud Startup sebagai baseline menengah untuk project SaaS atau web app. Ini memberi buffer resource yang lebih realistis dibanding mengambil paket paling murah.',
  },
  {
    id: 'domain',
    title: 'Domain',
    price: '.com estimasi Rp 209.900 / tahun',
    detail:
      'Estimasi memakai harga normal / renewal supaya client tidak kaget saat promo habis. Jika sedang promo, biaya aktual bisa lebih rendah. Domain .id umumnya ada di kisaran Rp 210.900 / tahun.',
  },
  {
    id: 'email',
    title: 'Business Email',
    price: 'Sekitar Rp 14.900 / bln / mailbox',
    detail:
      'Opsional untuk company landing page atau SaaS yang butuh email profesional dengan domain sendiri. Dipasang sebagai estimasi aman, bukan promo terendah.',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    price: 'Personal gratis, business mulai Rp 100.000 / bln',
    detail:
      'Maintenance personal portfolio gratis untuk update minor. Company landing page mulai Rp 100.000 / bulan. SaaS / web app mulai Rp 200.000 / bulan tergantung scope support.',
  },
];

const hostingOptions = {
  'personal-portfolio': [
    {
      id: 'business-web-hosting',
      name: 'Hostinger Business Web Hosting',
      recommended: true,
      price: 38900,
      priceLabel: 'Rp 38.900 / bulan',
      description: 'Rekomendasi aman untuk portfolio profesional dengan resource yang lebih lega.',
    },
    {
      id: 'premium-web-hosting',
      name: 'Hostinger Premium Web Hosting',
      price: 23900,
      priceLabel: 'Rp 23.900 / bulan',
      description: 'Pilihan lebih hemat jika traffic dan fitur masih sederhana.',
    },
  ],
  'company-landing-page': [
    {
      id: 'business-web-hosting',
      name: 'Hostinger Business Web Hosting',
      recommended: true,
      price: 38900,
      priceLabel: 'Rp 38.900 / bulan',
      description: 'Rekomendasi utama untuk landing page bisnis agar performa lebih aman.',
    },
    {
      id: 'cloud-startup',
      name: 'Hostinger Cloud Startup',
      recommended: true,
      price: 106900,
      priceLabel: 'Rp 106.900 / bulan',
      description: 'Cocok jika campaign lebih serius atau trafik diperkirakan lebih tinggi.',
    },
  ],
  'saas-web-app': [
    {
      id: 'cloud-startup',
      name: 'Hostinger Cloud Startup',
      price: 106900,
      priceLabel: 'Rp 106.900 / bulan',
      description: 'Baseline menengah yang lebih realistis untuk project SaaS atau web app.',
    },
    {
      id: 'managed-node-business',
      name: 'Hostinger Managed Node.js Business',
      price: 38900,
      priceLabel: 'Rp 38.900 / bulan',
      description: 'Opsi awal untuk app sederhana yang masih kecil dan terkontrol.',
    },
  ],
};

const domainOptions = [
  {
    id: 'none',
    name: 'Tanpa domain dulu',
    price: 0,
    priceLabel: 'Rp 0',
  },
  {
    id: 'com',
    name: '.com',
    price: 209900,
    priceLabel: 'Rp 209.900 / tahun',
  },
  {
    id: 'id',
    name: '.id',
    price: 210900,
    priceLabel: 'Rp 210.900 / tahun',
  },
];

const emailOptions = [
  {
    id: 'none',
    name: 'Tanpa email bisnis',
    price: 0,
    priceLabel: 'Rp 0',
  },
  {
    id: 'business-email',
    name: '1 mailbox email bisnis',
    price: 14900,
    priceLabel: 'Rp 14.900 / bulan',
  },
];

const maintenanceOptions = {
  'personal-portfolio': [
    {
      id: 'free',
      name: 'Free maintenance minor',
      price: 0,
      priceLabel: 'Rp 0',
    },
  ],
  'company-landing-page': [
    {
      id: 'none',
      name: 'Tanpa maintenance',
      price: 0,
      priceLabel: 'Rp 0',
    },
    {
      id: 'business-basic',
      name: 'Maintenance basic',
      price: 100000,
      priceLabel: 'Rp 100.000 / bulan',
    },
  ],
  'saas-web-app': [
    {
      id: 'none',
      name: 'Tanpa maintenance',
      price: 0,
      priceLabel: 'Rp 0',
    },
    {
      id: 'saas-basic',
      name: 'Maintenance basic',
      price: 200000,
      priceLabel: 'Rp 200.000 / bulan',
    },
  ],
};

const formatRupiah = (value) =>
  `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;

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
  const [selectedPackageId, setSelectedPackageId] = useState(servicePackages[0].id);
  const [selectedHostingId, setSelectedHostingId] = useState(hostingOptions[servicePackages[0].id][0].id);
  const [selectedDomainId, setSelectedDomainId] = useState('none');
  const [selectedEmailId, setSelectedEmailId] = useState('none');
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState(maintenanceOptions[servicePackages[0].id][0].id);

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

  const buildEstimateSummary = ({
    pkg,
    hosting,
    domain,
    email,
    maintenance,
    firstPayment,
    monthly,
    total,
  }) => {
    return [
      `Estimasi project yang saya pilih:`,
      `- Paket jasa: ${pkg.name} (${pkg.price})`,
      `- Hosting: ${hosting.name} (${hosting.priceLabel})`,
      `- Domain: ${domain.name} (${domain.priceLabel})`,
      `- Email bisnis: ${email.name} (${email.priceLabel})`,
      `- Maintenance: ${maintenance.name} (${maintenance.priceLabel})`,
      ``,
      `Ringkasan biaya:`,
      `- Biaya awal: ${formatRupiah(firstPayment)}`,
      `- Biaya bulanan: ${formatRupiah(monthly)}`,
      `- Total estimasi awal + 1 bulan: ${formatRupiah(total)}`,
      ``,
      `Catatan tambahan kebutuhan project saya:`,
    ].join('\n');
  };

  const handleSelectPackage = (pkg) => {
    const nextHosting = hostingOptions[pkg.id][0];
    const nextMaintenance = maintenanceOptions[pkg.id][0];

    setSelectedPackageId(pkg.id);
    setSelectedHostingId(nextHosting.id);
    setSelectedMaintenanceId(nextMaintenance.id);
    setSelectedEmailId(pkg.id === 'personal-portfolio' ? 'none' : selectedEmailId);
    setFormData((prev) => ({
      ...prev,
      reference_url: `Paket: ${pkg.name}`,
      requirements: prev.requirements || `Saya tertarik dengan paket ${pkg.name} (${pkg.price}).`,
    }));
    setToast(`Paket ${pkg.name} dipilih.`);
    setTimeout(() => setToast(''), 3000);
    scrollToForm();
  };

  const selectedPackage = servicePackages.find((pkg) => pkg.id === selectedPackageId) || servicePackages[0];
  const currentHostingOptions = hostingOptions[selectedPackageId];
  const currentMaintenanceOptions = maintenanceOptions[selectedPackageId];
  const selectedHosting = currentHostingOptions.find((item) => item.id === selectedHostingId) || currentHostingOptions[0];
  const selectedDomain = domainOptions.find((item) => item.id === selectedDomainId) || domainOptions[0];
  const selectedEmail = emailOptions.find((item) => item.id === selectedEmailId) || emailOptions[0];
  const selectedMaintenance =
    currentMaintenanceOptions.find((item) => item.id === selectedMaintenanceId) || currentMaintenanceOptions[0];

  const firstPaymentEstimate = selectedPackage.basePrice + selectedDomain.price;
  const monthlyEstimate = selectedHosting.price + selectedEmail.price + selectedMaintenance.price;
  const firstYearEstimate = firstPaymentEstimate + monthlyEstimate;

  const highlightedExtraCards = new Set();
  if (selectedHostingId === 'business-web-hosting') highlightedExtraCards.add('hosting-business');
  if (selectedHostingId === 'premium-web-hosting') highlightedExtraCards.add('hosting-business');
  if (selectedHostingId === 'cloud-startup' || selectedHostingId === 'managed-node-business') highlightedExtraCards.add('hosting-saas');
  if (selectedDomainId !== 'none') highlightedExtraCards.add('domain');
  if (selectedEmailId !== 'none') highlightedExtraCards.add('email');
  if (selectedMaintenanceId !== 'none' && selectedMaintenanceId !== 'free') highlightedExtraCards.add('maintenance');

  const applyEstimateToForm = () => {
    const summary = buildEstimateSummary({
      pkg: selectedPackage,
      hosting: selectedHosting,
      domain: selectedDomain,
      email: selectedEmail,
      maintenance: selectedMaintenance,
      firstPayment: firstPaymentEstimate,
      monthly: monthlyEstimate,
      total: firstYearEstimate,
    });

    setFormData((prev) => ({
      ...prev,
      reference_url: prev.reference_url || `Paket: ${selectedPackage.name}`,
      requirements: summary,
    }));

    setToast('Estimasi dimasukkan ke form.');
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
      <div className="order__page">
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
                  <article key={pkg.id} className={`pricing__card ${selectedPackageId === pkg.id ? 'pricing__card--active' : ''}`}>
                    <div className="pricing__card-top">
                      <div className="pricing__icon">
                        <Icon />
                      </div>
                      <span className="pricing__badge">{pkg.badge}</span>
                    </div>
                    <div className="pricing__card-body">
                      {selectedPackageId === pkg.id && (
                        <div className="pricing__selected-indicator">Terpilih di simulasi</div>
                      )}
                      {pkg.recommended && (
                        <div className="pricing__recommended-badge">Recommended</div>
                      )}
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
                      {selectedPackageId === pkg.id ? 'Paket Aktif' : 'Pilih Paket'}
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
                <article key={item.id} className={`extra__card ${highlightedExtraCards.has(item.id) ? 'extra__card--active' : ''}`}>
                  <div className="extra__card-head">
                    <div className="extra__card-kicker">
                      {highlightedExtraCards.has(item.id) ? 'Dipakai di simulasi' : 'Biaya pendukung'}
                    </div>
                    <h4>{item.title}</h4>
                    <div className="extra__price">{item.price}</div>
                  </div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="pricing__footnote">
              <strong>Catatan:</strong> estimasi biaya tambahan di atas sengaja memakai acuan paket menengah dan harga yang lebih aman, bukan promo termurah, supaya budget client tetap realistis walau promo berubah atau sudah habis.
            </div>
          </section>

          <section className="pricing__section">
            <div className="pricing__intro">
              <h3>Simulasi Estimasi</h3>
              <p>Pilih paket dan komponen pendukung untuk melihat gambaran budget. Ini bukan harga final, hanya estimasi awal agar ekspektasi biaya lebih jelas.</p>
            </div>

            <div className="simulator">
              <div className="simulator__controls">
                <div className="simulator__group">
                  <div className="simulator__group-head">
                    <label>Paket Jasa</label>
                    <span>Pilih layanan utama</span>
                  </div>
                  <div className="simulator__choices simulator__choices--stack">
                    {servicePackages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        className={`simulator__choice-card ${selectedPackageId === pkg.id ? 'simulator__choice-card--active' : ''}`}
                        onClick={() => {
                          setSelectedPackageId(pkg.id);
                          setSelectedHostingId(hostingOptions[pkg.id][0].id);
                          setSelectedMaintenanceId(maintenanceOptions[pkg.id][0].id);
                          if (pkg.id === 'personal-portfolio') {
                            setSelectedEmailId('none');
                          }
                        }}
                      >
                        <div>
                          <strong>{pkg.name}</strong>
                          <p>{pkg.summary}</p>
                        </div>
                        <span>{pkg.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="simulator__group">
                  <div className="simulator__group-head">
                    <label>Hosting yang Disarankan</label>
                    <span>Baseline aman, bukan termurah</span>
                  </div>
                  <div className="simulator__choices simulator__choices--stack">
                    {currentHostingOptions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`simulator__choice-card ${selectedHostingId === item.id ? 'simulator__choice-card--active' : ''}`}
                        onClick={() => setSelectedHostingId(item.id)}
                        >
                          <div>
                            {item.recommended && (
                              <div className="simulator__choice-recommended">Recommended</div>
                            )}
                            <strong>{item.name}</strong>
                            <p>{item.description}</p>
                          </div>
                        <span>{item.priceLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="simulator__group">
                  <div className="simulator__group-head">
                    <label>Domain</label>
                    <span>Opsional untuk launch</span>
                  </div>
                  <div className="simulator__choices">
                    {domainOptions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`simulator__chip ${selectedDomainId === item.id ? 'simulator__chip--active' : ''}`}
                        onClick={() => setSelectedDomainId(item.id)}
                      >
                        <strong>{item.name}</strong>
                        <span>{item.priceLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="simulator__group">
                  <div className="simulator__group-head">
                    <label>Email Bisnis</label>
                    <span>{selectedPackageId === 'personal-portfolio' ? 'Tidak perlu untuk portfolio personal' : 'Tambahan opsional untuk brand bisnis'}</span>
                  </div>
                  <div className="simulator__choices">
                    {emailOptions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        disabled={selectedPackageId === 'personal-portfolio' && item.id !== 'none'}
                        className={`simulator__chip ${selectedEmailId === item.id ? 'simulator__chip--active' : ''}`}
                        onClick={() => setSelectedEmailId(item.id)}
                      >
                        <strong>{item.name}</strong>
                        <span>{item.priceLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="simulator__group">
                  <div className="simulator__group-head">
                    <label>Maintenance</label>
                    <span>Support setelah website live</span>
                  </div>
                  <div className="simulator__choices">
                    {currentMaintenanceOptions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`simulator__chip ${selectedMaintenanceId === item.id ? 'simulator__chip--active' : ''}`}
                        onClick={() => setSelectedMaintenanceId(item.id)}
                      >
                        <strong>{item.name}</strong>
                        <span>{item.priceLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="simulator__summary">
                <div className="simulator__summary-head">
                  <h4>Ringkasan Estimasi</h4>
                  <span>Belum final</span>
                </div>
                <div className="simulator__invoice">
                  <div className="simulator__invoice-head">
                    <div>
                      <div className="simulator__selected-label">Draft Quote</div>
                      <strong>{selectedPackage.name}</strong>
                    </div>
                    <div className="simulator__invoice-badge">Estimasi</div>
                  </div>

                  <div className="simulator__selected">
                    <p>{selectedHosting.name}{selectedDomain.id !== 'none' ? ` + domain ${selectedDomain.name}` : ''}</p>
                  </div>

                  <div className="simulator__line">
                    <span>Jasa pembuatan</span>
                    <strong>{formatRupiah(selectedPackage.basePrice)}</strong>
                  </div>
                  <div className="simulator__line">
                    <span>Hosting</span>
                    <strong>{formatRupiah(selectedHosting.price)}</strong>
                  </div>
                  <div className="simulator__line">
                    <span>Domain</span>
                    <strong>{formatRupiah(selectedDomain.price)}</strong>
                  </div>
                  <div className="simulator__line">
                    <span>Email bisnis</span>
                    <strong>{formatRupiah(selectedEmail.price)}</strong>
                  </div>
                  <div className="simulator__line">
                    <span>Maintenance</span>
                    <strong>{formatRupiah(selectedMaintenance.price)}</strong>
                  </div>

                  <div className="simulator__totals">
                    <div className="simulator__total">
                      <div className="simulator__total-copy">
                        <span>Biaya awal</span>
                        <small>Jasa pembuatan + domain</small>
                      </div>
                      <strong>{formatRupiah(firstPaymentEstimate)}</strong>
                    </div>
                    <div className="simulator__total simulator__total--sub">
                      <div className="simulator__total-copy">
                        <span>Biaya bulanan</span>
                        <small>Hosting + email + maintenance</small>
                      </div>
                      <strong>{formatRupiah(monthlyEstimate)}</strong>
                    </div>
                    <div className="simulator__total simulator__total--grand">
                      <div className="simulator__total-copy">
                        <span>Total estimasi</span>
                        <small>Biaya awal + 1 bulan operasional</small>
                      </div>
                      <strong>{formatRupiah(firstYearEstimate)}</strong>
                    </div>
                  </div>
                </div>
                <div className="simulator__disclaimer">
                  Biaya awal menghitung jasa pembuatan dan domain. Biaya bulanan menghitung hosting, email bisnis, dan maintenance jika dipilih. Angka ini belum final dan hanya sebagai gambaran awal, karena biaya akhir tetap mengikuti scope fitur, revisi, promo, dan kebutuhan project.
                </div>

                <button
                  type="button"
                  className="catalog__btn pricing__cta"
                  onClick={applyEstimateToForm}
                >
                  Gunakan Estimasi Ini di Form
                </button>
              </div>
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
                    <div className="catalog__kicker">Template Reference</div>
                    <h4>{cat.title}</h4>
                    <p>{cat.description}</p>
                    <div className="catalog__actions">
                      {cat.demo_url && (
                        <a href={cat.demo_url} target="_blank" rel="noopener noreferrer" className="catalog__btn catalog__btn--flex">
                          <FiExternalLink /> View Demo
                        </a>
                      )}
                      <button type="button" onClick={() => handleSelectCatalog(cat.demo_url || `Catalog: ${cat.title}`)} className="catalog__btn catalog__btn--flex catalog__btn--primary">
                        Use This
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="order__empty">No catalogs available at the moment.</p>
          )}

          <div className="order__divider"></div>

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

              <div className="order__form-row">
                <div className="form__group order__form-col">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                </div>
                <div className="form__group order__form-col">
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
