export type Playlist = {
  id: string;
  name: string;
  thumbnailUrl: string;
  coverUrl: string;
  tracks: {
    href: string;
    total: number;
  };
  owner: {
    name: string;
  };
};

export type Track = {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
};
