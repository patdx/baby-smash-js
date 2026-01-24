import { lazy, Suspense, useEffect } from 'react';
import { Layout } from './components/layout';
import { Loading } from './components/loading';
import { getSerwist } from 'virtual:serwist';

const Game = lazy(() => import('./components/game').then((m) => ({ default: m.Game })));

export function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      void getSerwist().then((sw) => sw?.register());
    }
  }, []);

  return (
    <Layout>
      <Suspense fallback={<Loading comment="game" />}>
        <Game />
      </Suspense>
    </Layout>
  );
}
