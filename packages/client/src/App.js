import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { bindActionCreators } from 'redux';
import {
	getMessagesAction,
	createMessageAction,
} from './actions/actionCreators';
import { Formik, Form, Field } from 'formik';
import './App.css';
// import * as chatActionCreators from './actions/actionCreators';

function App() {
	const { messages, isFetching, error } = useSelector((state) => state.chat);
	const dispatch = useDispatch();
	/* const {getMessagesAction, createMessageAction, } = bindActionCreators(
    chatActionCreators,
    dispatch
  ) */
  console.log(messages)
	useEffect(() => {
		dispatch(getMessagesAction());
	}, [dispatch]);

	const onFormSubmit = (values) => {
		dispatch(createMessageAction(values));
	};
	
	const renderForm = ({ values }) => {
		// console.log('values', values);
		return (
			<>
				<ol>
					{messages.map((message) => (
						<li key={message.createdAt}>
							{message.author} {message.body} {message.createdAt}
						</li>
					))}
				</ol>
				{error && <div>ERROR!!!</div>}
				{isFetching && <div>Loading ...</div>}
				<Form>
					<label htmlFor='author'>Author</label>
					<Field name='author' />
					<label htmlFor='body'>Body</label>
					<Field name='body' />
					<button type='submit'>Send</button>
				</Form>
			</>
		);
	};
	return (
		<Formik
			initialValues={{ author: '', body: '' }}
			onSubmit={onFormSubmit}
		>
      {renderForm}
    </Formik>
	);
}

export default App;
