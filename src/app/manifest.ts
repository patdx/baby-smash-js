import { MetadataRoute } from 'next';
import icon192 from '../assets/manifest-icon-192.png';
import icon512 from '../assets/manifest-icon-512.png';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baby Smash JS',
    short_name: 'Baby Smash JS',
    icons: [
      {
        src: icon192.src,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: icon512.src,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    start_url: '/',
    display: 'fullscreen',
  };
}
