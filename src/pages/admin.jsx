import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';

/* ========== TOAST ========== */
function Toast({ message }) {
  if (!message) return null;
  return <div className="admin__toast">{message}</div>;
}

/* ========== IMAGE UPLOADER ========== */
function ImageUpload({ url, onUpload, toast }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file);

    if (uploadError) {
      toast("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);

    onUpload(data.publicUrl);
    setUploading(false);
    toast("Image successfully uploaded!");
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1rem', background: 'var(--color-bg)', padding: '0.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-inset)' }}>
      {url && <img src={url} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />}
      <div style={{ flex: 1 }}>
        <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} style={{ fontSize: '0.8rem', width: '100%' }} />
        {uploading && <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: '0.2rem' }}>Uploading...</div>}
      </div>
    </div>
  );
}

/* ========== LOGIN ========== */
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="admin__login">
      <div className="admin__login-card">
        <h1>🔐 Admin Login</h1>
        <p>Sign in to manage your portfolio content</p>
        {error && <div className="admin__login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="admin__input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" required />
          </div>
          <div className="admin__input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="admin__btn admin__btn--save" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ========== HEADER SETTINGS ========== */
function HeaderSettings({ settings, onChange, onSave }) {
  const h = settings || { greeting: '', name: '', role: '', tagline: '', image_url: '' };
  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Header Settings</h2>
        <button className="admin__btn admin__btn--save" onClick={() => onSave('header', h)}>Save</button>
      </div>
      <div className="admin__input-group">
        <label>Greeting</label>
        <input value={h.greeting || ''} onChange={e => onChange('header', { ...h, greeting: e.target.value })} placeholder="Hello I'm" />
      </div>
      <div className="admin__input-row">
        <div className="admin__input-group">
          <label>Full Name</label>
          <input value={h.name || ''} onChange={e => onChange('header', { ...h, name: e.target.value })} placeholder="Reandy Ferdinanto" />
        </div>
        <div className="admin__input-group">
          <label>Role / Title</label>
          <input value={h.role || ''} onChange={e => onChange('header', { ...h, role: e.target.value })} placeholder="BackEnd Developer" />
        </div>
      </div>
      <div className="admin__input-group">
        <label>Tagline</label>
        <textarea
          rows="3"
          value={h.tagline || ''}
          onChange={e => onChange('header', { ...h, tagline: e.target.value })}
          placeholder="Building scalable backend systems & crafting modern web experiences"
        />
      </div>
      <div className="admin__input-group" style={{ marginTop: '1rem' }}>
        <label>Profile Image</label>
        <ImageUpload url={h.image_url} onUpload={(url) => onChange('header', { ...h, image_url: url })} toast={(msg) => alert(msg)} />
      </div>
    </div>
  );
}

