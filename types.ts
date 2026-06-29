export interface Author {
  name: string;
  url?: string;
  affiliations: number[];
  isEqualContribution?: boolean;
  isCorresponding?: boolean;
}

export interface Affiliation {
  id: number;
  name: string;
}

export interface LinkButton {
  label: string;
  iconClass: string;
  url: string;
  isImage?: boolean;
  comingSoon?: boolean;
}

export interface CarouselItem {
  id: string | number;
  title?: string;
  videoUrl?: string;
  posterUrl?: string;
  youtubeId?: string;
  description?: string;
}
