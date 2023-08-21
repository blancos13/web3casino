import Head from 'next/head';
import { Header } from '@/widgets/header/index';
import Image from 'next/image';
import { GameLayout } from '../../../widgets/GameLayout/layout';
import { GameInfo } from '@/widgets/GameInfo';
import { CoinFlip as CoinFlipGame } from '@/widgets/CoinFlip';
import MinimalIcon from '@/public/media/games_assets/coinflip/minimal_icon.svg';

export default function CoinFlip() {
    return (
        <GameLayout children={[
            <GameInfo name={'Coin Flip'} description={'A simple heads-or-tails game. 50% chance of winning with a 1.98x multiplier. Simply type in your wager amount and flip the coin!'} image={MinimalIcon} />,
            <CoinFlipGame />
        ]} />
    );
}