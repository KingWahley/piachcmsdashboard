'use client';

import { useState, useEffect } from 'react';

export function useStore(storeApi) {
  const [data, setData] = useState(storeApi.getData());

  useEffect(() => {
    const unsubscribe = storeApi.subscribe((newData) => {
      setData(newData);
    });
    return unsubscribe;
  }, [storeApi]);

  return {
    data,
    createItem: storeApi.createItem,
    updateItem: storeApi.updateItem,
    deleteItem: storeApi.deleteItem,
    getItemById: storeApi.getItemById,
    updateSettings: storeApi.updateSettings,
    saveSettings: storeApi.saveSettings
  };
}
