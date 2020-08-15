import dynamic from 'next/dynamic';
import { Layout } from '../components/layout';

const Game = dynamic(
  () => import('../components/game').then((m) => m.Game) as any,
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Loading...
      </div>
    ),
  }
);

const IndexPage = () => (
  <Layout>
    <Game></Game>
  </Layout>
);

export default IndexPage;
