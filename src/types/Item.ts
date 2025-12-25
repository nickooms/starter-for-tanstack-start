import type { ItemThumbnail } from './Thumbnail';

export interface Photo {
  id: number;
  image_no: number;
  width: 600;
  height: 800;
  dominant_color: string;
  dominant_color_opaque: string;
  url: string;
  is_main: boolean;
  thumbnails: ItemThumbnail[];
  high_resolution: {
    id: string;
    timestamp: number;
    orientation: null;
  };
  is_suspicious: boolean;
  full_size_url: string;
  is_hidden: false;
  extra: {};
}

export type CurrencyCode = 'EUR';

export interface Price {
  amount: string;
  currency_code: CurrencyCode;
}

export interface Item {
  id: number;
  title: string;
  user_id: number;
  is_draft: boolean;
  is_closed: boolean;
  is_reserved: boolean;
  is_hidden: boolean;
  price: Price;
  transaction_permitted: boolean;
  is_processing: boolean;
  currency: CurrencyCode;
  item_closing_action: null;
  path: string;
  item_alert: null;
  item_alert_type: null;
  promoted: boolean;
  is_business_user: boolean;
  size: string;
  view_count: number;
  can_push_up: boolean;
  push_up: {
    next_push_up_time: string;
  };
  can_edit: boolean;
  stats_visible: boolean;
  favourite_count: 3;
  is_favourite: boolean;
  url: string;
  service_fee: Price;
  total_item_price: Price;
  status: string;
  photos: Photo[];
  brand: string;
  is_heavy_bulky: boolean;
  item_box: {
    first_line: string;
    second_line: string;
    exposures: [];
    accessibility_label: string;
    item_id: number;
  };
  box_id?: string;
}
