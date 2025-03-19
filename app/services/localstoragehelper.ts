export const localStorageHelper = {
    get: <T>(key: string): T | null => {
      // if (typeof window === "undefined") return null; // Avoid SSR issues
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return null;
      }
    },
  
    set: (key: string, value: unknown): void => {
      // if (typeof window === "undefined") return;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
  
    remove: (key: string): void => {
      // if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    },
  
    clear: (): void => {
      // if (typeof window === "undefined") return;
      localStorage.clear();
    }
  };
  