import axiosInstance from 'src/utils/axios';

export function countDownload() {
  return axiosInstance.post('count-download');
}

export function progressDownload({ page }: { page: number }) {
  return axiosInstance.post('progress-download', {
    page,
  });
}
