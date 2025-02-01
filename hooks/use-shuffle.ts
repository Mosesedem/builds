import { useState, useEffect } from 'react';

export function useShuffle<T>(items: T[], intervalMs: number = 30000) {
  const [shuffledItems, setShuffledItems] = useState<T[]>([...items]);

  useEffect(() => {
    const shuffle = () => {
      setShuffledItems([...items].sort(() => Math.random() - 0.5));
    };

    shuffle(); // Initial shuffle
    const interval = setInterval(shuffle, intervalMs);

    return () => clearInterval(interval);
  }, [items, intervalMs]);

  return shuffledItems;
}