import { type CSSProperties, FC } from 'react';
import { ItemCard } from './ItemCard';
import type { Item as ItemType } from '~/types/Item/Item';
import './ItemList.css';
import { GridVirtualizer } from '../GridVirtuualizer';

interface ItemListProps {
  items: ItemType[];
  columns?: [number, number, number];
  gap?: string;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
}

export const ItemList: FC<ItemListProps> = ({
  items,
  columns = [3, 5, 8],
  gap = '16px',
  onDragStart = () => {},
}) => {
  const [small, medium, large] = columns;

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="card-list card-list__section py-0 px-0 mx-6"
      style={
        {
          '--card-list__columns--small': small,
          '--card-list__columns--medium': medium,
          '--card-list__columns--large': large,
          '--card-list__gap': gap,
        } as CSSProperties
      }
    >
      {/* <div className={`card-list__container grid pt-6`}>
        {items.map((item) => (
          <ItemCard key={item.id} {...item} onDragStart={onDragStart} />
        ))}
      </div> */}
      <GridVirtualizer items={items} columns={large} />
    </section>
  );
};
