import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';

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

  const handleSelectCatalog = (url) => {
    setFormData({ ...formData, reference_url: url });
    setToast('URL added to reference!');
    setTimeout(() => setToast(''), 3000);
    // Scroll to form smoothly
    const formElement = document.getElementById('order-form-section');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
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
        <title>Order Application | Reandy Ferdinanto</title>
      </Head>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)', position: 'relative' }}>
        {toast && <div className="order__toast">{toast}</div>}
        
        <Link href="/" className="back__btn">
          <FiArrowLeft /> Back to Home
        </Link>
        
        <div className="order__container">
          
          <div className="order__header">
            <h2>Website Catalog</h2>
            <p>Select a template as a reference, or fill out the custom order form below.</p>
          </div>

          {/* Web Catalog Grid */}
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
            <h2>Order Your Web / App</h2>
            <p>Tell us exactly what you need built.</p>
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
