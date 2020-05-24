import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Fade from '@material-ui/core/Fade';

//const backgroundImage =
 // 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';
const backgroundImage = "https://i.imgur.com/0dqdq3m.jpg";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    backgroundColor: '#039BF1',
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Fade
        in={true}
        timeout={{enter:1000}}
        >
      <Typography color="inherit" align="center" variant="h1" marked="center">
       새로운 코딩 경험의 시작
      </Typography>
      </Fade>
      <Fade
        in={true}
        timeout={{enter:1500}}
        >
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        코딩테스트 스터디 채널을 쉽게 찾고, 가입하세요.
      </Typography>
      </Fade>
      <Fade in={true} timeout={{enter:1500}}>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/register"
      >
        Register
      </Button>
      </Fade>
      <Fade in={true} timeout={{enter:1500}}>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover your coding experience
      </Typography>
      </Fade>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
