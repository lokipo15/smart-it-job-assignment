import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect } from 'vitest';
import UserFilter from '../components/UserFilter';
import usersReducer from '../features/users/usersSlice';

describe('UserFilter test', () => {
  const renderWithProviders = (
    ui: React.ReactNode,
    {
      preloadedState = {},
      store = configureStore({ reducer: { users: usersReducer }, preloadedState }),
      ...renderOptions
    } = {}
  ) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      return <Provider store={store}>{children}</Provider>;
    };
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  };

  test('renders filter inputs', () => {
    renderWithProviders(<UserFilter />);

    expect(screen.getByPlaceholderText('Filter by name...')).toBeDefined();
    expect(screen.getByPlaceholderText('Filter by email...')).toBeDefined();
    expect(screen.getByPlaceholderText('Filter by phone...')).toBeDefined();
  });

  test('updates store when name input changes', () => {
    const { store } = renderWithProviders(<UserFilter />);

    const nameInput = screen.getByPlaceholderText('Filter by name...');
    fireEvent.change(nameInput, { target: { value: 'John' } });

    expect(store.getState().users.filters.name).toBe('john');
  });

  test('updates store when email input changes', () => {
    const { store } = renderWithProviders(<UserFilter />);

    const emailInput = screen.getByPlaceholderText('Filter by email...');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(store.getState().users.filters.email).toBe('john@example.com');
  });

  test('updates store when phone input changes', () => {
    const { store } = renderWithProviders(<UserFilter />);

    const phoneInput = screen.getByPlaceholderText('Filter by phone...');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(store.getState().users.filters.phone).toBe('1234567890');
  });
});