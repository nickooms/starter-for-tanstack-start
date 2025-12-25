import * as React from 'react';
import { Card, Typography, CardMedia, CardActionArea } from '@mui/material';
import type { Item as ItemType } from '~/types/Item/Item';

type ItemCardProps = ItemType & {
  onDragStart: React.DragEventHandler<HTMLDivElement>;
};

export const ItemCard: React.FC<ItemCardProps> = (item) => {
  const { id, thumbnails, title, price, lines, onDragStart = () => {} } = item;

  return (
    <Card
      key={id}
      elevation={16}
      raised
      style={{ borderRadius: '6px', margin: '8px' }}
      draggable
      onDragStart={onDragStart}
      data-id={id}
    >
      <CardActionArea>
        <CardMedia
          sx={{ width: '100%', aspectRatio: '70 / 130' }}
          image={thumbnails[0][2]}
          title={title}
        />
        <div
          className="flex align-middle items-center"
          style={{
            alignItems: 'flex-start',
            padding: 6,
            lineHeight: '10px',
            margin: 0,
            width: '100%',
            position: 'absolute',
            bottom: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {[lines[0], lines[1].split(' · ')[0], `€ ${price}`].map((line, index) => (
            <Typography
              key={index}
              component="div"
              className="inline-block"
              variant="body2"
              sx={{ color: 'text.secondary' }}
              style={{
                width: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                textAlign: index === 0 ? 'left' : 'right',
              }}
            >
              {line}
            </Typography>
          ))}
        </div>
      </CardActionArea>
    </Card>
  );
};
