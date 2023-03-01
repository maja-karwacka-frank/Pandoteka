import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { firebaseAuth } from '../../App';
import classes from './Login.module.css';
import userIcon from '../../Graphics/User-icon.png';
import React from 'react';

export const Login = (): JSX.Element => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();
	const [isInputError, setIsInputError] = useState<boolean>(false);
	
	const signIn = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(firebaseAuth, username, password);
			navigate('/');
		} catch ({ message }) {
			console.log(message);
			setIsInputError(true);
			setError(
				'Panda is not satisfied with your login or password. Please try again'
			);
			setTimeout(() => {
				setError('');
			}, 6000);
		}
	};

	return (
		<>
			<br />
			<br />
			<h1>
				<img className={classes.userIcon} src={userIcon}></img>&nbsp;Log in:
			</h1>
			<form>
				<div className={classes.login}>
					<div className={classes.item}>
						<label htmlFor='email'>
							<b>E-mail:</b>
						</label>

						<input
							className={isInputError ? classes.wrongInput : classes.login}
							name='login'
							id='email'
							type='email'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								setIsInputError(false);
							}}
						/>
					</div>

					<div className={classes.item}>
						<label htmlFor='password'>
							<b>Password:</b>
						</label>

						<input
							className={isInputError ? classes.wrongInput : classes.login}
							name='password'
							id='password'
							type='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setIsInputError(false);
							}}
						/>
					</div>
					<p className={classes.error}>{error}</p>
					<button className={classes.logBtn} onClick={signIn}>
						Log in
					</button>
				</div>
				<div className={classes.positionBtn}>
					<button className={classes.backBtn} onClick={() => navigate('/')}>
						Back to Home
						<br />
						<span className={classes.arrow}>⟻</span>
					</button>
				</div>
				<br />
			</form>
		</>
	);
};
