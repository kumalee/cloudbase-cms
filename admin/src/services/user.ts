import { request } from 'umi';
import ENV from './env';
import { getCurrentUser } from './tcb'

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  if (SERVICE_ENV === ENV.TCB) {
    return getCurrentUser();
  }
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
