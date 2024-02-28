import axioslib, { Method, AxiosHeaders } from 'axios';
import { message } from 'antd';

export const QUIT_LOGIN_CODE = [401, '401'];

export const LOGIN_PATH = '/login';

export type BaseResult<T> = T;

const DEFAULT_AXIOS_TIMEOUT = 15000;

export const axios = axioslib.create({
  timeout: DEFAULT_AXIOS_TIMEOUT
});

function createFormData<F>(forData: F): FormData | null {
  if (!forData) {
    return null;
  }
  const data = new FormData();
  Object.entries(forData).forEach(([name, value]) => {
    data.append(name, value as string);
  });
  return data;
}

function pathReplace<P>(url: string, path: P): string {
  if (!path) {
    return url;
  }
  let nextApi = url;
  Object.entries(path).forEach(([name, value]) => {
    const encodedValue = encodeURIComponent(value + '');
    nextApi = nextApi.replace(`{${name}}`, encodedValue);
  });
  return nextApi;
}

export default async function ajax<P, Q, B, H extends AxiosHeaders | null, F, R>(
  method: Method,
  url: string,
  path: P,
  query: Q,
  body: B,
  headers: H,
  formData: F
): Promise<R> {
  try {
    const response = (
      await axios({
        method,
        // @ts-ignore
        // eslint-disable-next-line
        url: `${API_PREFIX || ''}${pathReplace(url, path)}`,
        params: query,
        data: body || createFormData(formData),
        headers: headers || undefined
      })
    ).data;
    if (!response.success) {
      message.error({
        className: 'error-message',
        content: response?.msg || response?.errorMsg || response?.message,
        duration: 3,
        onClose() {
          if (QUIT_LOGIN_CODE.includes(response?.data?.code)) {
            location.href = LOGIN_PATH;
          }
        }
      });
    }
    return response;
  } catch (error) {
    return {} as R;
  }
}
