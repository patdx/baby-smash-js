import dynamic from 'next/dynamic';
import { Layout } from '../components/layout';
import { Loading } from '../components/loading';

const Game = dynamic(
  () => import('../components/game').then((m) => m.Game) as any,
  {
    ssr: false,
    loading: () => <Loading comment="game" />,
  }
);

const IndexPage = () => (
  <Layout>
    <Game></Game>
  </Layout>
);

export default IndexPage;
