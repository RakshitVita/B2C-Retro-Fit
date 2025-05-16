import { create } from 'zustand';
import { axiosInstance } from '../AxiosInstance/axios_instance';

const useUserStore = create((set) => ({
<<<<<<< Updated upstream
  isPremium: false,
  isLoading: false,
  error: null,
=======
  isPremium: true,
  isLoading: true,
  error: null ,
>>>>>>> Stashed changes
  lineLimitError: '',
  setLineLimitError: (msg) => set({ lineLimitError: msg }),


  fetchUserStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/user/status'); // replace with your endpoint
      const isPremium = response.data?.isPremium || false;
      set({ isPremium, isLoading: false });
    } catch (err) {
      console.error('Failed to fetch user status:', err);
      set({ error: 'Failed to fetch user status', isLoading: false });
    }
  },

    validateFileUpload: async (file) => {
    const state = useUserStore.getState();

    // Premium users skip validation
    if (state.isPremium) {
      set({ lineLimitError: '' });
      return true;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/api/validate-file-lines', formData);
      const { valid, message } = response.data;

      if (!valid) {
        set({ lineLimitError: message });
        return false;
      }

      set({ lineLimitError: '' });
      return true;
    } catch (error) {
      console.error("Validation failed", error);
      set({ lineLimitError: 'Failed to validate file.' });
      return false;
    }
  },

}));

export default useUserStore;