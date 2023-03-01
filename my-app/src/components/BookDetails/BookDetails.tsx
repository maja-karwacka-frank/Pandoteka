import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BookDetails.module.css';
import { Loader } from '../Loader/Loader';
import coverImg from '../../Graphics/cover_not_found.webp';
import { AppContext } from '../../providers/AppProvider';
import { firebaseDb } from '../../App';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Comment } from './Comment';
import icon from '../../Graphics/User-icon.png';
import { Rating } from 'react-simple-star-rating';
import { EmptyIcon, FillIcon } from '../Rating/FillIcon';
import { Link } from 'react-router-dom';

const URL = 'https://openlibrary.org/works/';

export type MyComment = {
	id: number;
	CreatedAt: number;
	message: string;
	user: string | null;
};

export const BookDetails = (): JSX.Element => {
	const { isLogged, addToFav, myBookList, username, ratesList, setRatesList } =
		useContext(AppContext);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [book, setBook] = useState<any>('');
	const [myMessagesList, setmyMessagesList] = useState([] as MyComment[]);
	const [commentValue, setCommentValue] = useState('');
	const [ratesListAverage, setRatesListAverage] = useState(0);
	const [emptyMessegesList, setEmptyMessegesList] = useState('');

	const handleRating = async (rate: number) => {
		if (isLogged) {
			try {
				await setDoc(doc(firebaseDb, 'Rating', `${book.id}`), {
					values: [...ratesList, rate],
				});
				setRatesList([...ratesList, rate]);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const cleanDescription = (x: string | undefined) => {
		// console.log(x);
		let startIndex;
		if (x?.indexOf('([') !== -1) {
			startIndex = x?.indexOf('([');
		} else if (x?.indexOf('----------') !== -1) {
			startIndex = x?.indexOf('----------');
		} else if (x?.indexOf('[Source][1]') !== -1) {
			startIndex = x?.indexOf('[Source][1]');
		}
		const cleanedData = startIndex === -1 ? x : x?.substring(0, startIndex);
		// console.log(cleanedData);
		return cleanedData;
	};

	useEffect(() => {
		setLoading(true);
		async function getBookDetails() {
			try {
				const response = await fetch(`${URL}${id}.json`);
				const data = await response.json();
				if (data) {
					const {
						description,
						title,
						covers,
						subject_places,
						subject_times,
						subjects,
					} = data;
					const newBook = {
						description:
							description?.value || description
								? description?.value
									? cleanDescription(description.value)
									: cleanDescription(description)
								: 'No description found',
						title: title,
						cover_img: covers
							? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
							: coverImg,
						subject_places: subject_places
							? subject_places.join(', ')
							: 'No subject places found',
						subject_times: subject_times
							? subject_times.join(', ')
							: 'No subject times found',
						subjects: subjects ? subjects.join(', ') : 'No subjects found',
						id: id,
					};
					setBook(newBook);
				} else {
					setBook('');
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getBookDetails();
	}, [id]);

	const addToComment = async (product: MyComment): Promise<void> => {
		try {
			await setDoc(doc(firebaseDb, 'conversations', `${book.id}`), {
				messages: [...myMessagesList, product],
			});
			setmyMessagesList([...myMessagesList, product]);
			setCommentValue('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentValue(e.target.value);
	};

	const removeComment = async (commId: number): Promise<void> => {
		const newArr = myMessagesList.filter((obj) => obj.id !== commId);
		try {
			await setDoc(doc(firebaseDb, 'conversations', `${book.id}`), {
				messages: newArr,
			});
			setmyMessagesList(newArr);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const docRef = doc(firebaseDb, 'Rating', `${book.id}`);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const data = doc.data();
				setRatesList(data.values);
				const sumOfRates = ratesList.reduce((a, b) => a + b, 0);
				const average = sumOfRates / Number(ratesList.length);
				setRatesListAverage(Number(average.toFixed(1)));
			}
		});
		return () => unsubscribe();
	}, [book.id, ratesList.length]);

	useEffect(() => {
		const docRef = doc(firebaseDb, 'conversations', `${book.id}`);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const data = doc.data();
				setmyMessagesList(data.messages);
				if (myMessagesList.length === 0) {
					setEmptyMessegesList('No comments yet.');
				} else {
					setEmptyMessegesList('');
				}
			} else {
				setEmptyMessegesList('No comments yet.');
			}
		});
		return () => unsubscribe();
	}, [book.id, myMessagesList.length]);

	if (loading) return <Loader />;
	return (
		<section className={classes['all-page']}>
			<div className={classes['card-book']}>
				<div className={classes['cover-img']}>
					<img
						className={classes['main-img']}
						src={book.cover_img}
						alt='cover img'
					/>
				</div>
				<div className={classes['content']}>
					<div className={classes.infobook}>
						<span>
							<b>Title:</b>{' '}
						</span>
						<span>{book.title}</span>
					</div>
					<div>
						<span>
							<b>Description:</b>{' '}
						</span>
						<span className={classes['description']}>{book.description}</span>
					</div>
					<div>
						<span>
							<b>Subject Places:</b>{' '}
						</span>
						<span>{book.subject_places}</span>
					</div>
					<div>
						<span>
							<b>Subject Times:</b>{' '}
						</span>
						<span>{book.subject_times}</span>
					</div>
					<div>
						<button>
							<a target='_blank' href={`https://amazon.com/s?k=${book.title}`}>
								Go to buy...
							</a>
						</button>
					</div>
					{isLogged && (
						<div>
							<button
								className={classes['btn-add-to-fav']}
								disabled={myBookList.some(
									(singleBook) => singleBook.id === book.id
								)}
								onClick={() =>
									addToFav({
										title: book.title,
										cover_img: book.cover_img,
										id: book.id,
										author: book.author
									})
								}></button>
							
						</div>
					)}
					{!isLogged && (
						<div>
							<div>
								<Link className={classes.links} to='/login'>
									Log in
								</Link>
								<span> to add to favorites or add comment</span>
							</div>
						</div>
					)}
					<div className={classes.ratingContainer}>
								<Rating
									onClick={handleRating}
									fillIcon={FillIcon}
									initialValue={ratesListAverage}
									transition={true}
									emptyIcon={EmptyIcon}
								/>
								<div>
									<span>Average panda ({ratesListAverage})</span>
									<br></br>
									<span>Number of ratings ({ratesList.length})</span>
								</div>
							</div>
				</div>
			</div>

			<section className={classes.commentSectionWrapper}>
				<h2>Comments:</h2>
				<div className={classes.commentSection}>
					{isLogged && (
						<div className={classes['typecomment']}>
							<img className={classes['pandacomment']} src={icon} alt='' />
							<textarea
								className={classes['typecommentarea']}
								onChange={handleInputChange}
								placeholder='Type comment as User 🖋...'
								value={commentValue}></textarea>
							<div className={classes['pComment']}>
								<button
									className={classes['addcomment']}
									onClick={() => {
										addToComment({
											CreatedAt: Date.now(),
											message: commentValue,
											user: username,
											id: Date.now(),
										});
									}}>
									Add
								</button>
							</div>
						</div>
					)}
					<div className={classes['comment-box']}>
						<p>{emptyMessegesList}</p>
						<div>
							{myMessagesList.map((item) => (
								<Comment
									key={item.id}
									item={item}
									removeComment={removeComment}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};