/* ========== ABOUT SETTINGS ========== */
function AboutSettings({ settings, onChange, onSave }) {
  const a = settings || { title: '', paragraphs: ['', ''], highlights: ['', '', ''], stats: [] };
  const updateParagraph = (i, val) => {
    const p = [...(a.paragraphs || [])];
    p[i] = val;
    onChange('about', { ...a, paragraphs: p });
  };
  const updateHighlight = (i, val) => {
    const h = [...(a.highlights || [])];
    h[i] = val;
    onChange('about', { ...a, highlights: h });
  };
  const updateStat = (i, field, val) => {
    const s = [...(a.stats || [])];
    s[i] = { ...s[i], [field]: val };
    onChange('about', { ...a, stats: s });
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>About Me</h2>
        <button className="admin__btn admin__btn--save" onClick={() => onSave('about', a)}>Save</button>
      </div>
      <div className="admin__input-group">
        <label>Section Title</label>
        <input value={a.title || ''} onChange={e => onChange('about', { ...a, title: e.target.value })} placeholder="Who am I?" />
      </div>
      <div className="admin__input-group">
        <label>Profile Image (About Section)</label>
        <ImageUpload url={a.image_url} onUpload={(url) => onChange('about', { ...a, image_url: url })} toast={(msg) => alert(msg)} />
      </div>
      <div className="admin__input-group">
        <label>Paragraph 1</label>
        <textarea rows="3" value={(a.paragraphs || [])[0] || ''} onChange={e => updateParagraph(0, e.target.value)} />
      </div>
      <div className="admin__input-group">
        <label>Paragraph 2</label>
        <textarea rows="3" value={(a.paragraphs || [])[1] || ''} onChange={e => updateParagraph(1, e.target.value)} />
      </div>
      <h3 style={{ marginBottom: '1rem', marginTop: '1rem', fontSize: '1rem' }}>Highlights</h3>
      {(a.highlights || []).map((h, i) => (
        <div key={i} className="admin__input-group">
          <label>Highlight {i + 1}</label>
          <input value={h} onChange={e => updateHighlight(i, e.target.value)} />
        </div>
      ))}
      <h3 style={{ marginBottom: '1rem', marginTop: '1rem', fontSize: '1rem' }}>Stats Cards</h3>
      {(a.stats || []).map((s, i) => (
        <div key={i} className="admin__input-row-3" style={{ marginBottom: '0.75rem' }}>
          <div className="admin__input-group">
            <label>Icon</label>
            <select value={s.icon || 'award'} onChange={e => updateStat(i, 'icon', e.target.value)}>
              <option value="award">Award</option>
              <option value="users">Users</option>
              <option value="folder">Folder</option>
            </select>
          </div>
          <div className="admin__input-group">
            <label>Label</label>
            <input value={s.label || ''} onChange={e => updateStat(i, 'label', e.target.value)} />
          </div>
          <div className="admin__input-group">
            <label>Value</label>
            <input value={s.value || ''} onChange={e => updateStat(i, 'value', e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========== SKILLS ========== */
function SkillsManager({ skills, setSkills, toast }) {
  const addSkill = (category) => {
    setSkills([...skills, { id: 'new-' + Date.now(), category, name: '', level: 50, sort_order: skills.length, _new: true }]);
  };

  const updateSkill = (id, field, val) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: val, _dirty: true } : s));
  };

  const deleteSkill = async (id) => {
    if (id.toString().startsWith('new-')) {
      setSkills(skills.filter(s => s.id !== id));
      return;
    }
    await supabase.from('skills').delete().eq('id', id);
    setSkills(skills.filter(s => s.id !== id));
    toast('Skill deleted');
  };

  const saveAll = async () => {
    for (const s of skills) {
      const data = { category: s.category, name: s.name, level: s.level, sort_order: s.sort_order };
      if (s._new) {
        const { data: inserted } = await supabase.from('skills').insert(data).select().single();
        if (inserted) s.id = inserted.id;
        s._new = false;
      } else if (s._dirty) {
        await supabase.from('skills').update(data).eq('id', s.id);
      }
      s._dirty = false;
    }
    toast('Skills saved!');
  };

  const fe = skills.filter(s => s.category === 'frontend').sort((a, b) => a.sort_order - b.sort_order);
  const be = skills.filter(s => s.category === 'backend').sort((a, b) => a.sort_order - b.sort_order);

  const renderSkills = (list, category, title) => (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem' }}>{title}</h3>
        <button className="admin__btn admin__btn--add" onClick={() => addSkill(category)}>+ Add</button>
      </div>
      {list.map(s => (
        <div key={s.id} className="admin__item">
          <div className="admin__input-row">
            <div className="admin__input-group">
              <label>Skill Name</label>
              <input value={s.name} onChange={e => updateSkill(s.id, 'name', e.target.value)} />
            </div>
            <div className="admin__input-group">
              <label>Level ({s.level}%)</label>
              <div className="admin__range-group">
                <input type="range" min="0" max="100" value={s.level} onChange={e => updateSkill(s.id, 'level', parseInt(e.target.value))} />
                <span className="admin__range-value">{s.level}%</span>
              </div>
            </div>
          </div>
          <button className="admin__btn admin__btn--delete" onClick={() => deleteSkill(s.id)} style={{ marginTop: '0.5rem' }}>Delete</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Skills</h2>
        <button className="admin__btn admin__btn--save" onClick={saveAll}>Save All</button>
      </div>
      {renderSkills(fe, 'frontend', '🎨 Frontend')}
      {renderSkills(be, 'backend', '⚙️ Backend')}
    </div>
  );
}

/* ========== PROJECTS ========== */
function ProjectsManager({ projects, setProjects, toast }) {
  const addProject = () => {
    setProjects([...projects, { id: 'new-' + Date.now(), title: '', category: 'other', technologies: '', demo_url: '', image_credit: '', image_credit_url: '', sort_order: projects.length, _new: true }]);
  };

  const updateProject = (id, field, val) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: val, _dirty: true } : p));
  };

  const deleteProject = async (id) => {
    if (id.toString().startsWith('new-')) {
      setProjects(projects.filter(p => p.id !== id));
      return;
    }
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter(p => p.id !== id));
    toast('Project deleted');
  };

  const saveAll = async () => {
    for (const p of projects) {
      const data = { title: p.title, category: p.category, technologies: p.technologies, demo_url: p.demo_url, image_url: p.image_url, image_credit: p.image_credit, image_credit_url: p.image_credit_url, sort_order: p.sort_order };
      if (p._new) {
        const { data: inserted } = await supabase.from('projects').insert(data).select().single();
        if (inserted) p.id = inserted.id;
        p._new = false;
      } else if (p._dirty) {
        await supabase.from('projects').update(data).eq('id', p.id);
      }
      p._dirty = false;
    }
    toast('Projects saved!');
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Portfolio Projects</h2>
        <div className="admin__item-actions">
          <button className="admin__btn admin__btn--add" onClick={addProject}>+ Add Project</button>
          <button className="admin__btn admin__btn--save" onClick={saveAll}>Save All</button>
        </div>
      </div>
      {projects.sort((a, b) => a.sort_order - b.sort_order).map(p => (
        <div key={p.id} className="admin__item">
          <div className="admin__input-row">
            <div className="admin__input-group" style={{ flex: 2 }}>
              <label>Project Title</label>
              <input value={p.title || ''} onChange={e => updateProject(p.id, 'title', e.target.value)} />
            </div>
            <div className="admin__input-group" style={{ flex: 1 }}>
              <label>Category</label>
              <select value={p.category || 'other'} onChange={e => updateProject(p.id, 'category', e.target.value)}>
                <option value="portfolio">Portfolio Profile</option>
                <option value="saas">SaaS / Platform</option>
                <option value="appscript">AppScript / Apps</option>
                <option value="other">Other Apps</option>
              </select>
            </div>
          </div>
          <div className="admin__input-group">
            <label>Project Image</label>
            <ImageUpload url={p.image_url} onUpload={(url) => updateProject(p.id, 'image_url', url)} toast={toast} />
          </div>
          <div className="admin__input-row">
            <div className="admin__input-group">
              <label>Technologies Used</label>
              <input value={p.technologies || ''} onChange={e => updateProject(p.id, 'technologies', e.target.value)} placeholder="Next.js, Supabase, Tailwind" />
            </div>
            <div className="admin__input-group">
              <label>Demo URL</label>
              <input value={p.demo_url || ''} onChange={e => updateProject(p.id, 'demo_url', e.target.value)} />
            </div>
          </div>
          <div className="admin__input-row">
            <div className="admin__input-group">
              <label>Image Credit</label>
              <input value={p.image_credit || ''} onChange={e => updateProject(p.id, 'image_credit', e.target.value)} />
            </div>
            <div className="admin__input-group">
              <label>Image Credit URL</label>
              <input value={p.image_credit_url || ''} onChange={e => updateProject(p.id, 'image_credit_url', e.target.value)} />
            </div>
          </div>
          <button className="admin__btn admin__btn--delete" onClick={() => deleteProject(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/* ========== CERTIFICATES ========== */
function CertificatesManager({ certificates, setCertificates, toast }) {
  const addCert = () => {
    setCertificates([...certificates, { id: 'new-' + Date.now(), name: '', review: '', sort_order: certificates.length, _new: true }]);
  };

  const updateCert = (id, field, val) => {
    setCertificates(certificates.map(c => c.id === id ? { ...c, [field]: val, _dirty: true } : c));
  };

  const deleteCert = async (id) => {
    if (id.toString().startsWith('new-')) {
      setCertificates(certificates.filter(c => c.id !== id));
      return;
    }
    await supabase.from('certificates').delete().eq('id', id);
    setCertificates(certificates.filter(c => c.id !== id));
    toast('Certificate deleted');
  };

  const saveAll = async () => {
    for (const c of certificates) {
      const data = { name: c.name, review: c.review, avatar_url: c.avatar_url, sort_order: c.sort_order };
      if (c._new) {
        const { data: inserted } = await supabase.from('certificates').insert(data).select().single();
        if (inserted) c.id = inserted.id;
        c._new = false;
      } else if (c._dirty) {
        await supabase.from('certificates').update(data).eq('id', c.id);
      }
      c._dirty = false;
    }
    toast('Certificates saved!');
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Certificates</h2>
        <div className="admin__item-actions">
          <button className="admin__btn admin__btn--add" onClick={addCert}>+ Add</button>
          <button className="admin__btn admin__btn--save" onClick={saveAll}>Save All</button>
        </div>
      </div>
      {certificates.sort((a, b) => a.sort_order - b.sort_order).map(c => (
        <div key={c.id} className="admin__item">
          <div className="admin__input-group">
            <label>Certificate Name / Issuer</label>
            <input value={c.name || ''} onChange={e => updateCert(c.id, 'name', e.target.value)} />
          </div>
          <div className="admin__input-group">
            <label>Certificate Image / Avatar</label>
            <ImageUpload url={c.avatar_url} onUpload={(url) => updateCert(c.id, 'avatar_url', url)} toast={toast} />
          </div>
          <div className="admin__input-group">
            <label>Description</label>
            <textarea rows="3" value={c.review || ''} onChange={e => updateCert(c.id, 'review', e.target.value)} />
          </div>
          <button className="admin__btn admin__btn--delete" onClick={() => deleteCert(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/* ========== CONTACT OPTIONS ========== */
function ContactManager({ contacts, setContacts, toast }) {
  const addContact = () => {
    setContacts([...contacts, { id: 'new-' + Date.now(), type: 'email', label: '', value: '', link: '', sort_order: contacts.length, _new: true }]);
  };

  const updateContact = (id, field, val) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, [field]: val, _dirty: true } : c));
  };

  const deleteContact = async (id) => {
    if (id.toString().startsWith('new-')) {
      setContacts(contacts.filter(c => c.id !== id));
      return;
    }
    await supabase.from('contact_options').delete().eq('id', id);
    setContacts(contacts.filter(c => c.id !== id));
    toast('Contact deleted');
  };

  const saveAll = async () => {
    for (const c of contacts) {
      const data = { type: c.type, label: c.label, value: c.value, link: c.link, sort_order: c.sort_order };
      if (c._new) {
        const { data: inserted } = await supabase.from('contact_options').insert(data).select().single();
        if (inserted) c.id = inserted.id;
        c._new = false;
      } else if (c._dirty) {
        await supabase.from('contact_options').update(data).eq('id', c.id);
      }
      c._dirty = false;
    }
    toast('Contacts saved!');
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Contact Options</h2>
        <div className="admin__item-actions">
          <button className="admin__btn admin__btn--add" onClick={addContact}>+ Add</button>
          <button className="admin__btn admin__btn--save" onClick={saveAll}>Save All</button>
        </div>
      </div>
      {contacts.sort((a, b) => a.sort_order - b.sort_order).map(c => (
        <div key={c.id} className="admin__item">
          <div className="admin__input-row">
            <div className="admin__input-group">
              <label>Type</label>
              <select value={c.type || 'email'} onChange={e => updateContact(c.id, 'type', e.target.value)}>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div className="admin__input-group">
              <label>Label</label>
              <input value={c.label || ''} onChange={e => updateContact(c.id, 'label', e.target.value)} />
            </div>
          </div>
          <div className="admin__input-row">
            <div className="admin__input-group">
              <label>Display Value</label>
              <input value={c.value || ''} onChange={e => updateContact(c.id, 'value', e.target.value)} placeholder="user@email.com" />
            </div>
            <div className="admin__input-group">
              <label>Link URL</label>
              <input value={c.link || ''} onChange={e => updateContact(c.id, 'link', e.target.value)} placeholder="mailto:user@email.com" />
            </div>
          </div>
          <button className="admin__btn admin__btn--delete" onClick={() => deleteContact(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/* ========== WEB ORDERS ========== */
function OrdersManager({ orders, setOrders, toast }) {
  const updateStatus = async (id, status) => {
    await supabase.from('web_orders').update({ status }).eq('id', id);
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    toast('Order status updated!');
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Web Orders</h2>
      </div>
      {orders.map(o => (
        <div key={o.id} className="admin__item" style={{ borderLeft: o.status === 'pending' ? '4px solid var(--color-accent)' : '4px solid #4CAF50' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>{o.name} <span style={{ fontSize: '0.8rem', color: 'var(--color-light)', fontWeight: 'normal' }}>({new Date(o.created_at).toLocaleDateString()})</span></h3>
            <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} style={{ padding: '0.3rem', borderRadius: '0.5rem', background: 'var(--color-bg)', color: 'var(--color-primary)' }}>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <p><strong>Email:</strong> <a href={`mailto:${o.email}`} style={{color: 'var(--color-accent)'}}>{o.email}</a></p>
          <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${o.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{color: 'var(--color-accent)'}}>{o.whatsapp || 'N/A'}</a></p>
          {o.reference_url && <p><strong>Reference:</strong> <a href={o.reference_url} target="_blank" rel="noreferrer" style={{color: 'var(--color-accent)'}}>{o.reference_url}</a></p>}
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '0.5rem' }}>
            <strong>Requirements:</strong>
            <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{o.requirements}</p>
          </div>
        </div>
      ))}
      {orders.length === 0 && <p>No orders yet.</p>}
    </div>
  );
}

/* ========== WEB CATALOGS ========== */
function CatalogsManager({ catalogs, setCatalogs, toast }) {
  const addCatalog = () => {
    setCatalogs([...catalogs, { id: 'new-' + Date.now(), title: '', description: '', image_url: '', demo_url: '', sort_order: catalogs.length, _new: true }]);
  };

  const updateCat = (id, field, val) => {
    setCatalogs(catalogs.map(c => c.id === id ? { ...c, [field]: val, _dirty: true } : c));
  };

  const deleteCat = async (id) => {
    if (id.toString().startsWith('new-')) return setCatalogs(catalogs.filter(c => c.id !== id));
    await supabase.from('web_catalogs').delete().eq('id', id);
    setCatalogs(catalogs.filter(c => c.id !== id));
    toast('Catalog deleted');
  };

  const saveAll = async () => {
    for (const c of catalogs) {
      const data = { title: c.title, description: c.description, image_url: c.image_url, demo_url: c.demo_url, sort_order: c.sort_order };
      if (c._new) {
        const { data: inserted } = await supabase.from('web_catalogs').insert(data).select().single();
        if (inserted) c.id = inserted.id;
        c._new = false;
      } else if (c._dirty) {
        await supabase.from('web_catalogs').update(data).eq('id', c.id);
      }
      c._dirty = false;
    }
    toast('Catalogs saved!');
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Web Catalogs</h2>
        <div className="admin__item-actions">
          <button className="admin__btn admin__btn--add" onClick={addCatalog}>+ Add Template</button>
          <button className="admin__btn admin__btn--save" onClick={saveAll}>Save All</button>
        </div>
      </div>
      {catalogs.sort((a, b) => a.sort_order - b.sort_order).map(c => (
        <div key={c.id} className="admin__item">
          <div className="admin__input-row">
            <div className="admin__input-group" style={{flex: 2}}>
              <label>Template Name</label>
              <input value={c.title || ''} onChange={e => updateCat(c.id, 'title', e.target.value)} />
            </div>
            <div className="admin__input-group" style={{flex: 2}}>
              <label>Demo URL</label>
              <input value={c.demo_url || ''} onChange={e => updateCat(c.id, 'demo_url', e.target.value)} />
            </div>
          </div>
          <div className="admin__input-group">
            <label>Template Screenshot / Image</label>
            <ImageUpload url={c.image_url} onUpload={(url) => updateCat(c.id, 'image_url', url)} toast={toast} />
          </div>
          <div className="admin__input-group">
            <label>Description</label>
            <textarea rows="3" value={c.description || ''} onChange={e => updateCat(c.id, 'description', e.target.value)} />
          </div>
          <button className="admin__btn admin__btn--delete" onClick={() => deleteCat(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/* ========== TIMELINE ========== */
function TimelineManager({ timeline, setTimeline, toast }) {
  const addItem = (type) => {
    setTimeline([...timeline, { id: 'new-' + Date.now(), type, title: '', location: '', date: '', desc: '', sort_order: timeline.length, _new: true }]);
  };

  const updateItem = (id, field, val) => {
    setTimeline(timeline.map(t => t.id === id ? { ...t, [field]: val, _dirty: true } : t));
  };

  const deleteItem = async (id) => {
    if (id.toString().startsWith('new-')) {
      setTimeline(timeline.filter(t => t.id !== id));
      return;
    }
    await supabase.from('timeline').delete().eq('id', id);
    setTimeline(timeline.filter(t => t.id !== id));
    toast('Timeline item deleted');
  };

  const saveAll = async () => {
    for (const t of timeline) {
      const data = { type: t.type, title: t.title, location: t.location, date: t.date, desc: t.desc, sort_order: t.sort_order };
      if (t._new) {
        const { data: inserted } = await supabase.from('timeline').insert(data).select().single();
        if (inserted) t.id = inserted.id;
        t._new = false;
      } else if (t._dirty) {
        await supabase.from('timeline').update(data).eq('id', t.id);
      }
      t._dirty = false;
    }
    toast('Timeline saved!');
  };

  const renderSection = (type, sectionTitle) => {
    const items = timeline.filter(t => t.type === type).sort((a, b) => a.sort_order - b.sort_order);
    return (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{sectionTitle}</h3>
          <button className="admin__btn admin__btn--add" onClick={() => addItem(type)}>+ Add {sectionTitle}</button>
        </div>
        {items.map((t) => (
          <div key={t.id} className="admin__item">
            <div className="admin__input-row">
              <div className="admin__input-group" style={{ flex: 2 }}>
                <label>Title / Position</label>
                <input value={t.title || ''} onChange={e => updateItem(t.id, 'title', e.target.value)} placeholder="Backend Developer" />
              </div>
              <div className="admin__input-group" style={{ flex: 1 }}>
                <label>Date / Duration</label>
                <input value={t.date || ''} onChange={e => updateItem(t.id, 'date', e.target.value)} placeholder="2018 - 2022" />
              </div>
            </div>
            <div className="admin__input-group">
              <label>Location / Company / School</label>
              <input value={t.location || ''} onChange={e => updateItem(t.id, 'location', e.target.value)} />
            </div>
            <div className="admin__input-group">
              <label>Description</label>
              <textarea rows="3" value={t.desc || ''} onChange={e => updateItem(t.id, 'desc', e.target.value)} />
            </div>
            <div className="admin__input-group">
              <label>Sort Order</label>
              <input type="number" value={t.sort_order || 0} onChange={e => updateItem(t.id, 'sort_order', parseInt(e.target.value))} style={{ width: '80px' }} />
            </div>
            <button className="admin__btn admin__btn--delete" onClick={() => deleteItem(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Career & Education Timeline</h2>
        <div className="admin__item-actions">
          <button className="admin__btn admin__btn--save" onClick={saveAll}>Save All</button>
        </div>
      </div>
      {renderSection('career', 'Career Experience')}
      {renderSection('education', 'Education')}
    </div>
  );
}

/* ========== ACCOUNT SETTINGS ========== */
function AccountSettings({ user, toast }) {
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert(error.message);
    } else {
      toast("Password updated successfully!");
      setNewPassword('');
    }
    setLoading(false);
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    if (!newEmail || newEmail === user.email) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      alert(error.message);
    } else {
      toast("Email change requested! Check both emails to confirm.");
    }
    setLoading(false);
  };

  return (
    <div className="admin__section">
      <div className="admin__section-header">
        <h2>Account Settings</h2>
      </div>

      <div className="admin__item" style={{ marginBottom: "2rem" }}>
        <h3>Update Email</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--color-light)", marginBottom: "1rem" }}>
          Current Email: <strong>{user?.email}</strong>
        </p>
        <form onSubmit={updateEmail} className="admin__input-row">
          <div className="admin__input-group" style={{ flex: 1 }}>
            <label>New Email Address</label>
            <input 
              type="email" 
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="admin__btn admin__btn--save" disabled={loading} style={{ alignSelf: "flex-end", height: "42px" }}>
            Change Email
          </button>
        </form>
      </div>

      <div className="admin__item">
        <h3>Change Password</h3>
        <form onSubmit={updatePassword} className="admin__input-row">
          <div className="admin__input-group" style={{ flex: 1 }}>
            <label>New Password (min 6 characters)</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="admin__btn admin__btn--save" disabled={loading} style={{ alignSelf: "flex-end", height: "42px" }}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

/* ========== MAIN ADMIN PAGE ========== */
export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('header');
  const [toastMsg, setToastMsg] = useState('');

  // Data states
  const [settings, setSettings] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch data
  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      const [settingsRes, skillsRes, projRes, certRes, contactRes, ordersRes, catRes, timelineRes] = await Promise.all([
        supabase.from('site_settings').select('*'),
        supabase.from('skills').select('*').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('certificates').select('*').order('sort_order'),
        supabase.from('contact_options').select('*').order('sort_order'),
        supabase.from('web_orders').select('*').order('created_at', { ascending: false }),
        supabase.from('web_catalogs').select('*').order('sort_order'),
        supabase.from('timeline').select('*').order('sort_order'),
      ]);

      const s = {};
      (settingsRes.data || []).forEach(row => { s[row.key] = row.value; });
      setSettings(s);
      setSkills(skillsRes.data || []);
      setProjects(projRes.data || []);
      setCertificates(certRes.data || []);
      setContacts(contactRes.data || []);
      setOrders(ordersRes.data || []);
      setCatalogs(catRes.data || []);
      setTimeline(timelineRes.data || []);
    };
    fetchAll();
  }, [user]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSetting = async (key, value) => {
    const { data: existing } = await supabase.from('site_settings').select('id').eq('key', key).single();
    if (existing) {
      await supabase.from('site_settings').update({ value, updated_at: new Date().toISOString() }).eq('key', key);
    } else {
      await supabase.from('site_settings').insert({ key, value });
    }
    toast(`${key} saved!`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="admin__login"><p>Loading...</p></div>;
  if (!user) return <LoginForm />;

  const tabs = [
    { key: 'header', label: '🏠 Header' },
    { key: 'about', label: '👤 About' },
    { key: 'skills', label: '⚡ Skills' },
    { key: 'timeline', label: '⏳ Timeline' },
    { key: 'projects', label: '📁 Projects' },
    { key: 'certificates', label: '🏆 Certificates' },
    { key: 'contacts', label: '📬 Contact' },
    { key: 'orders', label: '🛒 Orders' },
    { key: 'catalogs', label: '🎨 Catalogs' },
    { key: 'account', label: '🔒 Account' },
  ];

  return (
    <>
      <Head>
        <title>Admin | Portfolio CMS</title>
      </Head>
      <div className="admin">
        <div className="container">
          <div className="admin__header">
            <h1>📋 Portfolio CMS</h1>
            <div className="admin__header-actions">
              <span className="admin__user">{user.email}</span>
              <a href="/" className="admin__btn admin__btn--ghost">← View Site</a>
              <button className="admin__btn admin__btn--delete" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="admin__tabs">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`admin__tab ${activeTab === t.key ? 'admin__tab--active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'header' && <HeaderSettings settings={settings.header} onChange={updateSetting} onSave={saveSetting} />}
          {activeTab === 'about' && <AboutSettings settings={settings.about} onChange={updateSetting} onSave={saveSetting} />}
          {activeTab === 'skills' && <SkillsManager skills={skills} setSkills={setSkills} toast={toast} />}
          {activeTab === 'timeline' && <TimelineManager timeline={timeline} setTimeline={setTimeline} toast={toast} />}
          { activeTab === 'projects' && <ProjectsManager projects={projects} setProjects={setProjects} toast={toast} /> }
          { activeTab === 'certificates' && <CertificatesManager certificates={certificates} setCertificates={setCertificates} toast={toast} /> }
          { activeTab === 'contacts' && <ContactManager contacts={contacts} setContacts={setContacts} toast={toast} /> }
          { activeTab === 'orders' && <OrdersManager orders={orders} setOrders={setOrders} toast={toast} /> }
          { activeTab === 'catalogs' && <CatalogsManager catalogs={catalogs} setCatalogs={setCatalogs} toast={toast} /> }
          { activeTab === 'account' && <AccountSettings user={user} toast={toast} /> }
        </div>
      </div>
      <Toast message={toastMsg} />
    </>
  );
}
