import loader from '../../Graphics/loader.svg';
import classes from './Loader.module.css';

export const Loader = () => {
    return <div className={classes.loader}><img src={loader} alt='loader' /></div>
}