import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('Card Component', () => {
  test('renders card', () => {
    const mockCardItem = { mal_id: 1, title_english: 'Title English', title_japanese: 'Title Japanese', episodes: 12, images: { webp: { image_url: 'image.jpg' } }, synopsis: 'Synopsis', year: 2023 };

    render(
      <MemoryRouter>
        <Card {...mockCardItem} />
      </MemoryRouter>
    );
    const cardElement = screen.getByText(mockCardItem.title_english);
    expect(cardElement).toBeInTheDocument();
  });
});
