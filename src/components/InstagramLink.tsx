import { Icon } from "./Icon";
export function InstagramLink() {
  return (
    <a className="button button-outline social-button" href="https://www.instagram.com/rafaelaguiar_s/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Rafael Aguiar: @rafaelaguiar_s (abre em nova aba)">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="social-label">Instagram</span>
      <span aria-hidden="true"><Icon name="arrowUpRight" /></span>
    </a>
  );
}
