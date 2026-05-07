export function createSettingsStore(initialData, storeName) {
  let store = { ...initialData };
  const listeners = new Set();

  const api = {
    rehydrate: () => {
      // No-op: Removed browser storage persistence
    },
    getData: () => store,
    updateSettings: (updates) => {
      store = { ...store, ...updates };
      api.notify();
    },
    saveSettings: () => {
      // No-op: Settings are now only in-memory
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
