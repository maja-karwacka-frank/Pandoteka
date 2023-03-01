import React, { createContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from '../App';
import { Book } from '../components/BooksList/Book';

const URL = 'https://openlibrary.org/search.json?title=';

export type BookToFav = {
	id: string;
	title: string;
	cover_img: string;
	author: string;
};

export type Book = {
	id: string;
	author: string;
	cover_id: number;
	first_publish_year: number;
	title: string;
};

type AppContextState = {
	searchTerm: string | null;
	setSearchTerm: (searchTerm: string) => void;
	books: Book[];
	setBooks: (param: []) => void;
	loading: boolean;
	setLoading: (param: boolean) => void;
	resultTitle: string | null;
	setResultTitle: (param: string) => void;
	username: string | null;
	setUsername: (username: string | null) => void;
	listSum: number;
	setlistSum: (value: number) => void;
	myBookList: BookToFav[];
	setmyBookList: (books: BookToFav[]) => void;
	isLogged: boolean;
	setIsLogged: (param: boolean) => void;
	addToFav: (product: BookToFav) => void;
	removeFromFav: (bookId: string) => void;
	resultMyBooks: string | null;
	setResultMyBooks: (param: string) => void;
	ratesList: number[];
	setRatesList: (numbers: number[]) => void
};

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [searchTerm, setSearchTerm] = useState('Harry Potter');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [resultTitle, setResultTitle] = useState('');
	const [resultMyBooks, setResultMyBooks] = useState('');
	const [username, setUsername] = useState<string | null>('');
	const [listSum, setlistSum] = useState<number>(0);
	const [myBookList, setmyBookList] = useState([] as BookToFav[]);
	const [isLogged, setIsLogged] = useState(false);
	const [ratesList, setRatesList] = useState<number[]>([]);

	const addToFav = async (product: BookToFav): Promise<void> => {
		try {
			await setDoc(doc(firebaseDb, 'MyList', `${username}`), {
				books: [...myBookList, product],
			});
			setmyBookList([...myBookList, product]);
		} catch (error) {
			console.log(error);
		}
	};

	const removeFromFav = async (bookId: string): Promise<void> => {
		const newArr = myBookList.filter((obj) => obj.id !== bookId);
		try {
			await setDoc(doc(firebaseDb, 'MyList', `${username}`), {
				books: newArr,
			});
			setmyBookList(newArr);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (myBookList.length === 0) {
			setResultMyBooks('Your list of favourite books is empty.');
		} else {
			setResultMyBooks('Your current favorite books:');
		}
	}, [myBookList]);

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${URL}${searchTerm}`);
			const data = await response.json();
			const { docs } = data;

			if (docs) {
				const newBooks = docs
					.slice(0, 20)
					.map(
						(bookSingle: {
							key: string;
							author_name: string;
							cover_i: number;
							first_publish_year: number;
							title: string;
						}) => {
							const { key, author_name, cover_i, first_publish_year, title } =
								bookSingle;

							return {
								id: key,
								author: author_name,
								cover_id: cover_i,
								first_publish_year: first_publish_year,
								title: title,
							};
						}
					);

				setBooks(newBooks);

				if (newBooks.length > 1) {
					setResultTitle('Your Search Result:');
				} else {
					setResultTitle('No Search Result Found!');
				}
			} else {
				setBooks([]);
				setResultTitle('No Search Result Found!');
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		fetchBooks();
	}, [searchTerm, fetchBooks]);

	return (
		<AppContext.Provider
			value={{
				username,
				setUsername,
				listSum,
				setlistSum,
				myBookList,
				setmyBookList,
				searchTerm,
				setSearchTerm,
				books,
				setBooks,
				loading,
				setLoading,
				resultTitle,
				setResultTitle,
				setIsLogged,
				isLogged,
				addToFav,
				removeFromFav,
				resultMyBooks,
				setResultMyBooks,
				ratesList, 
				setRatesList
			}}>
			{children}
		</AppContext.Provider>
	);
};
