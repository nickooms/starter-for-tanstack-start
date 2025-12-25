export interface Thumbnail24 {
  type: 'thumb24';
  url: string;
  width: 24;
  height: 24;
}

export interface Thumbnail48 {
  type: 'thumb48';
  url: string;
  width: 48;
  height: 48;
}

export interface Thumbnail70 {
  type: 'thumb70';
  url: string;
  width: 70;
  height: 70;
}

export interface Thumbnail150 {
  type: 'thumb150';
  url: string;
  width: 150;
  height: 150;
}

export interface Thumbnail70x100 {
  type: 'thumb70x100';
  url: string;
  width: 70;
  height: 100;
  original_size: boolean;
}

export interface Thumbnail150x210 {
  type: 'thumb150x210';
  url: string;
  width: 150;
  height: 210;
  original_size: boolean;
}
export interface Thumbnail310x430 {
  type: 'thumb310x430';
  url: string;
  width: 310;
  height: 430;
  original_size: boolean;
}
export interface Thumbnail428x624 {
  type: 'thumb428x624';
  url: string;
  width: 428;
  height: 624;
  original_size: boolean;
}
export interface Thumbnail624x428 {
  type: 'thumb624x428';
  url: string;
  width: 624;
  height: 428;
  original_size: boolean;
}
export interface Thumbnail364x428 {
  type: 'thumb364x428';
  url: string;
  width: 364;
  height: 428;
  original_size: boolean;
}

export type Thumbnail = Thumbnail24 | Thumbnail48 | Thumbnail70 | Thumbnail150;

export type ItemThumbnail =
  | Thumbnail70x100
  | Thumbnail150x210
  | Thumbnail310x430
  | Thumbnail428x624
  | Thumbnail624x428
  | Thumbnail364x428;
