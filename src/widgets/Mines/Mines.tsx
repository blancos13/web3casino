import { useCallback, useEffect, useRef, useState } from "react";
import { useUnit } from "effector-react";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Image from "next/image";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import clsx from "clsx";

import background from "@/public/media/mines_images/mines_bg.webp";

import { sessionModel } from "@/entities/session";

import * as GameModel from "@/widgets/GamePage/model";

import { MineIcon } from "@/shared/SVGs/MineIcon";
import { MineGreenIcon } from "@/shared/SVGs/MineGreenIcon";
import { ArrowIconSwap } from "@/shared/SVGs/ArrSwiperIcon";
import { useDebounce } from "@/shared/tools";
import { ABI as ABIMines } from "@/shared/contracts/MinesABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { TOKENS } from "@/shared/tokens";

import { WagerModel } from "../WagerInputsBlock";
import { WagerModel as WagerButtonModel } from "../Wager";
import * as MinesModel from "./model";
import * as CustomInputWagerModel from "@/widgets/CustomWagerRangeInput/model";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import "swiper/scss";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { MineBombIcon } from "@/shared/SVGs/MineBomb";
import { MineMoneyIcon } from "@/shared/SVGs/MineMoneyIcon";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { Scrollbar } from "swiper/modules";
import { ProfitModel } from "../ProfitBlock";
import { FC } from "react";
import useSound from "use-sound";
import { Preload } from "@/shared/ui/Preload";

enum Tile {
  Closed,
  Selected,
  SelectedShaking,
  Coin,
  Bomb,
}

const maxReveal = [
  0, 24, 21, 17, 14, 12, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1,
  1,
];

interface MinesProps {
  gameInfoText: string;
}

