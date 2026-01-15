interface AuthContextData {
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}
