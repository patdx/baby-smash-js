// import Link from 'next/link';
// import Layout from '../components/Layout';

import dynamic from 'next/dynamic';
import { Layout } from '../components/layout-tmp';
// import { Game } from '../components/Game';

const Game = dynamic(
  () => import('../components/game-tmp').then((m) => m.Game) as any,
  {
    ssr: false,
  }
);

const IndexPage = () => (
  <Layout>
    <Game></Game>
  </Layout>
);

export default IndexPage;
