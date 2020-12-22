import {useCallback, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {useGetMe, useHandleFileUpload, useGetPhotos} from '../client/hooks';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import styles from '../client/styles/styles.module.css';
import GridList from '../client/components/GridList';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100,
  },
}));

const Index = () => {
  const classes = useStyles();
  const router = useRouter();
  const fileInput = useRef(null);
  const [error, data] = useGetMe();
  const [errorMessage, successMsg, handleFileSubmit] = useHandleFileUpload(fileInput);
  const [fileError, filesData, reload] = useGetPhotos('/api/myFiles');

  const handleFileUpload = useCallback((event) => {
    return handleFileSubmit(event, reload);
  });

  useEffect(() => {
    if (error) {
      router.push('/signin');
    }
  }, [error]);

  if (data)
    return (
      <div className={styles.flexColumn}>
        <center>
          <p>You are logged in as {data.email}</p>
        </center>
        <div className={styles.flexColumn} style={{border: 'solid', borderRadius: '22px', padding: '20px'}}>
          <form onSubmit={handleFileUpload} style={{maxWidth: '80%', alignSelf: 'center'}}>
            {successMsg && <p>{successMsg}</p>}
            <ListSubheader component="div">Add Photo</ListSubheader>
            <input type="file" id="file" name="file" ref={fileInput} />
            <input type="submit" />
            {errorMessage && <p>{JSON.stringify(errorMessage)}</p>}
          </form>
        </div>
        <br />
        <br />
        <div className={classes.root}>
          <GridList data={filesData} heading="Photos of You" />
        </div>
      </div>
    );
  return <p>Loading...</p>;
};

export default Index;
