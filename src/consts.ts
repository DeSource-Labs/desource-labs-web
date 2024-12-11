import type { SocialMedia, SocialMediaItem } from './types';

export const socialMediaArray: SocialMediaItem[] = [
  {
    title: 'GitHub',
    url: 'https://github.com/DeSource-Labs',
    icon: '/img/github.svg',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/company/desource-labs',
    icon: '/img/linkedin.svg',
  },
  {
    title: 'Telegram',
    url: 'https://t.me/de_source_labs',
    icon: '/img/telegram.svg',
  },
  {
    title: 'X',
    url: 'https://x.com/desource_labs',
    icon: '/img/x.svg',
  },
];

export const socialMedia: SocialMedia = {
  github: socialMediaArray[0],
  linkedin: socialMediaArray[1],
  telegram: socialMediaArray[2],
  x: socialMediaArray[3],
};
