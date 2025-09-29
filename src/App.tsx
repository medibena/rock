import React from 'react';
import { WalletProvider } from './components/WalletProvider';
import { GameProvider } from './store/gameStore';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { GameHistory } from './components/GameHistory';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <WalletProvider>
      <GameProvider>
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          <BackgroundEffects />
          <div className="relative z-10">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <GameBoard />
                </div>
                <div className="lg:col-span-1">
                  <GameHistory />
                </div>
              </div>
            </main>
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0a0a0a',
                color: '#fff',
                border: '1px solid #8b5cf6',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              },
            }}
          />
        </div>
      </GameProvider>
    </WalletProvider>
  );
}

export default App;
