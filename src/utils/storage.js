export function loadState(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      const parsed = JSON.parse(raw)
      return { ...fallback, ...parsed }
    } catch (e) { return fallback }
  }
  
  export function saveState(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) {}
  }
  
  export function clearState(key) {
    try { localStorage.removeItem(key) } catch (e) {}
  }