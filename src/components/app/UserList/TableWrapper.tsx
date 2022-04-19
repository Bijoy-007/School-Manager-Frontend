import classes from './ContentWrapper.module.css';
interface Props {
  children: React.ReactNode;
}

const TableWrapper = (props: Props) => {
  return <div className={classes['content__wrapper']}>{props.children}</div>;
};

export default TableWrapper;
