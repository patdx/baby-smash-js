import dynamic from 'next/dynamic';
import { Layout } from '../components/layout';

const Game = dynamic(
  () => import('../components/game').then((m) => m.Game) as any,
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
