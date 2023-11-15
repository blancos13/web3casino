import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { useAccount, useConnect } from "wagmi";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import s from "@/pages/games/CoinFlip/styles.module.scss";
import styles from "./styles.module.scss";
import { Dice } from "@/widgets/Dice/Dice";
import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import clsx from "clsx";
import Head from "next/head";
// import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import * as DGM from "@/widgets/Dice/model";

const WagerContent = () => {
  const isMobile = document.documentElement.clientWidth < 700;
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [pressButton] = useUnit([WagerModel.pressButton]);

  const [isPlaying] = useUnit([DGM.$isPlaying]);

  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Bets"
        min={1}
        max={100}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <WagerGainLoss />
      <ProfitBlock />
      {!isMobile && (
        <button
          className={s.connect_wallet_btn}
          onClick={() => {
            if (!isConnected) {
              connect({ connector: connectors[0] });
            } else {
              pressButton();
              (window as any).fbq("track", "Purchase", {
                value: 0.0,
                currency: "USD",
              });
            }
          }}
        >
          {isConnected
            ? "Play"
            : isPlaying && isConnected
            ? "Playing"
            : "Connect Wallet"}
        </button>
      )}
    </>
  );
};

export default function DiceGame() {
  return (
    <>
      <Head>
        <title>Games - Dice</title>
      </Head>
      <Layout activePageLink="/games/Dice" gameName="Dice">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Dice"]} />
        <div className={styles.dice_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Dice"
            gameTitle="Dice"
            wagerContent={<WagerContent />}
          >
            <Dice />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
