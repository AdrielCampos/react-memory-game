type LandpageProps = {
  setMode: (mode: "easy" | "medium" | "hard" | undefined) => void;
};

export const Landpage = ({ setMode }: LandpageProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center ">Jogo da Memória</h1>
      <section className="flex flex-col items-center">
        <p className="text-lg text-center">
          Jogo da memória com os missionários da INA.
        </p>
        <div className="flex justify-around items-center w-full flex-wrap">
          <button
            className="p-4 px-8 mt-8 bg-green-500 text-white rounded-md"
            onClick={() => setMode("easy")}
          >
            Fácil
          </button>
          <button
            className="p-4 px-8 mt-8 bg-blue-500 text-white rounded-md"
            onClick={() => setMode("medium")}
          >
            Médio
          </button>
          <button
            className="p-4 px-8 mt-8 bg-red-500 text-white rounded-md"
            onClick={() => setMode("hard")}
          >
            Difícil
          </button>
        </div>
      </section>
      <footer className="text-sm text-center">
        <p>Desenvolvido por: </p>
        <a
          href="https://github.com/AdrielCampos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Adriel Campos
        </a>
      </footer>
    </>
  );
};
