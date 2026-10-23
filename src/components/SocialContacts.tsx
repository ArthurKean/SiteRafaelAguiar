import { ContactCTA } from "./ContactCTA";
import { InstagramLink } from "./InstagramLink";
export function SocialContacts() {
  return <div className="social-contacts">
    <ContactCTA className="button-outline social-button">
      <span className="social-whatsapp-icon" aria-hidden="true" />
      <span className="social-label">WhatsApp</span>
    </ContactCTA>
    <InstagramLink />
  </div>;
}
