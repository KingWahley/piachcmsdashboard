export function createSettingsStore(initialData, storeName) {
  const isClient = typeof window !== 'undefined';
  const storageKey = `pieach_cms_${storeName}`;

  let store = { ...initialData };
  let isRehydrated = false;

  const listeners = new Set();

  const persist = () => {
    if (isClient) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(store));
      } catch (e) {
        console.error(`Error saving store ${storageKey} to localStorage`, e);
      }
    }
  };

  const api = {
    rehydrate: () => {
      if (!isClient || isRehydrated) return;
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          store = JSON.parse(saved);
          isRehydrated = true;
          api.notify();
        }
      } catch (e) {
        console.error(`Error rehydrating store ${storageKey}`, e);
      }
    },
    getData: () => store,
    updateSettings: (updates) => {
      store = { ...store, ...updates };
      // Note: We don't persist on every update to allow "Save Changes" button to control it
      api.notify();
    },
    saveSettings: () => {
      persist();
      api.notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    notify: () => {
      const currentData = { ...store };
      listeners.forEach(listener => listener(currentData));
    }
  };

  return api;
}
