import { useRef, Fragment } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Item } from '~/types/Item/Item';
import { ItemCard } from './Item/ItemCard';

export const GridVirtualizer = ({
  items,
  columns,
  onDragStart = () => {},
}: {
  items: Item[];
  columns: number;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
}) => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(items.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 230,
    overscan: 2,
  });

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `500px`,
        width: `100%`,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: `100%`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <Fragment key={virtualRow.key}>
            {Array.from({ length: columns }).map((_, virtualColumnIndex) => {
              const item = items[virtualRow.index * columns + virtualColumnIndex];
              return (
                <div
                  key={virtualColumnIndex}
                  className={
                    virtualColumnIndex % 2
                      ? virtualRow.index % 2 === 0
                        ? 'ListItemOdd'
                        : 'ListItemEven'
                      : virtualRow.index % 2
                      ? 'ListItemOdd'
                      : 'ListItemEven'
                  }
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `124px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumnIndex * 124}px) translateY(${
                      virtualRow.start
                    }px)`,
                  }}
                >
                  <ItemCard key={item.id} {...item} onDragStart={onDragStart} />
                  {/* Cell {virtualRow.index}, {virtualColumnIndex} */}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
