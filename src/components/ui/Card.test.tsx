import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Card from './Card';

describe('Card Component', () => {
  test('renders card', () => {

    const mockCardItem = { title_english: 'Title English', title_japanese: 'Title Japanese', episodes: 12, images: { webp: { image_url: 'image.jpg' } }, synopsis: 'Synopsis', year: 2023 };
    
    render(<Card {...mockCardItem} />);
    const cardElement = screen.getByText(mockCardItem.title_english);
    expect(cardElement).toBeInTheDocument();
  });
});
