import { type CSSProperties, FC } from 'react';
import { BoxCard } from '~/components/Box/BoxCard';
import type { Box as BoxType } from '~/types/Box/Box';
import './BoxList.css';

interface BoxListProps {
  boxes: BoxType[];
  columns?: [number, number, number];
  gap?: string;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
}

export const BoxList: FC<BoxListProps> = ({
  boxes,
  columns = [3, 5, 8],
  gap = '16px',
  onDragStart = () => {},
}) => {
  const [small, medium, large] = columns;

  if (!boxes) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="box-list py-0 px-0 mx-6 boxes-section"
      style={
        {
          '--box-list--columns__small': small,
          '--box-list--columns__medium': medium,
          '--box-list--columns__large': large,
          '--box-list--gap': gap,
        } as CSSProperties
      }
    >
      <div className={`box-list__container grid pt-6`}>
        {boxes.map((box) => (
          <BoxCard key={box.id} {...box} onDragStart={onDragStart} />
        ))}
      </div>
    </section>
  );
};
