export default function useAnalytics() {
  if (typeof window !== 'undefined' && window.gtag) {
    return window.gtag;
  }
  return () => {};
}
