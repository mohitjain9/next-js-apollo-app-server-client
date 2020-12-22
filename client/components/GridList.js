import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(() => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const GridListComponent = ({data, heading}) => {
  const classes = useStyles();
  if (!data) {
    return <center>Loading...</center>;
  }
  if (!data.length) {
    heading = 'No Photos found';
  }

  return (
    <GridList cellHeight={180} cols={4}>
      <GridListTile key="Subheader" cols={4} style={{height: 'auto'}}>
        <center>
          <ListSubheader component="div">{heading}</ListSubheader>
        </center>
      </GridListTile>
      {data
        ? data.map((tile) => {
            const {_id, metadata} = tile;
            const {user = {}, originalname} = metadata;
            return (
              <GridListTile key={_id}>
                <img src={'/api/file/' + _id} alt={originalname} />
                <GridListTileBar
                  subtitle={user.email && <span>by: {user.email}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${originalname}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })
        : 'Loading...'}
    </GridList>
  );
};
export default GridListComponent;
