import { useEffect, useState } from 'react';

export function SmartLoadingMessage({ className }: { className?: string }) {
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingPhase(1), 3000),
      setTimeout(() => setLoadingPhase(2), 12000),
      setTimeout(() => setLoadingPhase(3), 20000),
      setTimeout(() => setLoadingPhase(4), 30000),
      setTimeout(() => setLoadingPhase(5), 40000),
      setTimeout(() => setLoadingPhase(6), 50000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const messages = [
    'Loading articles...',
    'Still loading... (the free-tier database needs to warm up)',
    "Gathering firewood...(we'll only have to do this once)",
    'Arranging wood in the fire pit...',
    'Lighting the fire...',
    'Roasting marshmallows...',
    'Feeling the warmth...almost there!',
  ];

  return <p className={className}>{messages[loadingPhase]}</p>;
}
