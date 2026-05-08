export function createStore(initialData, idPrefix = 'id', storeName) {
  const storageKey = `pieach_cms_${storeName}`;
  
  let store = [...initialData];
  const listeners = new Set();

  const api = {
    rehydrate: () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          store = JSON.parse(saved);
          api.notify();
        }
      }
    },
    getData: () => store,
    getItemById: (id) => store.find(item => item.id === id) || null,
    createItem: (item) => {
      const id = `${idPrefix}${Date.now()}`;
      const newItem = { 
        ...item, 
        id, 
        date: item.date || item.datePosted || new Date().toISOString().split('T')[0] 
      };
      if (item.datePosted && !newItem.datePosted) {
        newItem.datePosted = item.datePosted;
      }
      store = [newItem, ...store];
      api.save();
      api.notify();
      return newItem;
    },
    updateItem: (id, updates) => {
      store = store.map(item => item.id === id ? { ...item, ...updates } : item);
      api.save();
      api.notify();
    },
    deleteItem: (id) => {
      store = store.filter(item => item.id !== id);
      api.save();
      api.notify();
    },
    save: () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(store));
      }
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
