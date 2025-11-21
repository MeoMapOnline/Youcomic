import { create } from 'zustand';
import { api } from '../api/client';
import { Story, Chapter, Transaction, WithdrawRequest } from '../data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'reader' | 'author' | 'admin';
  balance: number;
}

interface AppState {
  user: User | null;
  stories: Story[];
  favorites: string[];
  readingHistory: string[];
  unlockedChapters: string[];
  transactions: Transaction[];
  withdrawRequests: WithdrawRequest[];
  isLoading: boolean;
  
  init: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => void;
  
  toggleFavorite: (storyId: string) => void;
  addToHistory: (storyId: string) => void;
  isFavorite: (storyId: string) => boolean;
  
  requestDeposit: (amount: number) => Promise<void>;
  approveDeposit: (transactionId: string) => Promise<void>;
  approveWithdraw: (requestId: number) => Promise<void>;
  
  unlockChapter: (chapterId: string, price: number) => Promise<boolean>;
  isChapterUnlocked: (chapterId: string) => boolean;
  
  updateStory: (updatedStory: Story) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  stories: [],
  favorites: [],
  readingHistory: [],
  unlockedChapters: [],
  transactions: [],
  withdrawRequests: [],
  isLoading: false,

  init: async () => {
    set({ isLoading: true });
    try {
      const [userData, storiesData] = await Promise.all([
        api.get('/user/me').catch(() => null),
        api.get('/stories').catch(() => [])
      ]);

      set({ 
        user: userData, 
        stories: storiesData || [] 
      });
      
      if (userData?.role === 'admin') {
        const dashboard = await api.get('/admin/dashboard').catch(() => ({}));
        if (dashboard.transactions) {
          set({ transactions: dashboard.transactions });
        }
      }
    } catch (e) {
      console.error("Init failed", e);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async () => {
    const user = await api.get('/user/me');
    set({ user });
  },

  logout: () => set({ user: null }),

  toggleFavorite: (storyId) => set((state) => {
    const isFav = state.favorites.includes(storyId);
    return { favorites: isFav ? state.favorites.filter(id => id !== storyId) : [...state.favorites, storyId] };
  }),

  addToHistory: (storyId) => set((state) => {
    const newHistory = [storyId, ...state.readingHistory.filter(id => id !== storyId)].slice(0, 20);
    return { readingHistory: newHistory };
  }),

  isFavorite: (storyId) => get().favorites.includes(storyId),

  requestDeposit: async (amount) => {
    await api.post('/deposit', { amount });
  },

  approveDeposit: async (transactionId) => {
    get().init(); // Refresh data after approval
  },

  approveWithdraw: async (requestId) => {
    set((state) => ({
      withdrawRequests: state.withdrawRequests.map(r => r.id === requestId ? { ...r, status: 'approved' } : r)
    }));
  },

  unlockChapter: async (chapterId, price) => {
    try {
      await api.post(`/chapters/${chapterId}/unlock`, {});
      set((state) => ({
        unlockedChapters: [...state.unlockedChapters, chapterId],
        user: state.user ? { ...state.user, balance: state.user.balance - price } : null
      }));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  isChapterUnlocked: (chapterId) => get().unlockedChapters.includes(chapterId),

  updateStory: async (updatedStory) => {
    set((state) => ({
      stories: state.stories.map(s => s.id === updatedStory.id ? updatedStory : s)
    }));
  }
}));
