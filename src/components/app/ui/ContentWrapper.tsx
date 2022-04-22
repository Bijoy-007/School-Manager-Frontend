import classes from './ContentWrapper.module.css';

interface Props {
  children: React.ReactNode;
}

const ContentWrapper = (props: Props) => {
  return <div className={classes['content__wrapper']}>{props.children}</div>;
};

export default ContentWrapper;
