"use client";
import jsonCards from "@/json/cards.json";
import Image from "next/image";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

type Card = {
  id: number;
  image: string;
  name: string;
  isMatched: boolean;
  color: number;
};

type CardgameProps = {
  mode: "easy" | "medium" | "hard";
  setMode: (mode: "easy" | "medium" | "hard" | undefined) => void;
};

const containerVariant = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 2.0,
      staggerChildren: 2.0,
    },
  },
};

const cardVariant = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
  },
};

export const Cardgame = ({ mode, setMode }: CardgameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [flippeds, setFlippeds] = useState(0);
  const [scope, animate] = useAnimate();

  const animateScope = () => {
    animate(scope.current, { translateY: 0, transition: { duration: 0.5 } });
  };

  const getStars = (): number => {
    if (flippeds <= cards.length / 2) return 5;
    if (flippeds <= cards.length / 1.5) return 4;
    if (flippeds <= cards.length) return 3;
    if (flippeds <= cards.length * 1.5) return 2;
    if (flippeds <= cards.length * 2) return 1;
    return 0;
  };

  useEffect(() => {
    const aleatoriedCards = jsonCards.sort(() => Math.random() - 0.5);
    let loadedCards = aleatoriedCards.map((card, index) => ({
      id: index,
      image: card.image,
      name: card.name,
      isMatched: false,
      color: Math.floor(Math.random() * 6 + 1),
    }));

    switch (mode) {
      case "easy":
        loadedCards = loadedCards.slice(0, 4);
        break;
      case "medium":
        loadedCards = loadedCards.slice(0, 7);
        break;
      case "hard":
        loadedCards = loadedCards.slice(0, 10);
        break;
      default:
        break;
    }

    const duplicateCards = loadedCards.map((card, index) => ({
      ...card,
      id: index + loadedCards.length,
      color: Math.floor(Math.random() * 6 + 1),
    }));

    const combinedCards = [...loadedCards, ...duplicateCards];
    const shuffledCards = combinedCards.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
  }, [mode]);

  const flipCard = (index: number) => {
    if (flippedCards.length === 1 && flippedCards[0].id === cards[index].id)
      return;
    if (disabled) return;
    setFlippedCards((flippedCards) => [...flippedCards, cards[index]]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisabled(true);
      setFlippeds((flippeds) => flippeds + 1);
      const [card1, card2] = flippedCards;
      if (card1.image === card2.image) {
        setCards((cards) => {
          const newCards = [...cards];
          return newCards.map((card) => {
            if (card.id === card1.id || card.id === card2.id) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        setDisabled(false);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setDisabled(false);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.every((card) => card.isMatched) && cards.length > 0 && scope) {
      animateScope();
    }
  }, [cards]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">Jogo da Memória</h1>
        <div className="flex items-center justify-center gap-2">
          <FaStar
            className={getStars() >= 1 ? "text-yellow-500" : "text-gray-500"}
            size={34}
          />
          <FaStar
            className={getStars() >= 2 ? "text-yellow-500" : "text-gray-500"}
            size={37}
          />
          <FaStar
            className={getStars() >= 3 ? "text-yellow-500" : "text-gray-500"}
            size={40}
          />
          <FaStar
            className={getStars() >= 4 ? "text-yellow-500" : "text-gray-500"}
            size={37}
          />
          <FaStar
            className={getStars() >= 5 ? "text-yellow-500" : "text-gray-500"}
            size={34}
          />
        </div>
      </div>
      {mode && (
        <motion.div
          initial="hidden"
          animate="visible"
          key={mode}
          variants={containerVariant}
          className="flex flex-wrap justify-center items-center gap-2"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariant}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                flippedCards.length < 2 && !card.isMatched && flipCard(index)
              }
              className="shadow-md relative h-60 w-60 tems-center justify-center rounded-lg cursor-pointer overflow-hidden"
            >
              <AnimatePresence>
                {card.isMatched ||
                flippedCards.find(
                  (flippedCard) => flippedCard.id === card.id
                ) ? (
                  <motion.div
                    key={card.id}
                    className={`w-full h-full`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image
                      loading="eager"
                      src={card.image}
                      alt={card.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover object-center"
                    />
                    <h3 className="absolute w-full text-center text-2lg font-normal bottom-0 left-0 bg-primary p-2">
                      {card.name}
                    </h3>
                  </motion.div>
                ) : (
                  <div
                    key="back-card"
                    className={`p-8 card-${card.color} w-full h-full`}
                  >
                    <Image
                      loading="eager"
                      src="/ebd.jpg"
                      alt="Card"
                      width={288}
                      height={288}
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                    <p className="absolute text-center text-2lg font-normal bottom-0 right-0 p-2 px-4">
                      {index}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
      <div>
        <button
          className="p-4 px-8 mt-8 bg-gray-500 text-white rounded-md"
          onClick={() => setMode(undefined)}
        >
          Voltar
        </button>
      </div>
      <motion.div
        ref={scope}
        initial={{ translateY: 1000 }}
        className="bg-[rgba(0,0,0,0.9)] text-gray-100 fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-4"
      >
        <h4 className="text-5xl font-medium">🥳 Parabéns 🎉</h4>
        <div className="flex items-center justify-center gap-2">
          <FaStar
            className={getStars() >= 1 ? "text-yellow-500" : "text-gray-500"}
            size={39}
          />
          <FaStar
            className={getStars() >= 2 ? "text-yellow-500" : "text-gray-500"}
            size={42}
          />
          <FaStar
            className={getStars() >= 3 ? "text-yellow-500" : "text-gray-500"}
            size={45}
          />
          <FaStar
            className={getStars() >= 4 ? "text-yellow-500" : "text-gray-500"}
            size={42}
          />
          <FaStar
            className={getStars() >= 5 ? "text-yellow-500" : "text-gray-500"}
            size={39}
          />
        </div>
        <h5 className="text-2xl font-medium">Você fez {flippeds} jogadas</h5>
        <button
          className="p-4 px-8 bg-gray-500 text-white rounded-md"
          onClick={() => setMode(undefined)}
        >
          Jogar novamente
        </button>
      </motion.div>
    </div>
  );
};
