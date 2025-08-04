export type SocialMediaKey = 'email' | 'telegram' | 'x' | 'linkedin' | 'github';

export type SocialMediaItem = {
  type: SocialMediaKey;
  href: string;
};

export type SocialMedia = Record<SocialMediaKey, string>;

export type TeamMember = {
  photo: string;
  title: string;
  desc: string;
  socials: { type: SocialMediaKey; href: string }[];
};

export interface VideoEvent extends Event {
  target: HTMLVideoElement | null;
}
