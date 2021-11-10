import { FiPhone } from '@react-icons/all-files/fi/FiPhone';
import { FiMail } from '@react-icons/all-files/fi/FiMail';
import { FiGithub } from '@react-icons/all-files/fi/FiGithub';
import { FiLinkedin } from '@react-icons/all-files/fi/FiLinkedin';
import { FiHome } from '@react-icons/all-files/fi/FiHome';

export function strip(link, type) {
  switch (type) {
    case 'github':
      return link.replace('https://github.com/', '');
    case 'linkedin':
      return link.replace('https://linkedin.com/in/', '');
    default:
      return link;
  }
}

export function getMediaIcon(type) {
  switch (type) {
    case 'phone':
      return FiPhone;
    case 'email':
      return FiMail;
    case 'github':
      return FiGithub;
    case 'linkedin':
      return FiLinkedin;
    case 'website':
      return FiHome;
    default:
      console.warn(`You are missing the icon for media type - ${type}`);
      return null;
  }
}
