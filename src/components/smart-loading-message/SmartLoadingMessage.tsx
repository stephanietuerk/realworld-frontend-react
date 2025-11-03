import { useEffect, useState } from 'react';

export function SmartLoadingMessage({ className }: { className?: string }) {
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingPhase(1), 3000),
      setTimeout(() => setLoadingPhase(2), 10000),
      setTimeout(() => setLoadingPhase(3), 15000),
      setTimeout(() => setLoadingPhase(4), 20000),
      setTimeout(() => setLoadingPhase(5), 30000),
      setTimeout(() => setLoadingPhase(6), 45000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const messages = [
    'Loading articles...',
    'Still loading... (the database may need to warm up on first load)',
    'Gathering firewood...',
    'Arranging wood into a perfect pyramid...',
    'Lighting the fire...',
    'Cooking marshmallows...',
    'Feeling the warmth...almost there!',
  ];

  return <p className={className}>{messages[loadingPhase]}</p>;
}
