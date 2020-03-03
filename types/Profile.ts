export type Profile = {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    height?: number;
    url: string;
    width?: number;
  }>;
  product: string;
  type: string;
  uri: string;
  country: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  followers: {
    href?: string;
    total: number;
  };
};