export const Mines: FC<MinesProps> = ({ gameInfoText }) => {
  const initialGameField: Tile[] = [
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
  ];

  const initialPickedTiles = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const [pickedValue, pickMines, musicType] = useUnit([
    CustomInputWagerModel.$pickedRows,
    CustomInputWagerModel.pickRows,
    GameModel.$playSounds,
  ]);

  const [gameField, setGameField] = useState<Tile[]>(initialGameField);
  const [pickedTiles, setPickedTiles] = useState<boolean[]>([
    ...initialPickedTiles,
  ]);
  const [totalOpenedTiles, setTotalOpenedTiles] = useState<number>(0);

  const [playTileClick] = useSound(
    `/static/media/games_assets/mines/mineClick.mp3`,
    {
      playbackRate: (totalOpenedTiles + 1) / 25 + 0.5,
      volume: 1,
    }
  );

  const [fees, setFees] = useState<bigint>(BigInt(0));
  const [inGame, setInGame] = useState<boolean>(false);
  //const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [redrawTrigger, triggerRedraw] = useState<boolean>(true);

  const { isConnected, address } = useAccount();

  const { data } = useFeeData({ watch: true, cacheTime: 5000 });
  const { chain } = useNetwork();

  const [setIsPlaying, setSelectedLength] = useUnit([
    GameModel.setIsPlaying,
    MinesModel.setSelectedLength,
  ]);

  const [
    betsAmount,
    lost,
    profit,
    gameStatus,
    playSounds,
    gameAddress,
    currentBalance,
    cryptoValue,
    pickedToken,
    Wagered,
    setWagered,
    allowance,
    setGameStatus,
    setWonStatus,
    setLostStatus,
    stopWinning,
    setStopWinning,
    setCoefficient,
    waitingResponse,
    setWaitingResponse,
    refund,
    setRefund,
  ] = useUnit([
    CustomWagerRangeInputModel.$pickedValue,
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$gameStatus,
    GameModel.$playSounds,
    sessionModel.$gameAddress,
    sessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerModel.$pickedToken,
    WagerButtonModel.$Wagered,
    WagerButtonModel.setWagered,
    sessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    MinesModel.$stopWinning,
    MinesModel.setStopWinning,
    ProfitModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.$refund,
    GameModel.setRefund,
  ]);

  // useEffect(() => {
  //   setSelectedMine([]);
  // }, [pickedValue]);
  const { data: minesState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    functionName: "Mines_GetState",
    args: [address?.toLowerCase()],
    enabled: !inGame,
    //watch: isConnected,
    blockTag: "latest",
  });

  useEffect(() => {
    setTotalOpenedTiles(0);
    setPickedTiles(initialPickedTiles);
    triggerRedraw(true);
  }, [pickedValue]);

  const [preloading, setPreloading] = useState(true);

  const pickTile = (index: number) => {
    if (gameField[index] == Tile.Closed) {
      console.log("TILES", totalOpenedTiles, maxReveal[pickedValue]);
      if (!pickedTiles[index]) {
        if (totalOpenedTiles >= maxReveal[pickedValue]) {
          return;
        }
        setTotalOpenedTiles(totalOpenedTiles + 1);
      } else {
        setTotalOpenedTiles(totalOpenedTiles - 1);
      }
      musicType !== "off" && playTileClick();
      pickedTiles[index] = !pickedTiles[index];
      triggerRedraw(true);
    }
  };

  const setGameFields = (
    revealedTiles: boolean[],
    tilesPicked: boolean[] | undefined
  ) => {
    var openedTiles = 0;
    setGameField(
      revealedTiles.map((value: boolean) => {
        if (value) {
          openedTiles += 1;
          return Tile.Coin;
        } else {
          return Tile.Closed;
        }
      })
    );

    if (tilesPicked) {
      setPickedTiles(tilesPicked);
    }

    return openedTiles;
  };

  useEffect(() => {
    if (minesState && Number((minesState as any)?.blockNumber) != 0) {
      setInGame(true);
      if (Number((minesState as any)?.requestID) != 0) {
        setWaitingResponse(true);
        setTotalOpenedTiles(
          setGameFields((minesState as any)?.revealedTiles as any, undefined)
        );
        pickMines((minesState as any)?.numMines as any);
      } else {
        setWaitingResponse(false);
        setTotalOpenedTiles(
          setGameFields((minesState as any)?.revealedTiles as any, undefined)
        );
        pickMines((minesState as any)?.numMines as any);
      }
    } else {
      // setInGame(false);
      // setGameFields([...initialPickedTiles], [...initialPickedTiles]);
    }
  }, [minesState as any]);

  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  const [isCashout, setIsCashout] = useState(true);

  useEffect(() => {
    if (stopWinning === "NO") {
      setIsCashout(false);
    } else {
      setIsCashout(true);
    }
  }, [stopWinning]);

  // const { config: startPlayingConfig, error } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: ABIMines,
  //   functionName: "Mines_Start",
  //   args: [
  //     useDebounce(
  //       BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //     ),
  //     pickedToken?.contract_address,
  //     pickedValue,
  //     pickedTiles,
  //     isCashout,
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //       pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //       : BigInt(0)),
  //   enabled: !inGame,
  // });

  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));
  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error: errorWrite,
  } = useContractWrite({
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    functionName: "Mines_Start",
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
      pickedValue,
      pickedTiles,
      isCashout,
    ],
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
        : BigInt(0)),
    //enabled: !inGame,
  });

  // const { config: startRevealingConfig } = usePrepareContractWrite({

  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: ABIMines,
  //   functionName: "Mines_Reveal",
  //   args: [pickedTiles, isCashout],
  //   value:
  //     fees +
  //     (pickedToken &&
  //       pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //       : BigInt(0)),
  //   enabled: inGame,
  // });

  const {
    write: startRevealing,
    isSuccess: startedRevealing,
    error: errorReveal,
  } = useContractWrite({
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    functionName: "Mines_Reveal",
    args: [pickedTiles, isCashout],
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
        : BigInt(0)),
  });

  // const { config: finishGameConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: ABIMines,
  //   functionName: "Mines_End",
  //   args: [],
  //   enabled: inGame,
  // });

  const { write: finishPlaying, isSuccess: finishGameSuccess } =
    useContractWrite({
      chainId: chain?.id,
      address: gameAddress as `0x${string}`,
      abi: ABIMines,
      functionName: "Mines_End",
      args: [],
      gas: BigInt(100000),
      gasPrice: prevGasPrice,
    });

  // const {
  //   data: GameState,
  //   refetch: fetchGameState,
  //   error: readErr,
  // } = useContractRead({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: ABIMines,
  //   functionName: "Mines_GetState",
  //   args: [address],
  //   enabled: true,
  //   watch: isConnected,
  // });

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  useEffect(() => {
    if (startedPlaying) {
      setInGame(true);
    }
  }, [startedPlaying]); // startedRevealing

  useEffect(() => {
    if (startedPlaying || startedRevealing) {
      setWaitingResponse(true);
    }
  }, [startedPlaying, startedRevealing]);

  const { config: allowanceConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: pickedToken?.contract_address as `0x${string}`,
    abi: IERC20,
    functionName: "approve",
    enabled:
      pickedToken?.contract_address !=
      "0x0000000000000000000000000000000000000000",
    args: [
      gameAddress,
      useDebounce(
        currentBalance
          ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
          : 0
      ),
    ],
    gasPrice: data?.gasPrice as any,
    gas: BigInt(50000),
  });

  const {
    write: setAllowance,
    error: allowanceError,
    status: allowanceStatus,
    data: allowanceData,
  } = useContractWrite(allowanceConfig);
  // const { config: refundConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: ABIMines,
  //   functionName: "Mines_Refund",
  //   enabled: isPlaying,
  //   args: [],
  //   gas: BigInt(100000),
  // });
  // const { write: callRefund } = useContractWrite(refundConfig);

  // useEffect(() => {
  //   if (refund) {
  //     callRefund?.();
  //     setRefund(false);
  //   }
  // }, [refund]);
  const [watchAllowance, setWatchAllowance] = useState<boolean>(false);

  useEffect(() => {
    if (allowanceData) {
      setWatchAllowance(true);
    }
  }, [allowanceData]);

  const { isSuccess: allowanceIsSet } = useWaitForTransaction({
    hash: allowanceData?.hash,
    enabled: watchAllowance,
  });

  useEffect(() => {
    if (inGame && allowanceIsSet && watchAllowance) {
      setWatchAllowance(false);
      startPlaying();
    } else if (allowanceError || (inGame && errorWrite)) {
      setWatchAllowance(false);
      setWaitingResponse(false);
      setInGame(false);
      setWaitingResponse(false);
    }
  }, [inGame, allowanceIsSet, allowanceError, errorWrite]);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    functionName: "getVRFFee",
    args: [0],
    watch: isConnected,
  });

  useEffect(() => {
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1000000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
    }
  }, [VRFFees, data]);

  useEffect(() => {
    if (Wagered) {
      if (inGame) {
        if (
          !waitingResponse &&
          pickedTiles.filter((value) => value).length > 0
        ) {
          startRevealing?.();
          //alert(2);
        } else {
          finishPlaying?.();
        }
      } else {
        if (
          cryptoValue != 0 &&
          currentBalance &&
          cryptoValue <= currentBalance
        ) {
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            if (setAllowance) {
              setAllowance();
              setWaitingResponse(true);
              setInGame(true);
              setWaitingResponse(true);
            }
          } else {
            if (pickedTiles.map((value) => value).length > 0) {
              startPlaying?.();
            }
          }
        }
      }
      setWagered(false);
    }
  }, [Wagered]);

  const [finish, setFinish] = useState(false);
  const [lostArr, setLostArr] = useState<any[]>([]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    eventName: "Mines_Reveal_Event",

    listener(log) {
      const receivedEndEvent = log.find(
        (el) => (el as any).eventName === "Mines_End_Event"
      );
      // if (receivedEndEvent) {
      //   return;
      // }
      if ((log[0] as any).eventName === "Mines_Reveal_Event") {
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          const mines = (log[0] as any).args.minesTiles;
          const revealed = (log[0] as any).args.revealedTiles;
          const wagered = (receivedEndEvent as any).args.wager;
          const handlePayouts = async () => {
            setCoefficientData((prev) => [
              Number((log[0] as any)?.args?.payout) / Number(wagered),
              ...prev,
            ]);
          };
          handlePayouts();
          const newGameField = gameField.map((value, index) => {
            if (mines[index]) {
              return Tile.Bomb;
            } else if (revealed[index]) {
              return Tile.Coin;
            } else {
              return value;
            }
          });
          setWaitingResponse(false);
          setGameField(newGameField);
          setTotalOpenedTiles(0);
          setPickedTiles([...initialPickedTiles]);
        }
      }
    },
  });

  const [coefficientData, setCoefficientData] = useState<number[]>([]);
  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    eventName: "Mines_End_Event",
    listener(log) {
      const receivedEndEvent = log.find(
        (el) => (el as any).eventName === "Mines_End_Event"
      );
      if (
        (
          (receivedEndEvent as any).args.playerAddress as string
        ).toLowerCase() == address?.toLowerCase()
      ) {
        setWaitingResponse(false);
        setTimeout(() => {
          setInGame(false);
          triggerRedraw(true);
          setGameFields(initialPickedTiles, [...initialPickedTiles]);
        }, 2000);

        const wagered = (receivedEndEvent as any).args.wager;
        // const handlePayouts = async () => {
        //   setCoefficientData((prev) => [
        //     Number((log[0] as any)?.args?.payout) / Number(wagered),
        //     ...prev,
        //   ]);
        // };
        // handlePayouts();
        if ((receivedEndEvent as any).args.payout > 0) {
          const profit = (receivedEndEvent as any).args.payout;
          const multiplier = Number(profit / wagered);
          const wagered_token = (
            (receivedEndEvent as any).args.tokenAddress as string
          ).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name;
          const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
          setWonStatus({
            profit: profitFloat,
            multiplier,
            token: token as string,
          });
          setGameStatus(GameModel.GameStatus.Won);
        } else {
          const wageredFloat =
            Number(wagered / BigInt(10000000000000000)) / 100;
          setLostStatus(wageredFloat);
          setGameStatus(GameModel.GameStatus.Lost);
        }
      }
    },
  });

  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);

  const [gameResult, setGameResult] = useState<
    { value: number; status: "won" | "lost" }[]
  >([]);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);
      setGameResult((prev) => [
        ...prev,
        { value: profit / cryptoValue, status: "won" },
      ]);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
      setGameResult((prev) => [...prev, { value: 0.0, status: "lost" }]);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  const [stopGame, setStopGame] = useState(false);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setStopGame(true);
      setFinish(true);
    }
  }, [gameStatus]);

  const [copySelectedArr, setCopySelectedArr] = useState<number[]>([]);
  // useEffect(() => {
  //   if (finish) {
  //     setTimeout(() => {
  //       setStartedArr(defaultValue);
  //       setCopySelectedArr((prev) => [...prev, ...selectedMine]);
  //       setSelectedMine([]);
  //       setLostArr([]);
  //     }, 3000);
  //   }
  // }, [finish]);

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setIsCashout(true);
      setCopySelectedArr([]);
    }
  }, [gameStatus]);

  const {
    data: coefficient,
    refetch: fetchRevealCount,
    error: revealErr,
  } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ABIMines,
    functionName: "Mines_GetMultipliers",
    args: [pickedValue, pickedTiles.filter((v) => v).length],
    enabled: true,
    watch: isConnected,
  });

  const [revelNum, setRevealNum] = useState<any>([]);
  useEffect(() => {
    if (Wagered && cryptoValue > 0 && coefficient) {
      setRevealNum((prev: any[]) => {
        if (Array.isArray(prev) && prev && prev?.length > 0) {
          return [coefficient as bigint];
        } else {
          return [...prev, coefficient as bigint];
        }
      });
    }
  }, [Wagered]);

  useEffect(() => {
    if (coefficient) {
      setCoefficient(Number(coefficient as bigint) / 10000);
    } else {
      setCoefficient(0);
    }
  }, [useDebounce(coefficient, 50)]);

  const [taken, setTaken] = useState(false);
  const [localAmount, setLocalAmount] = useState<any>(0);
  const [localCryptoValue, setLocalCryptoValue] = useState(0);
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true);
      setLocalAmount(betsAmount);
      setLocalCryptoValue(cryptoValue);
    }
  }, [betsAmount, cryptoValue, isPlaying]);

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);
      setGameResult((prev) => [
        ...prev,
        { value: localCryptoValue * localAmount, status: "won" },
      ]);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
      setGameResult((prev) => [...prev, { value: 0.0, status: "lost" }]);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);
  return (
    <>
      {errorWrite && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={styles.wrapp}>
        <div className={styles.mines_table_wrap}>
          {preloading && <Preload />}
          <WagerLowerBtnsBlock
            className={styles.mines_block}
            game="mines"
            text={gameInfoText}
          />
          <div className={styles.mines_table_background}>
            <Image
              onLoad={() => setPreloading(false)}
              src={background}
              className={styles.mines_table_background_img}
              alt="table-bg"
              width={1418}
              height={680}
              quality={100}
            />
          </div>
          <div className={styles.total_container}>
            <span className={styles.total_won}>{fullWon.toFixed(2)}</span>
            <span className={styles.total_lost}>{fullLost.toFixed(2)}</span>
            <div>
              Total:{" "}
              <span
                className={clsx(
                  totalValue > 0 && styles.total_won,
                  totalValue < 0 && styles.total_lost
                )}
              >
                {Math.abs(totalValue).toFixed(2)}
              </span>
            </div>
          </div>
          <div className={clsx(styles.balls_arr)}>
            {coefficientData.map((item, i) => (
              <div
                className={clsx(
                  styles.multiplier_value,
                  item > 0
                    ? styles.multiplier_positive
                    : styles.multiplier_negative
                )}
                key={i}
              >
                {item?.toFixed(2)}x
              </div>
            ))}
          </div>
          <div
            className={styles.mines_table}
            // onMouseDown={() => setIsMouseDown(true)}
            // onMouseUp={() => setIsMouseDown(false)}
          >
            {
              redrawTrigger &&
                gameField &&
                pickedTiles &&
                gameField.map((value, index) => {
                  const isPicked = value == Tile.Closed && pickedTiles[index];
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        pickTile(index);
                      }}
                      //onMouseEnter={() => handleMouseMove(index)}
                      className={clsx(
                        styles.mine,
                        isPicked && styles.mine_selected,
                        isPicked &&
                          inGame &&
                          !copySelectedArr.includes(index) &&
                          ""
                        // styles.mine_animation
                      )}
                    >
                      <MineIcon
                        className={clsx(
                          styles.mine_main,
                          isPicked && styles.mine_selected
                        )}
                      />

                      <SelectedMine
                        index={index}
                        type={isPicked ? Tile.Selected : value}
                        waitingResponse={waitingResponse}
                      />
                    </div>
                  );
                })
              /* {mineArr.map((index) => {
                const isSelected = selectedMine.includes(index);
                // isActive && alert(isActive?.tilesPicked[24]);
                return (
                  <div
                    key={index}
                    onClick={() => toggleMineSelection(index)}
                    onMouseEnter={() => handleMouseMove(index)}
                    className={clsx(
                      styles.mine,
                      isSelected && styles.mine_selected,
                      isSelected &&
                      inGame &&
                      !copySelectedArr.includes(index) &&
                      ""
                      // styles.mine_animation
                    )}
                  >
                    <MineIcon
                      className={clsx(
                        styles.mine_main,
                        isSelected && styles.mine_selected
                      )}
                    />

                    <SelectedMine
                      bombArr={bombArr}
                      index={index}
                      finish={finish}
                      finishGameSuccess={finishGameSuccess}
                      isCashout={isCashout}
                      selectedMine={selectedMine}
                      startedPlaying={startedPlaying}
                      stepArr={stepArr}
                    />
                  </div>
                );
              })} */
            }
          </div>{" "}
          {/* <div className={styles.bottom_wrapper}>
            <div className={styles.bottom}>
              <Swiper
                ref={swiperRef}
                slidesPerView="auto"
                direction="horizontal"
                scrollbar={{
                  el: ".scroll-bar",
                  draggable: true,
                }}
                centeredSlides={false}
                className={styles.swiper}
                modules={[Scrollbar]}
              >
                {revelNum?.length > 0 &&
                  revelNum.map((el: bigint, index: number) => {
                    return (
                      <SwiperSlide key={index} className={styles.swiper_slide}>
                        <span>{index + 1}</span>Х
                        {(Number(el) / 10000).toFixed(2)}
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div
              className={clsx(styles.arr, styles.arr_prev)}
              onClick={handlePrev}
            >
              <ArrowIconSwap
                className={clsx(styles.arr_icon, styles.arr_icon_left)}
              />
            </div>
            <div
              className={clsx(styles.arr, styles.arr_next)}
              onClick={handleNext}
            >
              <ArrowIconSwap
                className={clsx(styles.arr_icon, styles.arr_icon_right)}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

interface ISelectedMine {
  // isSelected: boolean;
  // finishGameSuccess: boolean;
  // startedPlaying: boolean;
  // finish: boolean;
  // index: number;
  // isCashout: boolean;
  // stepArr: any;
  // isBomb: boolean
  type: Tile;
  waitingResponse: boolean;
  index: number;
}
const SelectedMine = (props: ISelectedMine) => {
  const { type, waitingResponse, index } = props;

  if (type == Tile.Coin) {
    return (
      <MineMoneyIcon
        className={clsx(styles.mine_green, styles.mine_selected)}
      />
    );
  } else if (type == Tile.Bomb) {
    return (
      <MineBombIcon className={clsx(styles.mine_green, styles.mine_selected)} />
    );
  } else if (type == Tile.Selected) {
    return (
      <MineGreenIcon
        className={clsx(
          styles.mine_green,
          styles.mine_selected,
          waitingResponse && styles.mine_animation,
          waitingResponse && styles[`style-${index}`]
        )}
      />
    );
  } else if (type == Tile.SelectedShaking) {
    return (
      <MineGreenIcon
        className={clsx(
          styles.mine_green,
          styles.mine_selected,
          styles.mine_animation,
          styles[`style-${index}`]
        )}
      />
    );
  }
};
