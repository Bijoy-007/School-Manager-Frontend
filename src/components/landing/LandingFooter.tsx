import classes from './LandingFooter.module.css';

const LandingFooter = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className={classes['landing-navbar']}>
      <p>Copyright@{year}</p>
      <p>
        Made with 💖 by{' '}
        <a
          className={classes['landing-navbar__link']}
          href="https://github.com/Bijoy-007"
        >
          Bijoy Das
        </a>
      </p>
    </div>
  );
};

export default LandingFooter;
