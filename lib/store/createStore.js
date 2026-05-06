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
          const savedData = JSON.parse(saved);
          // Merge strategy: Keep saved items, but merge with initialData to ensure new fields are present
          store = savedData.map(savedItem => {
            const initialItem = initialData.find(i => i.id === savedItem.id);
            if (!initialItem) return savedItem;
            
            return {
              ...initialItem,
              ...savedItem,
              // If savedItem has empty description but initialItem has one, use the initial one
              description: savedItem.description || initialItem.description,
              skills: (savedItem.skills && savedItem.skills.length > 0) ? savedItem.skills : initialItem.skills
            };
          });
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
        date: item.date || item.datePosted || new Date().toISOString().split('T')[0] 
      };
      // Keep datePosted if it was already there
      if (item.datePosted && !newItem.datePosted) {
        newItem.datePosted = item.datePosted;
      }
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
