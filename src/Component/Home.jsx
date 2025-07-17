import React, { useState, useEffect } from 'react';

const Home = () => {
  // Gradient colors
  const colorSets = [
    'from-pink-400 to-purple-500',
    'from-purple-400 to-blue-400',
    'from-rose-400 to-pink-500',
  ];
  const [currentColor, setCurrentColor] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  // Game hearts positions
  const [hearts, setHearts] = useState([]);

  // Color cycle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colorSets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Game timer
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  // Generate hearts for game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(10);
    setHearts([]);
    
    const heartInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 80 + 10,
          speed: Math.random() * 2 + 1,
        },
      ]);
    }, 500);

    setTimeout(() => {
      clearInterval(heartInterval);
      setTimeout(() => setGameStarted(false), 2000);
    }, 10000);
  };

  // Catch a heart
  const catchHeart = (id) => {
    setScore((prev) => prev + 1);
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  };

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center 
                    bg-gradient-to-br ${colorSets[currentColor]} 
                    text-white transition-colors duration-1000 overflow-hidden`}>
      
      {/* Floating background hearts */}
      {!gameStarted && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-white opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 120}%`,
                fontSize: `${Math.random() * 3 + 2}rem`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 20 + 10}s`,
              }}
            >
              fih❤️
            </div>
          ))}
        </div>
      )}

      {/* Game UI */}
      {gameStarted && (
        <>
          <div className="fixed top-4 left-4 text-2xl font-bold z-50">
            Time: {timeLeft}s
          </div>
          <div className="fixed top-4 right-4 text-2xl font-bold z-50">
            Score: {score}
          </div>
          
          {hearts.map((heart) => (
            <button
              key={heart.id}
              className="fixed text-red-500 text-5xl cursor-pointer animate-fall"
              style={{
                left: `${heart.left}%`,
                top: '-100px',
                animationDuration: `${heart.speed}s`,
              }}
              onClick={() => catchHeart(heart.id)}
            >
              ❤️
            </button>
          ))}
        </>
      )}

      {/* Main content */}
      {!gameStarted && (
        <div className="relative z-10 text-center max-w-md mx-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            For You <span className="animate-pulse">💖</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8">
            {score > 0 
              ? `You caught ${score} hearts! You're amazing!` 
              : "Click the button for a surprise!"}
          </p>

          <button 
            className="px-8 py-4 text-xl md:text-2xl rounded-full bg-white bg-opacity-90 
                     text-pink-600 font-bold shadow-lg hover:scale-110 
                     transform transition-all duration-300 hover:shadow-xl animate-pulse"
            onClick={startGame}
          >
            {score > 0 ? 'Play Again!' : 'Click for a Game!'}
          </button>
        </div>
      )}

      {/* Game over overlay */}
      {gameStarted && timeLeft <= 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white text-pink-600 p-8 rounded-xl text-center max-w-xs mx-4">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-6">You caught {score} hearts!</p>
            <button 
              className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg w-full"
              onClick={() => setGameStarted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
        @keyframes fall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(100vh); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;