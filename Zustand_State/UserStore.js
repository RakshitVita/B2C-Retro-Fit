import { create } from 'zustand';
import { axiosInstance } from '../AxiosInstance/axios_instance';

const useUserStore = create((set) => ({
  isPremium: false,
  isLoading: true,
  error: null ,
  lineLimitError: '',
  setIsLoading: (value) => set({ isLoading: value }),
  setLineLimitError: (msg) => set({ lineLimitError: msg }),


  fetchUserStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/api/user/status'); // replace with your endpoint
      const isPremium = response.data?.isPremium || false;
      set({ isPremium });
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

    convertFile: async (file, language) => {
    set({ isLoading: true, error: null, convertedFile: null });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

      try {
        const response = await axiosInstance.post('/api/convert-file', formData, {
          responseType: 'blob', // if file comes as PDF or similar
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });


        set({ convertedFile: blob, isLoading: false });
      } catch (error) {
        console.error('Conversion failed:', error);
        set({ error: 'File conversion failed', isLoading: false });
      }
    },

}));

export default useUserStore;