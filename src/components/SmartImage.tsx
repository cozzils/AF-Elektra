import type { ImgHTMLAttributes } from 'react';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

/**
 * <img> con fallback WebP. Il <picture> usa display:contents, quindi le classi
 * di layout restano sull'immagine e i contenitori non cambiano.
 */
export default function SmartImage({ src, ...props }: SmartImageProps) {
  const webp = /\.(jpe?g|png)$/i.test(src) ? src.replace(/\.(jpe?g|png)$/i, '.webp') : null;

  return (
    <picture className="contents">
      {webp && <source srcSet={webp} type="image/webp" />}
      <img src={src} {...props} />
    </picture>
  );
}
