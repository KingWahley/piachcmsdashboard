export function createStore(initialData, idPrefix = 'id', storeName) {
  let store = [...initialData];
  const listeners = new Set();

  const api = {
    rehydrate: () => {
      // No-op: Removed browser storage persistence
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
      api.notify();
      return newItem;
    },
    updateItem: (id, updates) => {
      store = store.map(item => item.id === id ? { ...item, ...updates } : item);
      api.notify();
    },
    deleteItem: (id) => {
      store = store.filter(item => item.id !== id);
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
