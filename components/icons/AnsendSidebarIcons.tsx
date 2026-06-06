import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  active?: boolean;
  className?: string;
}

// 1. Início / HomeIcon - Apple-inspired minimalist house with filled center dot
export const HomeIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <path d="M5.5 10.5L12 4.5L18.5 10.5V18.5C18.5 19.6 17.6 20.5 16.5 20.5H7.5C6.4 20.5 5.5 19.6 5.5 18.5V10.5Z" />
    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

// 2. NEXO IA / NexoAIIcon - Sparkle neural magic star intersecting music waves
export const NexoAIIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <circle cx="12" cy="3" r="1" fill="currentColor" />
    <circle cx="12" cy="21" r="1" fill="currentColor" />
    <circle cx="3" cy="12" r="1" fill="currentColor" />
    <circle cx="21" cy="12" r="1" fill="currentColor" />
    <path d="M12 7.5C12 9.8 10.2 12 7.5 12C10.2 12 12 14.2 12 16.5C12 14.2 13.8 12 16.5 12C13.8 12 12 9.8 12 7.5Z" />
    <path d="M12 4.5V6.5M12 17.5V19.5M4.5 12H6.5M17.5 12H19.5" opacity={0.5} />
  </svg>
);

// 3. Explorar / ExploreIcon - Minimalist compass dial
export const ExploreIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.5L11 11L9.5 14.5L13 13L14.5 9.5Z" />
    <line x1="12" y1="3.5" x2="12" y2="4.5" />
    <line x1="12" y1="19.5" x2="12" y2="20.5" />
    <line x1="3.5" y1="12" x2="4.5" y2="12" />
    <line x1="19.5" y1="12" x2="20.5" y2="12" />
  </svg>
);

// 4. Favoritos / FavoriteIcon - Elegant custom rounded heart
export const FavoriteIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <path d="M12 20.5C12 20.5 4.5 14.2 4.5 8.5C4.5 5.5 6.5 3.5 9.5 3.5C11.2 3.5 11.8 4.5 12 5C12.2 4.5 12.8 3.5 14.5 3.5C17.5 3.5 19.5 5.5 19.5 8.5C19.5 14.2 12 20.5 12 20.5Z" />
  </svg>
);

// 5. Pedidos / OrdersIcon - Rounded premium shopping bag
export const OrdersIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <path d="M6 8.5H18V18.5C18 19.6 17.1 20.5 16 20.5H8C6.9 20.5 6 19.6 6 18.5V8.5Z" />
    <path d="M9.5 8.5V6C9.5 4.6 10.6 3.5 12 3.5C13.4 3.5 14.5 4.6 14.5 6V8.5" />
    <path d="M9.5 12.5C9.5 13.9 10.6 15 12 15C13.4 15 14.5 13.9 14.5 12.5" />
  </svg>
);

// 6. Biblioteca / LibraryIcon - Vertical catalog tracks/albums on shelf
export const LibraryIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <rect x="5.5" y="4.5" width="3" height="15.5" rx="1.5" />
    <rect x="10.5" y="4.5" width="3" height="15.5" rx="1.5" />
    <rect x="14.8" y="4.8" width="3" height="15.5" rx="1.5" transform="rotate(15 14.8 4.8)" />
    <line x1="3.5" y1="20" x2="20.5" y2="20" />
  </svg>
);

// 7. Profissionais / ProfessionalsIcon - Connected network nodes representing people
export const ProfessionalsIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <circle cx="7.5" cy="8.5" r="3.5" />
    <path d="M2.5 18.5C2.5 15.5 5 14 7.5 14C9.5 14 11 15 12 16.5" />
    <circle cx="16.5" cy="8.5" r="3.5" />
    <path d="M21.5 18.5C21.5 15.5 19 14 16.5 14C14.5 14 13 15 12 16.5" />
    <path d="M10.5 17.5C11 18 13 18 13.5 17.5" strokeWidth="2" />
  </svg>
);

// 8. Meu Perfil / ProfileIcon - Apple user outline circle profile
export const ProfileIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="9.5" r="2.8" />
    <path d="M6.5 17.5C7.8 15.2 10.1 14 12 14C13.9 14 16.2 15.2 17.5 17.5" />
  </svg>
);

// 9. Configurações / SettingsIcon - Smooth gear settings icon
export const SettingsIcon: React.FC<IconProps> = ({
  size = 20,
  active = false,
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ansend-icon ${active ? "is-active" : ""} ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
