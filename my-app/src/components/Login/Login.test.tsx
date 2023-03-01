import { render, fireEvent, screen, act } from '@testing-library/react';
import { Login } from './Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../App';

jest.mock('firebase/auth');

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('Login component', () => {
	it('renders the login form with e-mail and password fields', () => {
		render(<Login />);
		expect(screen.getByLabelText(/e-mail:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
	});

	it('calls signInWithEmailAndPassword with the correct arguments when the form is submitted', async () => {
		const email = 'test@test.com';
		const password = 'testpassword';
		const signInWithEmailAndPasswordMock =
			signInWithEmailAndPassword as jest.Mock;
		signInWithEmailAndPasswordMock.mockResolvedValueOnce({});

		render(<Login />);

		await act(async () => {
			fireEvent.change(screen.getByLabelText(/e-mail:/i), {
				target: { value: email },
			});
			fireEvent.change(screen.getByLabelText(/password:/i), {
				target: { value: password },
			});
			fireEvent.click(screen.getByRole('button', { name: /log in/i }));
		});

		expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
			firebaseAuth,
			email,
			password
		);
	});

	it('shows an error message when login is unsuccessful', async () => {
		const errorMessage =
			'Panda is not satisfied with your login or password. Please try again';
		const signInWithEmailAndPasswordMock =
			signInWithEmailAndPassword as jest.Mock;
		signInWithEmailAndPasswordMock.mockRejectedValueOnce(
			new Error(errorMessage)
		);

		render(<Login />);
		fireEvent.click(screen.getByRole('button', { name: /log in/i }));

		expect(await screen.findByText(errorMessage)).toBeInTheDocument();
	});
});
