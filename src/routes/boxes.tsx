import { useState, Fragment } from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { readBoxes, readGroups } from 'json-server';
import { Group, Item } from '~/types';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { readItems } from 'json-server/items';
import { ItemsGrid } from '~/components/ItemsGrid';

export const Route = createFileRoute('/boxes')({
  loader: async () => {
    const [groups, boxes, items] = await Promise.all([readGroups(), readBoxes(), readItems()]);
    return { groups, boxes, items };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);
  const [activeBoxIndex, setActiveBoxIndex] = useState<number>(0);
  // const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const { groups, boxes, items } = Route.useLoaderData();

  if (!boxes || !groups || !items) {
    return <div>Loading...</div>;
  }

  const addItemToBox = (itemId: string, boxId: string) => {
    items.items[itemId].box_id = boxId;
    boxes.items[boxId].itemIds.push(itemId);
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const itemId = event.currentTarget.getAttribute('data-item-id');
    console.log({ itemId });
    if (!itemId) return;
    event.dataTransfer.setData('text/plain', itemId);
    event.dataTransfer.effectAllowed = 'move';
    const img = new Image();
    img.src = items.items[itemId].photos[0].thumbnails[0].url;
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const itemIdsNotInBoxes = items.ids
    .map((itemId: string) => items.items[itemId])
    .filter((item: Item) => !item.box_id)
    .map((item: Item) => item.id.toString());

  const itemsNotInBoxes = {
    ids: itemIdsNotInBoxes,
    items: Object.fromEntries(
      itemIdsNotInBoxes.map((itemId: string) => [itemId, items.items[itemId]])
    ),
  };

  return (
    <div style={{ display: 'flex', gap: '6px', flexDirection: 'row' }}>
      <div style={{ flex: 1 }}>
        <List sx={{ bgColor: 'background.paper', maxWidth: '100%' }} component="nav">
          {groups.map((group: Group, groupIndex: number) => (
            <Fragment key={group.id}>
              <ListItemButton
                onClick={() => {
                  setActiveGroupIndex(groupIndex);
                  setActiveBoxIndex(0);
                }}
              >
                <ListItemText primary={group.name} />
                {groupIndex === activeGroupIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={groupIndex === activeGroupIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.boxIds.map((boxId: string, boxIndex: number) => {
                    const box = boxes.items[boxId];
                    if (!box) return null;
                    return (
                      <Link to="/boxes/$boxId" key={box.id} params={{ boxId: box.id }}>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          // href={`/boxes/${box.id}`}
                          // onClick={(event) => {
                          //   setActiveBoxIndex(boxIndex);
                          //   setActiveBoxId(event.currentTarget.dataset.boxId || null);
                          // }}
                          // data-box-id={boxId}
                          {...(boxIndex === activeBoxIndex && { selected: true })}
                        >
                          <ListItemText primary={box.name} />
                        </ListItemButton>
                      </Link>
                    );
                  })}
                </List>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </div>
      <Outlet />
      <div style={{ flex: 4 }}>
        <ItemsGrid
          items={itemsNotInBoxes}
          columns={[3, 5, 6]}
          onDragStart={onDragStart}
          gap="8px"
        />
      </div>
    </div>
  );
}
