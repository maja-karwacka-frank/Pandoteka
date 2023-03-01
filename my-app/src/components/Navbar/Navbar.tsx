import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import logoImg from '../../Graphics/Logo.png';
import logoUser from '../../Graphics/User-icon.png';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../App';
import { AppContext } from '../../providers/AppProvider';
import bar from '../../Graphics/Hamburger-icon.png';

export const Navbar = (): JSX.Element => {
	const { isLogged, setIsLogged, username, myBookList, ratesList } =
		useContext(AppContext);
	const [toggleMenu, setToggleMenu] = useState(false);
	const [pandaAnime, setPandaAnime] = useState(false);

	const navigate = useNavigate();

	const handleLogout = async (): Promise<void> => {
		setToggleMenu(!toggleMenu);
		try {
			await signOut(firebaseAuth);
		} catch (error) {
			console.log(error);
		}
		setIsLogged(false);
		navigate('/logout');
	};

	useEffect(() => {
		if (myBookList.length === 0) {
			return;
		}
		setPandaAnime(true);
		const timer = setTimeout(() => {
			setPandaAnime(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [myBookList, ratesList.length]);

	const pandaClasses = `${classes['logo-user']} ${
		pandaAnime ? classes.bump : ''
	}`;

	const contentIsLogged = (
		<div className={classes['nav-link-container']}>
			<Link className={classes['links-desktop']} to='/'>
				Home
			</Link>
			<Link className={classes['links-desktop']} to='mybooks'>
				MyBooks
			</Link>
			<Link className={classes['links-desktop']} to='/' onClick={handleLogout}>
				Log out
			</Link>
			<img src={logoUser} className={pandaClasses} alt='logoUser' />
			<span className={classes['span-username']}>Hello, {username}!</span>
		</div>
	);

	const contentIsAdmin = (
		<div className={classes['nav-link-container']}>
			<Link className={classes['links-desktop']} to='admin'>
				Admin
			</Link>
			<Link className={classes['links-desktop']} to='/'>
				Home
			</Link>
			<Link className={classes['links-desktop']} to='mybooks'>
				MyBooks
			</Link>
			<Link className={classes['links-desktop']} to='/' onClick={handleLogout}>
				Log out
			</Link>
			<img src={logoUser} className={pandaClasses} alt='logoUser' />
			<span className={classes['span-username']}>Hello, {username}!</span>
		</div>
	);


	const contentIsNotLogged = (
		<div>
			<Link className={classes['links-desktop']} to='/'>
				Home
			</Link>
			<Link className={classes['links-desktop']} to='login'>
				Log in
			</Link>
			<Link className={classes['links-desktop']} to='register'>
				Sign up
			</Link>
		</div>
	);

	return (
		<div className={classes.navbar}>
			<img
				className={classes['logo-img']}
				src={logoImg}
				alt='logo'
				onClick={() => {
					navigate('/');
				}}></img>
			<div>
				{!isLogged && contentIsNotLogged}
				{username ==='admin@admin.pl' && contentIsAdmin}
				{isLogged && username !=='admin@admin.pl' && contentIsLogged}
			
				<button
					onClick={() => setToggleMenu(!toggleMenu)}
					className={classes['bar-button']}>
					<img className={classes['bar-icon']} src={bar} alt='menu' />
				</button>

				<div
					className={
						toggleMenu
							? classes['show-navbar-collapse']
							: classes['navbar-collapse']
					}>
					{isLogged && username !=='admin@admin.pl'&& toggleMenu && (
						<ul className={classes['navbar-nav']}>
							<li className={classes['nav-item']}>
								<Link
									className={classes.links}
									to='/'
									onClick={() => setToggleMenu(!toggleMenu)}>
									Home
								</Link>
							</li>
							<li>
								<Link
									className={classes.links}
									to='mybooks'
									onClick={() => setToggleMenu(!toggleMenu)}>
									MyBooks
								</Link>
							</li>
							<li>
								<Link className={classes.links} to='/' onClick={handleLogout}>
									Log out
								</Link>
							</li>
						</ul>
					)}
	
{username ==='admin@admin.pl' && toggleMenu && (
						<ul className={classes['navbar-nav']}>
							<li className={classes['nav-item']}>
							<Link
									className={classes.links}
									to='admin'
									onClick={() => setToggleMenu(!toggleMenu)}>
									Admin
								</Link>
								<Link
									className={classes.links}
									to='/'
									onClick={() => setToggleMenu(!toggleMenu)}>
									Home
								</Link>
							</li>
							<li>
								<Link
									className={classes.links}
									to='mybooks'
									onClick={() => setToggleMenu(!toggleMenu)}>
									MyBooks
								</Link>
							</li>
							<li>
								<Link className={classes.links} to='/' onClick={handleLogout}>
									Log out
								</Link>
							</li>
						</ul>
					)}

					{!isLogged && toggleMenu && (
						<ul className={classes['navbar-nav']}>
							<li className={classes['nav-item']}>
								<Link
									className={classes.links}
									to='/'
									onClick={() => setToggleMenu(!toggleMenu)}>
									Home
								</Link>
							</li>

							<li>
								<Link
									className={classes.links}
									to='login'
									onClick={() => setToggleMenu(!toggleMenu)}>
									Log in
								</Link>
							</li>

							<li>
								<Link
									className={classes.links}
									to='register'
									onClick={() => setToggleMenu(!toggleMenu)}>
									Sign up
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};
