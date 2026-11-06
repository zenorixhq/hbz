import { SAMPLE_LEADS, SAMPLE_PROJECTS, SAMPLE_POSTS } from './data';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: 'New' | 'Contacted' | 'Meeting Booked' | 'Proposal Sent' | 'Archived' | string;
  details: string;
  post_id?: string | null;
  notes?: string;
  created_at: string;
}

export function getStoredLeads(): Lead[] {
  if (typeof window === 'undefined') return [...SAMPLE_LEADS] as Lead[];
  try {
    const raw = localStorage.getItem('hbz_leads');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {
    console.warn('Error reading leads from localStorage:', e);
  }
  return [...SAMPLE_LEADS] as Lead[];
}

export function saveStoredLeads(leads: Lead[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('hbz_leads', JSON.stringify(leads));
  } catch (e) {
    console.warn('Error saving leads to localStorage:', e);
  }
}

export function recordNewLead({
  name,
  phone,
  source,
  details,
  post_id
}: {
  name: string;
  phone: string;
  source?: string;
  details?: string;
  post_id?: string | null;
}): Lead {
  const newLead: Lead = {
    id: 'lead_' + Date.now(),
    name: (name || '').trim(),
    phone: (phone || '').trim(),
    source: source || 'Direct Studio Consultation',
    status: 'New',
    details: details || source || 'General Client Inquiry',
    post_id: post_id || null,
    notes: '',
    created_at: new Date().toISOString()
  };

  const leads = getStoredLeads();
  leads.unshift(newLead);
  saveStoredLeads(leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: string): Lead[] {
  const leads = getStoredLeads();
  const updated = leads.map(l => (l.id === id ? { ...l, status } : l));
  saveStoredLeads(updated);
  return updated;
}

export function updateLeadNote(id: string, note: string): Lead[] {
  const leads = getStoredLeads();
  const updated = leads.map(l => (l.id === id ? { ...l, notes: note } : l));
  saveStoredLeads(updated);
  return updated;
}

export function deleteLead(id: string): Lead[] {
  const leads = getStoredLeads();
  const updated = leads.filter(l => l.id !== id);
  saveStoredLeads(updated);
  return updated;
}

// Projects Store
export function getStoredProjects(): any[] {
  if (typeof window === 'undefined') return [...SAMPLE_PROJECTS];
  try {
    const raw = localStorage.getItem('hbz_projects');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {}
  return [...SAMPLE_PROJECTS];
}

export function saveStoredProjects(projects: any[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('hbz_projects', JSON.stringify(projects));
  } catch (e) {}
}

// Posts / Journal Store
export function getStoredPosts(): any[] {
  if (typeof window === 'undefined') return [...SAMPLE_POSTS];
  try {
    const raw = localStorage.getItem('hbz_posts');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {}
  return [...SAMPLE_POSTS];
}

export function saveStoredPosts(posts: any[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('hbz_posts', JSON.stringify(posts));
  } catch (e) {}
}

// Calculator Session Unlock
export function isHouseCalcUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('hbz_house_calc_unlocked') === 'true';
}

export function setHouseCalcUnlocked(name: string, phone: string, email?: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('hbz_house_calc_unlocked', 'true');
  sessionStorage.setItem('hbz_lead_name', name);
  sessionStorage.setItem('hbz_lead_phone', phone);
  if (email) sessionStorage.setItem('hbz_lead_email', email);
}
