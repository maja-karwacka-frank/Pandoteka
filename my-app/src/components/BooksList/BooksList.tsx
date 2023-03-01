import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';
import coverImg from '../../Graphics/cover_not_found.webp';
import { Book } from './Book';
import { Loader } from '../Loader/Loader';
import classes from './BooksList.module.css';

export const BookList = () => {
	const { books, loading, resultTitle } = useContext(AppContext);
	const booksWithCovers = books.map((singleBook) => {
		return {
			...singleBook,
			id: singleBook.id.replace('/works/', ''),
			cover_img: singleBook.cover_id
				? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
				: coverImg,
		};
	});
	if (loading) return <Loader />;

	return (
		<section>
			<div>
				<div>
					<h2>{resultTitle}</h2>
				</div>
				<div className={classes['books-list']}>
					{booksWithCovers.slice(0, 30).map((item, index) => {
						return <Book key={index} {...item} />;
					})}
				</div>
			</div>
		</section>
	);
};
