// import Link from 'next/link';
// import Layout from '../components/Layout';

import dynamic from 'next/dynamic';
// import { Game } from '../components/Game';

const Game = dynamic(
  () => import('../components/Game').then((m) => m.Game) as any,
  {
    ssr: false,
  }
);

const IndexPage = () => <Game></Game>;

export default IndexPage;
