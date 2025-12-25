import * as React from 'react';
import { styled } from '@mui/material/styles';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Card, Typography, CardMedia, CardActionArea } from '@mui/material';
import type { Box as BoxType } from '../../types/Box/Box';
// import type { Group as GroupType, Box as BoxType } from '../../types';

type BoxCardProps = BoxType & {
  onDragStart: React.DragEventHandler<HTMLDivElement>;
};

export const BoxCard: React.FC<BoxCardProps> = (box) => {
  const { id, name, onDragStart = () => {} } = box;

  return (
    <Card
      key={id}
      elevation={16}
      raised
      style={{ borderRadius: '6px' }}
      draggable
      onDragStart={onDragStart}
      data-box-id={id}
    >
      <CardActionArea>
        <CardMedia sx={{ width: '100%', aspectRatio: '70 / 130' }} title={name} />
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
          {[name].map((line, index) => (
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
