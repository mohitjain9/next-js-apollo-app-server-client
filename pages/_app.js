import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import theme from '../client/styles/theme';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import styles from '../client/styles/styles.module.css';
import {useLogOut} from '../client/hooks';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const pageNameMapping = {'/': 'Home', '/signin': 'Sing In', '/signup': 'Sign Up', '/photos': 'Photos'};
const pageTabIndexMapping = {0: '/', 1: '/photos'};

function MyApp(props) {
  const {Component, pageProps} = props;
  const classes = useStyles();
  const router = useRouter();
  const logOut = useLogOut();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(pageTabIndexMapping[newValue]);
  };

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Photo App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{backgroundColor: '#f1f2f5'}}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <AddPhotoAlternateIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} style={{flexGrow: 1}}>
                {pageNameMapping[props.router.pathname]}
              </Typography>
              <div className={styles.flexRow}>
                {Object.values(pageTabIndexMapping).find((val) => val === props.router.pathname) && (
                  <Button color="inherit" onClick={logOut}>
                    Log Out
                  </Button>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <div className={styles.flexRow}>
            {Object.values(pageTabIndexMapping).find((val) => val === props.router.pathname) && (
              <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange}>
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="Photo" {...a11yProps(1)} />
              </Tabs>
            )}
            <Container
              maxWidth="md"
              style={{
                backgroundColor: '#ffffff',
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <Component {...pageProps} />
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
