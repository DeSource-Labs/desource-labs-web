export type SocialMediaKey = 'telegram' | 'x' | 'linkedin' | 'github';

export type SocialMediaItem = {
  title: string;
  url: string;
  icon: string;
};

export type SocialMedia = Record<SocialMediaKey, SocialMediaItem>;
