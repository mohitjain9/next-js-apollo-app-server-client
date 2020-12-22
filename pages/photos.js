import React from 'react';
import GridList from '../client/components/GridList';
import {useGetPhotos} from '../client/network';

const Photos = () => {
  const [fileError, filesData] = useGetPhotos();

  return <GridList data={filesData} heading="All Photos" />;
};

export default Photos;
