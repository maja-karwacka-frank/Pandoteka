import styles from './MyBooksList.module.css';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { BookToFav } from '../../providers/AppProvider';
import { FaSearch } from 'react-icons/fa';
import { MyBook } from './MyBook';

type MyBooksProps = {
	myBooksList: BookToFav[];
};

export const MyBookList = ({ myBooksList }: MyBooksProps): JSX.Element => {
	const { resultMyBooks } = useContext(AppContext);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [filteredMyBooksList, setFilteredMyBooksList] = useState(myBooksList);

	useEffect(() => {
		setFilteredMyBooksList(
			myBooksList.filter((book) =>
				book.title.toLowerCase().includes(searchPhrase.toLowerCase())
			)
		);
	}, [searchPhrase, myBooksList]);

	return (
		<>
			<div className={styles.pic}>
				<h1>MY BOOKS</h1>
			</div>
			<div className={styles['search-form-elem']}>
				<input
					className={styles.input}
					placeholder='Search by title'
					onChange={(event) => setSearchPhrase(event.target.value)} />
				<FaSearch className={styles['search-loop']} size={32} />
			</div>
			<div className={styles.searching}></div>
			<div className={styles.title}>
				<h3>{resultMyBooks}</h3>
			</div>
			<div className={styles['fav-container']}>
				{filteredMyBooksList.map((item) => (
					<MyBook key={item.id} item={item} />
				))}
			</div>
		</>
	);
};
