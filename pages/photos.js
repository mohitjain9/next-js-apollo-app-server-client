import React from 'react';
import GridList from '../client/components/GridList';
import {useGetPhotos} from '../client/network';

export default () => {
  const [fileError, filesData] = useGetPhotos();
  return <GridList data={filesData} heading="All Photos" />;
};
