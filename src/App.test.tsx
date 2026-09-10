import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the starter app', () => {
    render(<App />);

    expect(screen.getByRole('button')).toBeVisible();
  });
});
