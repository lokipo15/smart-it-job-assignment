import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersTable from '../components/UsersTable';
import useUserTable from '../hooks/useUserTable';

// Mock the useUserTable hook
jest.mock('../hooks/useUserTable');

describe('UsersTable', () => {

  test('renders loading state', () => {
    (useUserTable as jest.Mock).mockReturnValue({
      status: 'loading',
      filteredUsers: [],
      error: null
    });

    render(<UsersTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useUserTable as jest.Mock).mockReturnValue({
      status: 'error',
      filteredUsers: [],
      error: 'Error message'
    });

    render(<UsersTable />);
    expect(screen.getByText('Error: Error message')).toBeInTheDocument();
  });

  test('renders empty state', () => {
    (useUserTable as jest.Mock).mockReturnValue({
      status: 'success',
      filteredUsers: [],
      error: null
    });

    render(<UsersTable />);
    expect(screen.getByText('No users with the specified filters found.')).toBeInTheDocument();
  });

  test('renders user table', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
    ];

    (useUserTable as jest.Mock).mockReturnValue({
      status: 'success',
      filteredUsers: mockUsers,
      error: null
    });

    render(<UsersTable />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    
    mockUsers.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.phone)).toBeInTheDocument();
    });
  });

});