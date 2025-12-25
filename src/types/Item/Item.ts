export interface Photo {
  id: number;
  url: string;
}

export interface Item {
  id: string;
  title: string;
  thumbnails: string[];
  photos: Photo[];
  price: string;
  lines: [string, string];
}
