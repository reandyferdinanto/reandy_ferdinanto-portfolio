import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export function usePortfolioData() {
  const [data, setData] = useState({
    settings: {},
    skills: [],
    projects: [],
    certificates: [],
    contacts: [],
    loaded: false,
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [settingsRes, skillsRes, projRes, certRes, contactRes] = await Promise.all([
          supabase.from('site_settings').select('*'),
          supabase.from('skills').select('*').order('sort_order'),
          supabase.from('projects').select('*').order('sort_order'),
          supabase.from('certificates').select('*').order('sort_order'),
          supabase.from('contact_options').select('*').order('sort_order'),
        ]);

        const settings = {};
        (settingsRes.data || []).forEach(row => { settings[row.key] = row.value; });

        setData({
          settings,
          skills: skillsRes.data || [],
          projects: projRes.data || [],
          certificates: certRes.data || [],
          contacts: contactRes.data || [],
          loaded: true,
        });
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
        setData(prev => ({ ...prev, loaded: true }));
      }
    };

    fetchAll();
  }, []);

  return data;
}
