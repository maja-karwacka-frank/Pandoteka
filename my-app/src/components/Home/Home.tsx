import { useState, useRef, useLayoutEffect } from 'react';
import { BookList } from '../BooksList/BooksList';
import { SearchForm } from '../SearchForm/SearchForm';
import Slider from '../Slider/Slider';
import classes from './Home.module.css';

export const Home = (): JSX.Element => {
	const [height, setHeight] = useState(0);
	const ref = useRef(null as null | HTMLDivElement);

	useLayoutEffect(() => {
		if (ref && ref.current && ref.current.clientHeight) {
		  const height = ref.current.clientHeight;
		  setHeight(height);
		}
	  });

	return (
		<div>
			<header className={classes.header} ref={ref}>
				<Slider />
				<div className={classes.content}>
					<h1>find the book you need</h1>
					<SearchForm height={height} />
				</div>
			</header>
			<BookList/>
		</div>
	);
};


