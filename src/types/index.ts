export type SocialMedia = 'telegram' | 'x' | 'linkedin' | 'github';

export type SocialMediaItem = {
  title: string;
  type: SocialMedia;
  url: string;
  icon: string;
};
