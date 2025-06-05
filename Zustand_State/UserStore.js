import { create } from 'zustand';
import { axiosInstance } from '../AxiosInstance/axios_instance';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

function getEmailFromCookie() {
  try {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    const user = JSON.parse(userCookie);
    return user.email || null;
  } catch {
    return null;
  }
}
const useUserStore = create((set) => ({

  isPremium: false,
  languages: ["Python", "JavaScript"],
  allowedLanguages: ["Python"],
  extensions: {
    "Python": [".py", ".txt"],
    "JavaScript": [".js"]
  },
  isLoading: true,
  isDownloading:false,
  error: null,
  lineLimitError: '',
  conRedMessage: '',
  UserStatusLoading:false,

  downloads: [], // <--- Make sure this is an array, not undefined
  downloadsLoading: false,

  setIsLoading: (value) => set({ isLoading: value }),
  setLineLimitError: (msg) => set({ lineLimitError: msg }),

  fetchUserStatus: async () => {
    set({
      UserStatusLoading: true,
      error: null,
      languages: [],
      allowedLanguages: [],
      extensions: {},
      
    });
    const token = Cookies.get("access_token");

    try {
      const response = await axiosInstance.get('/api/user/status',
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      ); // replace with your endpoint
      const isPremium = response.data?.isPremium || false;
      set({
        isPremium,
        credits: response.data?.credits ?? 0,
        languages: response.data?.languages || [],
        allowedLanguages: response.data?.allowed_languages || [],
        extensions: response.data?.extensions || {},
        UserStatusLoading: false,
      });
    } catch (err) {
      console.error('Failed to fetch user status:', err);
      set({
        error: 'Failed to fetch user status',
        isPremium: false,
        credits: 0,
        languages: [],
        allowedLanguages: [],
        extensions: {},
        isLoading: false,
      });
    }
  },

  validateFileUpload: async (file) => {
    const state = useUserStore.getState();
    const token = Cookies.get("access_token");
    const email = getEmailFromCookie();
    // Premium users skip validation
    if (state.isPremium) {
      set({ lineLimitError: '' });
      return true;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email || '');

    try {
      const response = await axiosInstance.post(
        '/api/validate-file-lines',
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );


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
    set({ isLoading: true, error: null });
    //getting token from cookies
    const token = Cookies.get("access_token");
    const formData = new FormData();
    const email = getEmailFromCookie();

    formData.append('file', file);
    formData.append('language', language);
    formData.append('email', email || ''); // Ensure email is always sent

    try {
      const response = await axiosInstance.post(
        '/api/convert-file', formData,
        {
          // responseType: 'blob',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      // const blob = new Blob([response.data], { type: response.headers['content-type'] });


      set({ conRedMessage: response.data.message, isLoading: false });
    } catch (error) {
      console.error('Conversion failed:', error);
      set({ error: 'File conversion failed', isLoading: false });
    }
  },

  fetchDownloads: async () => {
    set({ downloadsLoading: true });
try {
    const token = Cookies.get("access_token");
    const email = getEmailFromCookie();
    const response = await axiosInstance.post(
      "/get_all_files",
      { email }, // <-- send email in body
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    set({ downloads: response.data, downloadsLoading: false });
  } catch (error) {
    console.error("Failed to fetch downloads:", error);
    set({ downloads: [], downloadsLoading: false });
  }
  },

  getAndDownloadFile: async (filename,fileId) => {
    set({isDownloading:true});
    try {
      const token = Cookies.get("access_token");
      const email = getEmailFromCookie();
      const response = await axiosInstance.post(
        "/download",
        { filename, email,fileId }, // email in body
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json"
          },
          responseType: "blob",
        }
      );
      // Always use the filename from backend if present
      const disposition = response.headers['content-disposition'];
      let downloadName = "downloaded_file";
      if (disposition && disposition.includes('filename=')) {
        downloadName = disposition
          .split('filename=')[1]
          .replace(/['"]/g, '')
          .trim();
      }
      if (!downloadName) {
        // fallback if header is missing
        downloadName = "downloaded_file.pdf";
      }
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      set({ isDownloading: false });
      toast.success("File downloaded successfully");

    } catch (error) {
      console.error("Download failed:", error);
      set({ isDownloading: false });
      toast.error("File Downloading failed. Please try again.");
    }
  },

    resetUserState: () => set({
    isPremium: false,
    languages: ["Python", "JavaScript"],
    allowedLanguages: ["Python"],
    extensions: {
      "Python": [".py", ".txt"],
      "JavaScript": [".js"]
    },
    isLoading: true,
    isDownloading: false,
    error: null,
    lineLimitError: '',
    conRedMessage: '',
    UserStatusLoading: false,
    downloads: [],
    downloadsLoading: false,
  }),

}));

export default useUserStore;