import { useEffect } from 'react';

export const useTitle = (title, faviconUrl = null) => {
  useEffect(() => {
    document.title = `${title} | Viridian Forest`;

    if (faviconUrl) {
      const favicon = document.querySelector("link[rel*='icon']");
      if (favicon) {
        favicon.href = faviconUrl;
      }
    }
  }, [title, faviconUrl]);
};