import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import UsersTable from '../components/UsersTable';
import useUserTable from '../hooks/useUserTable';
import { User } from '../types/User';

// Mock the useUserTable hook
vi.mock('../hooks/useUserTable');

describe('UsersTable test', () => {

  test('renders loading state', () => {
    vi.mocked(useUserTable).mockReturnValue({
      status: 'loading',
      filteredUsers: [],
      error: null
    });

    render(<UsersTable />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  test('renders error state', () => {
    vi.mocked(useUserTable).mockReturnValue({
      status: 'error',
      filteredUsers: [],
      error: 'Error message'
    });

    render(<UsersTable />);
    expect(screen.getByText('Error: Error message')).toBeDefined();
  });

  test('renders empty state', () => {
    vi.mocked(useUserTable).mockReturnValue({
      status: 'success',
      filteredUsers: [],
      error: null
    });

    render(<UsersTable />);
    expect(screen.getByText('No users with specified filters found.')).toBeDefined();
  });

  test('renders user table', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', username: 'john123', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', username: 'jane456', email: 'jane@example.com', phone: '098-765-4321' }
    ];

    vi.mocked(useUserTable).mockReturnValue({
      status: 'success',
      filteredUsers: mockUsers,
      error: null
    });

    render(<UsersTable />);
    
    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByText('Phone')).toBeDefined();
    
    mockUsers.forEach(user => {
      expect(screen.getByText(user.name)).toBeDefined();
      expect(screen.getByText(user.email)).toBeDefined();
      expect(screen.getByText(user.phone)).toBeDefined();
    });
  });

});