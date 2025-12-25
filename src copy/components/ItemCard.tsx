import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Card, Typography, CardMedia, CardActionArea } from '@mui/material';
import type { Group as GroupType, Box as BoxType, Item as ItemType } from '../types';

type ItemCardProps = ItemType & {
  onDragStart: React.DragEventHandler<HTMLDivElement>;
};

export const ItemCard: React.FC<ItemCardProps> = (item) => {
  const { id, photos, title, item_box, total_item_price                                                                                      , onDragStart = () => {} } = item;
  const { first_line, second_line } = item_box;

  return (
    <Card
      key={id}
      elevation={16}
      raised
      style={{ borderRadius: '6px' }}
      draggable
      onDragStart={onDragStart}
      data-item-id={id}
    >
      <CardActionArea>
        <CardMedia
          sx={{ width: '100%', aspectRatio: '70 / 130' }}
          image={photos[0].thumbnails[2].url}
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
          {[first_line, second_line.split(' · ')[0], `€ ${total_item_price.amount}`].map(
            (line, index) => (
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
                }}
              >
                {line}
              </Typography>
            )
          )}
        </div>
      </CardActionArea>
    </Card>
  );
};
