import { useState, useRef, useLayoutEffect } from 'react';
import { BookList } from '../BooksList/BooksList';
import { SearchForm } from '../SearchForm/SearchForm';
import Slider from '../Slider/Slider';
import classes from './Admin.module.css';

export const Admin = (): JSX.Element => {
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
                    <div>
			<header className={classes.header} ref={ref}>
				<Slider />
				<div className={classes.content}>
                    <h1>Welcome admin!</h1>
					<h1>select book of the month</h1>
					<SearchForm height={height} />
				</div>
			</header>
			<BookList/>
		</div>

      </div>
      
	);
};