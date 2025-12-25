import { ItemCard } from './ItemCard';
import type { Item as ItemType } from '../types';
// import { SliderMarkLabel } from '@mui/material';
import { FC } from 'react';
import './ItemsGrid.css';

interface ItemsGridProps {
  items: { ids: string[]; items: Record<string, ItemType> };
  columns?: [number, number, number];
  gap?: string;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
}

// function normalizeMapping<T>()

export const ItemsGrid: FC<ItemsGridProps> = ({
  items,
  columns = [3, 5, 8],
  gap = '4px',
  onDragStart = () => {},
}) => {
  const [small, medium, large] = columns;

  if (!items || !items.ids || items.ids.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="py-0 px-0 mx-6 items-section"
      style={
        {
          '--items-grid--columns__small': small,
          '--items-grid--columns__medium': medium,
          '--items-grid--columns__large': large,
          '--items-grid--gap': gap,
        } as React.CSSProperties
      }
    >
      <div className={`items-grid__container grid pt-6`}>
        {items.ids
          .map((id: string): ItemType => items.items[id])
          .map((item) => (
            <ItemCard key={String(item.id)} {...item} onDragStart={onDragStart} />
          ))}
      </div>
    </section>
  );
};
