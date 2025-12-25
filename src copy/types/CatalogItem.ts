import { Thumbnail } from '../types/Thumbnail';

export interface CatalogItem {
  id: number;
  code: string;
  title: string;
  photo: CatalogPhoto;
  catalogs: CatalogItem[];
  count?: number;
}

export interface CatalogPhoto {
  url: string;
  thumbnails: Thumbnail[];
}
