import { AppContext, BookToFav } from '../../providers/AppProvider';
import { useContext } from 'react';
import classes from './MyBook.module.css';
import { Link } from 'react-router-dom';

type MyBookProps = {
	item: BookToFav;
};

export const MyBook = ({ item }: MyBookProps): JSX.Element => {
	const { removeFromFav } = useContext(AppContext);

	const classesTitle = `${classes.overflowEllipsis} ${classes.title}`
	return (
		<div className={classes['single-book']}>
			<Link className={classes.link} to={`/book/${item.id}`} {...item}>
				<img className={classes['cover-img']} src={item.cover_img} alt='' />
			</Link>
			<div className={classes.content}>
				<span className={classesTitle}>{item.title}</span>
				<span className={classes.overflowEllipsis}>{item.author}</span>
				<button onClick={() => removeFromFav(item.id)}>Delete ❌</button>
			</div>
		</div>
	);
};
