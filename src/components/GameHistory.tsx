import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Coins, Hand, Scissors, FileText, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const moveIcons = {
  1: Hand,
  2: FileText,
  3: Scissors,
};

const moveNames = {
  1: 'Rock',
  2: 'Paper',
  3: 'Scissors',
};

export const GameHistory: React.FC = () => {
  const { gameHistory } = useGameStore();

  return (
    <motion.div 
      className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      
      <div className="flex items-center space-x-2 mb-6 relative z-10">
        <div className="relative">
          <Trophy className="w-6 h-6 text-purple-400" />
          <div className="absolute inset-0 bg-purple-400 blur-md opacity-50 animate-pulse"></div>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Battle History
        </h2>
      </div>

      <div className="space-y-4 relative z-10">
        {gameHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full blur-md opacity-50"></div>
              <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center border border-gray-600/50">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400">No battles yet</p>
            <p className="text-sm text-gray-500 mt-1">Start your first game to see history</p>
          </div>
        ) : (
          gameHistory.map((game, index) => {
            const PlayerMoveIcon = moveIcons[game.playerMove as keyof typeof moveIcons];
            const OpponentMoveIcon = moveIcons[game.opponentMove as keyof typeof moveIcons];
            
            return (
              <motion.div
                key={game.id}
                className="bg-black/40 rounded-lg p-4 border border-gray-600/30 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border relative overflow-hidden ${
                    game.result === 'win' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : game.result === 'loss'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {game.result === 'win' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent animate-pulse"></div>
                    )}
                    <span className="relative z-10">
                      {game.result === 'win' ? 'Victory' : game.result === 'loss' ? 'Defeat' : 'Draw'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3 animate-pulse" />
                    <span>{game.timestamp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 relative z-10">
                  <div className="text-center">
                    <div className="relative w-8 h-8 mx-auto mb-1">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm animate-pulse"></div>
                      <div className="relative w-full h-full bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                        <PlayerMoveIcon className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">You</p>
                    <p className="text-xs font-medium text-blue-200">{moveNames[game.playerMove as keyof typeof moveNames]}</p>
                  </div>
                  
                  <div className="text-center flex items-center justify-center">
                    <div className="relative">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <div className="absolute inset-0 bg-purple-400 blur-md opacity-50 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative w-8 h-8 mx-auto mb-1">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm animate-pulse"></div>
                      <div className="relative w-full h-full bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                        <OpponentMoveIcon className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Opponent</p>
                    <p className="text-xs font-medium text-red-200">{moveNames[game.opponentMove as keyof typeof moveNames]}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs relative z-10">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-3 h-3 text-yellow-400 animate-pulse" />
                    <span className="text-gray-400">Wager: {game.wager} SOL</span>
                  </div>
                  {game.result === 'win' && (
                    <div className="flex items-center space-x-1 text-green-400 font-medium">
                      <span>+{(game.wager * 2).toFixed(3)} SOL</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {gameHistory.length > 0 && (
        <motion.button
          className="relative w-full mt-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden group rounded-lg border border-purple-500/30 hover:border-purple-400/60"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
          <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">
            View All History
          </span>
        </motion.button>
      )}
    </motion.div>
  );
};
