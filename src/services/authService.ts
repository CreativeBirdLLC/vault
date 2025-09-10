import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types';
import { post, get } from '@/utils/api';
import { storage, STORAGE_KEYS } from '@/utils/storage';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      // Store tokens and user data
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
      storage.set(STORAGE_KEYS.USER, response.data.user);
      
      return response.data;
    }
    
    throw new Error(response.error || 'Login failed');
  }

  async adminLogin(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse>('/auth/admin/login', credentials);
    
    if (response.success && response.data) {
      // Store tokens and user data
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
      storage.set(STORAGE_KEYS.USER, response.data.user);
      
      return response.data;
    }
    
    throw new Error(response.error || 'Admin login failed');
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Remove confirmPassword before sending to API if it exists
    const { ...registerData } = userData;
    
    const response = await post<AuthResponse>('/auth/register', registerData);
    
    if (response.success && response.data) {
      // Store tokens and user data
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
      storage.set(STORAGE_KEYS.USER, response.data.user);
      
      return response.data;
    }
    
    throw new Error(response.error || 'Registration failed');
  }

  async logout(): Promise<void> {
    // Clear stored data immediately for fast logout
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);

    // Make API call in background to invalidate server-side session
    post('/auth/logout').catch(error => {
      console.error('Logout API call failed:', error);
    });
  }

  async refreshToken(): Promise<void> {
    const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await post<{ tokens: { accessToken: string; refreshToken: string } }>('/auth/refresh', {
      refreshToken,
    });
    
    if (response.success && response.data) {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
    } else {
      throw new Error(response.error || 'Token refresh failed');
    }
  }

  getCurrentUser(): User | null {
    return storage.get<User>(STORAGE_KEYS.USER);
  }

  getAccessToken(): string | null {
    return storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async getProfile(): Promise<User> {
    const response = await get<{ user: User }>('/auth/profile');
    
    if (response.success && response.data) {
      // Update stored user data
      storage.set(STORAGE_KEYS.USER, response.data.user);
      return response.data.user;
    }
    
    throw new Error(response.error || 'Failed to get profile');
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }
}

export default new AuthService();
