export interface APIClientParams {
  method?: string;
  url?: string;
  params?: {[index: string]: unknown};
  data?: {[index: string]: unknown};
}

export interface APIClientReturn {
  loading: boolean;
  error: unknown;
  data: any;
  makeRequest: (config?: {[index: string]: unknown}) => Promise<void>;
}