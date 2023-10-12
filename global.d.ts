module '*.module.scss';

declare interface AxiosResponse<R = any> {
  success: boolean;
  t: number;
  result: R;
}

declare interface DefaultRequest {
  pageNo: number;
  pageSize: number;
}

declare interface DefaultResponse {
  page_no: number;
  page_size: number;
  total: number;
}

declare interface Dictionary<T> {
  [index: string]: T;
}

declare interface NumericDictionary<T> {
  [index: number]: T;
}

declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.svg';

declare module '*.webp';

declare module '*.gif';
