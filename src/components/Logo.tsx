interface LogoProps {
  className?: string;
}

/**
 * Logo ufficiale AF Elektra 2 (PNG con sfondo trasparente, ricavato dal logo
 * pubblicato sul sito aziendale). Se arriva l'SVG vettoriale originale,
 * sostituire `/public/logo.png` e questo componente in un solo punto.
 */
export default function Logo({ className = 'h-10 w-auto' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="AF Elektra 2"
      width={480}
      height={192}
      decoding="async"
      className={className}
    />
  );
}
