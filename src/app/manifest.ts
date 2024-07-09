import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baby Smash JS',
    short_name: 'Baby Smash JS',
    icons: [
      {
        src: '/assets/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/assets/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    id: '/',
    start_url: '/',
    display: 'fullscreen',
  };
}
