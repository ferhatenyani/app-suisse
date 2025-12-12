import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded user accounts
const HARDCODED_ACCOUNTS = {
  organization: {
    email: 'organization@gmail.com',
    password: '1234',
    user: {
      id: '1',
      name: 'John Anderson',
      email: 'organization@gmail.com',
      role: 'organization' as const,
      avatar: 'https://ui-avatars.com/api/?name=John+Anderson&background=2563EB&color=fff',
      companyName: 'Acme Corporation',
      createdAt: '2024-01-15T10:00:00Z',
    }
  },
  individual: {
    email: 'individual@gmail.com',
    password: '1234',
    user: {
      id: '2',
      name: 'Sarah Mitchell',
      email: 'individual@gmail.com',
      role: 'individual' as const,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=2563EB&color=fff',
      createdAt: '2024-03-20T14:30:00Z',
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Check organization account
    if (email === HARDCODED_ACCOUNTS.organization.email && password === HARDCODED_ACCOUNTS.organization.password) {
      setUser(HARDCODED_ACCOUNTS.organization.user);
      localStorage.setItem('currentUser', JSON.stringify(HARDCODED_ACCOUNTS.organization.user));
      return true;
    }

    // Check individual account
    if (email === HARDCODED_ACCOUNTS.individual.email && password === HARDCODED_ACCOUNTS.individual.password) {
      setUser(HARDCODED_ACCOUNTS.individual.user);
      localStorage.setItem('currentUser', JSON.stringify(HARDCODED_ACCOUNTS.individual.user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
