import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
// import { bindActionCreators } from 'redux';
import {
	getMessagesAction,
	createMessageAction,
} from './actions/actionCreators';
import './App.css';
// import * as chatActionCreators from './actions/actionCreators';

function App() {
	const { messages, isFetching, error } = useSelector((state) => state.chat);
	const dispatch = useDispatch();
	/* const {getMessagesAction, createMessageAction, } = bindActionCreators(
    chatActionCreators,
    dispatch
  ) */
  

	useEffect(() => {
		dispatch(getMessagesAction());
	}, [dispatch]);

	
	messages.forEach((message) => {
		if(!message){
			dispatch(getMessagesAction())
		}
	})

	console.log(messages)


	const onFormSubmit = (values) => {
		dispatch(createMessageAction(values));
	};
	
	const renderForm = ({ values }) => {
		console.log('values', values);
		
		return (
			<>
				<ol>
					{messages.map((message) => (
						message 
						? 
						<li key={message.createdAt}>
							{message.author} {message.body} {message.createdAt}
						</li>
						: 'Render me please '
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
