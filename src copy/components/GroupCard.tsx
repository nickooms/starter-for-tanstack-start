import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Icon,
  Typography,
  ListItemAvatar,
  Collapse,
  ListItemButton,
  Divider,
  ListSubheader,
} from '@mui/material';
import type { Group as GroupType, Box as BoxType } from '../types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export const GroupCard = ({
  id,
  name,
  boxIds,
  boxes,
}: GroupType & {
  boxes: { ids: string[]; items: { [key: string]: BoxType } };
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getBoxById = (boxId: string) => {
    const box = boxes.items[boxId];
    if (!box) {
      console.log(`Box with id "${boxId}" not found`);
      return null;
    }
    return box;
  };

  return (
    <Card key={id} title={`Group ${id} ${name}`} elevation={16} raised className="rounded-xl">
      <CardHeader
        className="flex align-middle items-center"
        title={name}
        subheader={`${boxIds.length} Dozen`}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="mr-2"
          >
            <ExpandMoreIcon sx={{ fontSize: '48px' }} />
          </ExpandMore>
        }
      >
        {name}
      </CardHeader>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        {/* <CardContent className="p-0 m-0"> */}
        <List dense subheader={<ListSubheader>Dozen</ListSubheader>}>
          {boxIds?.map(getBoxById).map(
            (box: BoxType | null) =>
              box && (
                <ListItemButton key={box.id} component="a" href={`#/boxes/${box.id}`}>
                  <ListItemText
                    primary={
                      <Typography fontSize="xl" fontWeight="500" color="textPrimary">
                        {box.name}
                      </Typography>
                    }
                    secondary={`${box.items.length} Items`}
                  ></ListItemText>{' '}
                  {/* <ListItemAvatar>{box.items.length} Items</ListItemAvatar> */}
                </ListItemButton>
              )
          )}
        </List>
        {/* </CardContent> */}
        <Divider />
        <CardActions className="justify-end">
          <IconButton color="primary">
            <Icon sx={{ fontSize: 40 }}>add_box</Icon>
          </IconButton>
        </CardActions>
      </Collapse>
    </Card>
  );
};
