import dynamic from 'next/dynamic';
import { Loading } from '../components/loading';
import { Suspense } from 'react';

const LazyGame = dynamic(() => import('../components/lazy-game'), {
  ssr: false,
  loading: () => <Loading comment="game" />,
});

export default function RootPage() {
  return <LazyGame />;
}
