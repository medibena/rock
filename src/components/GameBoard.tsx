import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Hand, Scissors, FileText, Coins, Users, Clock, Trophy, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { toast } from 'react-hot-toast';

const moves = [
  { id: 1, name: 'Rock', icon: Hand, color: 'from-red-500 to-red-600', neon: 'red' },
  { id: 2, name: 'Paper', icon: FileText, color: 'from-blue-500 to-blue-600', neon: 'blue' },
  { id: 3, name: 'Scissors', icon: Scissors, color: 'from-green-500 to-green-600', neon: 'green' },
];

export const GameBoard: React.FC = () => {
  const { connected } = useWallet();
  const { currentGame, createGame, joinGame, isLoading } = useGameStore();
  const [selectedMove, setSelectedMove] = useState<number | null>(null);
  const [wagerAmount, setWagerAmount] = useState(0.1);
  const [gameMode, setGameMode] = useState<'create' | 'join'>('create');

  const handleCreateGame = async () => {
    if (!selectedMove) {
      toast.error('Please select your move first!');
      return;
    }

    try {
      await createGame(wagerAmount, selectedMove);
      toast.success('Game created! Waiting for opponent...');
    } catch (error) {
      toast.error('Failed to create game');
    }
  };

  const handleJoinGame = async () => {
    if (!selectedMove) {
      toast.error('Please select your move first!');
      return;
    }

    try {
      await joinGame('mock-game-id', selectedMove);
      toast.success('Joined game! Battle begins...');
    } catch (error) {
      toast.error('Failed to join game');
    }
  };

  if (!connected) {
    return (
      <motion.div 
        className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
        
        <div className="text-center relative z-10">
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* Pulsing outer ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            {/* Rotating ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-transparent to-cyan-500 rounded-full animate-spin opacity-75" style={{ animationDuration: '3s' }}></div>
            <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center border border-purple-500/50">
              <Users className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-6">
            Connect your Solana wallet to start battling other players in Rock Paper Scissors!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Game Mode Selector with Neon Buttons */}
      <motion.div 
        className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
        
        <div className="flex space-x-4 mb-6 relative z-10">
          {/* Create Game Button */}
          <motion.button
            onClick={() => setGameMode('create')}
            className={`relative flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
              gameMode === 'create' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {gameMode === 'create' && (
              <>
                {/* Animated neon background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                {/* Flowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </>
            )}
            {gameMode !== 'create' && (
              <div className="absolute inset-0 bg-gray-800/50 group-hover:bg-gray-700/50 transition-all duration-300"></div>
            )}
            <span className="relative z-10">Create Game</span>
          </motion.button>

          {/* Join Game Button */}
          <motion.button
            onClick={() => setGameMode('join')}
            className={`relative flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
              gameMode === 'join' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {gameMode === 'join' && (
              <>
                {/* Animated neon background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                {/* Flowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </>
            )}
            {gameMode !== 'join' && (
              <div className="absolute inset-0 bg-gray-800/50 group-hover:bg-gray-700/50 transition-all duration-300"></div>
            )}
            <span className="relative z-10">Join Game</span>
          </motion.button>
        </div>

        {gameMode === 'create' && (
          <div className="mb-6 relative z-10">
            <label className="block text-sm font-medium mb-2 text-gray-300">Wager Amount (SOL)</label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg blur-md group-focus-within:blur-lg transition-all duration-300"></div>
              <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400 z-10" />
              <input
                type="number"
                value={wagerAmount}
                onChange={(e) => setWagerAmount(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0.01"
                className="relative w-full pl-10 pr-4 py-3 bg-black/80 border border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/60 transition-all duration-300 text-white placeholder-gray-500"
                placeholder="0.1"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Move Selection with Enhanced Neon Effects */}
      <motion.div 
        className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
        
        <h3 className="text-xl font-bold mb-6 text-center relative z-10 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Choose Your Move
        </h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
          {moves.map((move, index) => {
            const Icon = move.icon;
            const isSelected = selectedMove === move.id;
            
            return (
              <motion.button
                key={move.id}
                onClick={() => setSelectedMove(move.id)}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 overflow-hidden group ${
                  isSelected
                    ? 'border-purple-400 text-white'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {/* Background effects */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                {isSelected && (
                  <>
                    {/* Pulsing neon background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${move.color} opacity-20 animate-pulse`}></div>
                    {/* Rotating border glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${move.color} opacity-30 blur-md animate-pulse`}></div>
                    {/* Scanning line effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-2000"></div>
                  </>
                )}

                <div className={`relative w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${move.color} rounded-full flex items-center justify-center ${isSelected ? 'animate-pulse' : ''}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium text-center relative z-10">{move.name}</p>
                
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-400 rounded-xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Animated corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 animate-pulse"></div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Epic Battle Button */}
        <motion.button
          onClick={gameMode === 'create' ? handleCreateGame : handleJoinGame}
          disabled={!selectedMove || isLoading}
          className="relative w-full py-4 rounded-lg font-medium transition-all duration-300 overflow-hidden group disabled:cursor-not-allowed"
          whileHover={{ scale: selectedMove && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: selectedMove && !isLoading ? 0.98 : 1 }}
        >
          {/* Animated neon background */}
          {selectedMove && !isLoading && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Lightning effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 blur-lg opacity-50 animate-pulse"></div>
            </>
          )}
          
          {(!selectedMove || isLoading) && (
            <div className="absolute inset-0 bg-gray-800/50"></div>
          )}

          <div className="relative z-10 flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>{gameMode === 'create' ? 'Create' : 'Join'} Battle</span>
                <Zap className="w-5 h-5" />
              </>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Current Game Status with Enhanced Dark Theme */}
      <AnimatePresence>
        {currentGame && (
          <motion.div 
            className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.1),transparent_50%)]"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Current Battle
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>2 min ago</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
              <div className="bg-black/40 rounded-lg p-4 border border-green-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent"></div>
                <div className="flex items-center space-x-2 mb-2 relative z-10">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-100">You</span>
                </div>
                <p className="text-xs text-gray-400 relative z-10">Move: Hidden</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-4 border border-red-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-red-400/10 to-transparent"></div>
                <div className="flex items-center space-x-2 mb-2 relative z-10">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-100">Opponent</span>
                </div>
                <p className="text-xs text-gray-400 relative z-10">Waiting...</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm relative z-10">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-yellow-400 animate-bounce" style={{ animationDuration: '2s' }} />
                <span className="text-yellow-100">Prize Pool: {(wagerAmount * 2).toFixed(3)} SOL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-purple-100">Winner takes all</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
