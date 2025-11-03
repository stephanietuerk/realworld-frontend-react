import { CircleUser } from 'lucide-react';
import { useState } from 'react';
interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  round?: boolean;
  filter?: string;
  imgClass?: string;
  fallbackClass?: string;
}

export default function Avatar({
  src,
  alt,
  size = 32,
  round = true,
  filter = 'none',
  imgClass,
  fallbackClass,
}: AvatarProps) {
  const [useFallback, setUseFallback] = useState(!!src);

  return (
    <>
      {useFallback ? (
        <CircleUser
          size={size + 2}
          strokeWidth={1.25}
          className={fallbackClass}
        />
      ) : (
        <img
          className={imgClass}
          src={src}
          alt={alt}
          onError={() => {
            setUseFallback(true);
          }}
          width={size}
          height={size}
          style={{
            borderRadius: round ? size : 0,
            filter: filter,
          }}
        />
      )}
    </>
  );
}
