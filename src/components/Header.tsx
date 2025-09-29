import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Gamepad2, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const Header: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { balance, stats } = useGameStore();

  return (
    <header className="border-b border-purple-500/20 backdrop-blur-xl bg-black/90 relative">
      {/* Animated border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Pulsing outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
              {/* Rotating border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-lg animate-spin opacity-50" style={{ animationDuration: '3s' }}></div>
              <div className="relative bg-black p-3 rounded-lg border border-purple-500/30">
                <Gamepad2 className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                SOL Battle Arena
              </h1>
              <p className="text-sm text-gray-400">Rock • Paper • Scissors</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-6">
            {connected && (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Balance Card with Neon Glow */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
                  <div className="relative bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span className="text-sm font-medium text-yellow-100">{balance.toFixed(4)} SOL</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats Card with Neon Glow */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
                  <div className="relative bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-400/30 group-hover:border-green-400/60 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-green-400 animate-bounce" style={{ animationDuration: '2s' }} />
                      <span className="text-sm font-medium text-green-100">{stats.wins}W / {stats.losses}L</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              {/* Animated neon glow for wallet button */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur-md group-hover:blur-lg opacity-75 animate-pulse"></div>
              <WalletMultiButton className="relative !bg-black/80 !border !border-purple-500/50 hover:!border-purple-400 !rounded-lg !font-medium !transition-all !duration-300 !transform hover:!scale-105 !text-white hover:!text-purple-200" />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
