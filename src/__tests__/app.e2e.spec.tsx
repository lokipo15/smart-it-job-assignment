import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { beforeAll, afterEach, afterAll, test, expect, describe } from 'vitest';
import { server } from '../mocks/server';
import UserFilter from '../components/UserFilter';
import UsersTable from '../components/UsersTable';
import usersReducer, { fetchUsers } from '../features/users/usersSlice';




describe('App e2e', () => {

  // Setup msw server
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // Setup store
  const store = configureStore({
    reducer: {
      users: usersReducer,
    },
  });


test('filters users based on input', async () => {
  render(
    <Provider store={store}>
      <UserFilter />
      <UsersTable />
    </Provider>
  );

  // Fetch users
  store.dispatch(fetchUsers());

    // Wait for users to be loaded
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeDefined();
    });

    // Check if all users are initially displayed
    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('Jane Smith')).toBeDefined();
    expect(screen.getByText('Bob Johnson')).toBeDefined();

    // Filter by name
    fireEvent.change(screen.getByPlaceholderText('Filter by name...'), { target: { value: 'john' } });

    // Check if John Doe or Bob Johnson is displayed
    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.queryByText('Jane Smith')).toBeNull();
    expect(screen.queryByText('Bob Johnson')).toBeDefined();

    // Clear name filter
    fireEvent.change(screen.getByPlaceholderText('Filter by name...'), { target: { value: '' } });

    // Filter by email
    fireEvent.change(screen.getByPlaceholderText('Filter by email...'), { target: { value: 'jane' } });

    // Check if only Jane Smith is displayed
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.getByText('Jane Smith')).toBeDefined();
    expect(screen.queryByText('Bob Johnson')).toBeNull();

    // Clear email filter
    fireEvent.change(screen.getByPlaceholderText('Filter by email...'), { target: { value: '' } });

    // Filter by phone
    fireEvent.change(screen.getByPlaceholderText('Filter by phone...'), { target: { value: '112233' } });

    // Check if only Bob Johnson is displayed
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.queryByText('Jane Smith')).toBeNull();
    expect(screen.getByText('Bob Johnson')).toBeDefined();
  });
});