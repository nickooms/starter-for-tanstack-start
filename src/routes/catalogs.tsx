import { useState, ReactNode } from 'react';
import { ListItemButton, List, ListItemIcon, ListItemText, Collapse, Badge } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { CatalogItem as CatalogItemType } from '~/types/CatalogItem';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { readCatalogs, readFacets } from '../../json-server';
import { capitalize } from '~/util/capitalize';

const CatalogItem = ({
  catalog,
  facets,
  parentIcon = null,
  indent = 0,
}: {
  catalog: CatalogItemType;
  facets: Record<number, number>;
  parentIcon?: string | ReactNode | null;
  indent: number;
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { id, code, catalogs, photo } = catalog;

  const image = photo?.thumbnails?.[1]?.url;

  const icon = <ListItemIcon>{image ? <img src={image} alt={code} /> : parentIcon}</ListItemIcon>;

  const count = facets[id] || 0;

  if (count === 0 && catalogs.length === 0) {
    return null;
  }

  return (
    <>
      <ListItemButton
        {...(catalogs.length > 0 && { onClick: handleClick })}
        sx={{ pl: indent * 4 }}
      >
        {count ? (
          <Badge badgeContent={count} color="primary" overlap="circular">
            {icon}
          </Badge>
        ) : (
          icon
        )}
        <ListItemText primary={code.split('_').map(capitalize).join(' ')} />
        {catalogs.length > 0 ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {catalogs.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {catalogs
              .filter((subCatalog) => {
                if (subCatalog.count === 0 && subCatalog.catalogs.length === 0) {
                  return false;
                }
                return true;
              })
              .map((subCatalog) => (
                <CatalogItem
                  key={subCatalog.id}
                  catalog={subCatalog}
                  facets={facets}
                  indent={indent + 1}
                  parentIcon={icon || parentIcon || <DraftsIcon />}
                />
              ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const CatalogList = ({
  catalogs,
  facets,
}: {
  catalogs: CatalogItemType[];
  facets: Record<number, number>;
}) => {
  return (
    <List sx={{ bgcolor: 'background.paper', maxWidth: '500px' }} component="nav">
      {catalogs.map((catalog) => (
        <CatalogItem key={catalog.id} catalog={catalog} facets={facets} indent={0} />
      ))}
      =[ ]
    </List>
  );
};

const RouteComponent = () => {
  const data = Route.useLoaderData();
  const facets = Object.fromEntries(
    data.facets.catalogs.map(({ id, count }: { id: number; count: number }) => [id, count])
  );
  // const category = (catalog) => {+6
  console.log(data.catalogs);
  // }
  // const categories = data.catalogs.map(catalog => {
  //   return { ...catalog, catalogs: catalog.catalogs.map() };
  // })
  return <CatalogList catalogs={data.catalogs} facets={facets} />;
};

export const Route = createFileRoute('/catalogs')({
  loader: async () =>
    await Promise.all([readCatalogs(), readFacets()]).then(([{ catalogs }, facets]) => ({
      catalogs,
      facets,
    })),
  component: RouteComponent,
});
