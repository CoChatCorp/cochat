import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import CreateIcon from '@material-ui/icons/Create';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

import Fade from '@material-ui/core/Fade';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Fade in={true} timeout={{enter:1000}}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <OpenInBrowserIcon style={{ fontSize:90}}/>
              <Typography variant="h6" className={classes.title}>
                원하는 코딩테스트 스터디 채널에 가입
              </Typography>
              <Typography variant="h5">
                {'원하는 회사의 분야나 직무를 선택하고, 스터디 채널을 찾아보세요.'}
                {' 채널 구성원들과 함께 다양한 정보를 공유하고, 코딩 테스트 문항을 같이 풀 수도 있습니다.'}
              </Typography>
            </div>
          </Grid>
          </Fade>
          <Fade in={true} timeout={{enter:1300}}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <CreateIcon style={{fontSize:90}}/>
              <Typography variant="h6" className={classes.title}>
                편리한 공부 기록 확인 기능
              </Typography>
              <Typography variant="h5">
                {'코딩 테스트를 공부하기 위한 효율적인 기능들을 제공합니다.'}
                {' 채널원들과 공유했던 문제 풀이 아이디어나 기타 기록들을 한번에 확인해 보세요.'}
              </Typography>
            </div>
          </Grid>
          </Fade>
          <Fade in={true} timeout={{enter:1600}}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <RecordVoiceOverIcon style={{fontSize:90}}/>
              <Typography variant="h6" className={classes.title}>
                화상회의와 손글씨로 역동적인 스터디
              </Typography>
              <Typography variant="h5">
                {'언제 어디서나 채널에 가입만 되어 있으면 누구든지 화상회의와 펜글씨 기능으로 코딩 스터디를 진행할 수 있습니다.'}
                {' 더욱 자유롭게 의견을 공유하고 공부의 효율을 높여 보세요.'}
              </Typography>
            </div>
          </Grid>
          </Fade>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
