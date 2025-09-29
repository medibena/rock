import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface GameState {
  balance: number;
  currentGame: Game | null;
  gameHistory: GameHistoryItem[];
  isLoading: boolean;
  stats: {
    wins: number;
    losses: number;
    draws: number;
  };
}

interface Game {
  id: string;
  player1: string;
  player2?: string;
  wagerAmount: number;
  status: 'waiting' | 'active' | 'finished';
  createdAt: number;
}

interface GameHistoryItem {
  id: string;
  playerMove: number;
  opponentMove: number;
  result: 'win' | 'loss' | 'draw';
  wager: number;
  timestamp: string;
}

type GameAction = 
  | { type: 'SET_BALANCE'; payload: number }
  | { type: 'SET_CURRENT_GAME'; payload: Game | null }
  | { type: 'ADD_GAME_HISTORY'; payload: GameHistoryItem }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_STATS'; payload: Partial<GameState['stats']> };

const initialState: GameState = {
  balance: 0,
  currentGame: null,
  gameHistory: [
    {
      id: '1',
      playerMove: 1,
      opponentMove: 3,
      result: 'win',
      wager: 0.1,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      playerMove: 2,
      opponentMove: 1,
      result: 'win',
      wager: 0.05,
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      playerMove: 3,
      opponentMove: 3,
      result: 'draw',
      wager: 0.2,
      timestamp: '1 day ago'
    }
  ],
  isLoading: false,
  stats: {
    wins: 12,
    losses: 8,
    draws: 3
  }
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_CURRENT_GAME':
      return { ...state, currentGame: action.payload };
    case 'ADD_GAME_HISTORY':
      return { 
        ...state, 
        gameHistory: [action.payload, ...state.gameHistory.slice(0, 9)] 
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_STATS':
      return { 
        ...state, 
        stats: { ...state.stats, ...action.payload } 
      };
    default:
      return state;
  }
}

interface GameContextType extends GameState {
  createGame: (wagerAmount: number, move: number) => Promise<void>;
  joinGame: (gameId: string, move: number) => Promise<void>;
  updateBalance: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const updateBalance = async () => {
    if (!publicKey || !connected) return;
    
    try {
      const balance = await connection.getBalance(publicKey);
      dispatch({ type: 'SET_BALANCE', payload: balance / LAMPORTS_PER_SOL });
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const createGame = async (wagerAmount: number, move: number) => {
    if (!publicKey) throw new Error('Wallet not connected');
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate game creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newGame: Game = {
        id: `game_${Date.now()}`,
        player1: publicKey.toString(),
        wagerAmount,
        status: 'waiting',
        createdAt: Date.now()
      };
      
      dispatch({ type: 'SET_CURRENT_GAME', payload: newGame });
      
      // Simulate finding opponent after 3 seconds
      setTimeout(() => {
        const updatedGame = {
          ...newGame,
          player2: 'opponent_address',
          status: 'active' as const
        };
        dispatch({ type: 'SET_CURRENT_GAME', payload: updatedGame });
        
        // Simulate game completion after 2 more seconds
        setTimeout(() => {
          const result = Math.random() > 0.5 ? 'win' : 'loss';
          const opponentMove = Math.floor(Math.random() * 3) + 1;
          
          const historyItem: GameHistoryItem = {
            id: newGame.id,
            playerMove: move,
            opponentMove,
            result,
            wager: wagerAmount,
            timestamp: 'Just now'
          };
          
          dispatch({ type: 'ADD_GAME_HISTORY', payload: historyItem });
          dispatch({ type: 'SET_CURRENT_GAME', payload: null });
          
          if (result === 'win') {
            dispatch({ type: 'UPDATE_STATS', payload: { wins: state.stats.wins + 1 } });
          } else {
            dispatch({ type: 'UPDATE_STATS', payload: { losses: state.stats.losses + 1 } });
          }
          
          updateBalance();
        }, 2000);
      }, 3000);
      
    } catch (error) {
      console.error('Failed to create game:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const joinGame = async (gameId: string, move: number) => {
    if (!publicKey) throw new Error('Wallet not connected');
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate joining game
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate immediate battle result
      const result = Math.random() > 0.5 ? 'win' : 'loss';
      const opponentMove = Math.floor(Math.random() * 3) + 1;
      const wagerAmount = 0.1; // Mock wager amount
      
      const historyItem: GameHistoryItem = {
        id: `joined_${Date.now()}`,
        playerMove: move,
        opponentMove,
        result,
        wager: wagerAmount,
        timestamp: 'Just now'
      };
      
      dispatch({ type: 'ADD_GAME_HISTORY', payload: historyItem });
      
      if (result === 'win') {
        dispatch({ type: 'UPDATE_STATS', payload: { wins: state.stats.wins + 1 } });
      } else {
        dispatch({ type: 'UPDATE_STATS', payload: { losses: state.stats.losses + 1 } });
      }
      
      updateBalance();
      
    } catch (error) {
      console.error('Failed to join game:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update balance when wallet connects
  React.useEffect(() => {
    if (connected && publicKey) {
      updateBalance();
    }
  }, [connected, publicKey]);

  const contextValue: GameContextType = {
    ...state,
    createGame,
    joinGame,
    updateBalance
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameStore = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameStore must be used within a GameProvider');
  }
  return context;
};
