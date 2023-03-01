import { useRef, useContext, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AppContext } from '../../providers/AppProvider';
import classes from './SearchForm.module.css';

type SearchFormProps = {
	height: number;
};

export const SearchForm = ({ height }: SearchFormProps) => {
	const { setSearchTerm } = useContext(AppContext);
	const searchText = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (searchText.current) {
			searchText.current.focus();
		}
	}, []);
	const handleSubmit = (e: React.FormEvent) => {
		if (searchText.current) {
			e.preventDefault();
			let tempSearchTerm = searchText.current?.value.trim();
			window.scrollTo(0, height);
			if (tempSearchTerm?.replace(/[^\w\s]/gi, '').length === 0) {
				setSearchTerm('Harry Potter');
			} else {
				setSearchTerm(searchText.current.value);
			}
		}
	};

	return (
		<div className={classes['search-form']}>
			<form onSubmit={handleSubmit}>
				<div className={classes['search-form-elem']}>
					<input
						className={classes.input}
						type='text'
						placeholder='e.g. Harry Potter'
						ref={searchText}
					/>
					<button className={classes.button} type='submit'>
						<FaSearch className={classes['search-loop']} size={32} />
					</button>
				</div>
			</form>
		</div>
	);
};
