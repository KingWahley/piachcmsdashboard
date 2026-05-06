export function createStore(initialData, idPrefix = 'id', storeName) {
  const isClient = typeof window !== 'undefined';
  const storageKey = storeName ? `pieach_cms_${storeName}` : `pieach_cms_${idPrefix}`;

  let store = [...initialData];
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
    getItemById: (id) => store.find(item => item.id === id) || null,
    createItem: (item) => {
      const id = `${idPrefix}${Date.now()}`;
      const newItem = { 
        ...item, 
        id, 
        date: item.date || new Date().toISOString().split('T')[0] 
      };
      store = [newItem, ...store];
      persist();
      api.notify();
      return newItem;
    },
    updateItem: (id, updates) => {
      store = store.map(item => item.id === id ? { ...item, ...updates } : item);
      persist();
      api.notify();
    },
    deleteItem: (id) => {
      store = store.filter(item => item.id !== id);
      persist();
      api.notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    notify: () => {
      const currentData = [...store];
      listeners.forEach(listener => listener(currentData));
    }
  };

  return api;
}
