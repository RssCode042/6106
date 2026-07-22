export const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const fetchSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const trackVisit = async () => {
  try {
    const hasVisited = sessionStorage.getItem('visited');
    if (!hasVisited) {
      await fetch(`${API_URL}/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visit',
          source: document.referrer || 'direct'
        })
      });
      sessionStorage.setItem('visited', 'true');
    }
  } catch (error) {
    console.error('Failed to track visit', error);
  }
};

export const trackClick = async (sourceId: string) => {
  try {
    await fetch(`${API_URL}/stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'click',
        source: sourceId
      })
    });
  } catch (error) {
    console.error('Failed to track click', error);
  }
};
