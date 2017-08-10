import React from 'react';
import {render} from 'react-dom';
//css
import './style/css/bootstrap.min.css';
import './index.css';
//Js Perso
import {sampleText} from './sampleText';
//Marked.js
import marked from 'marked';
//Media
import logo from './logo.svg';

class App extends React.Component{
	state = {
		text: sampleText
	};
	/*On récupère le contenu du local storage juste avant le montage du component*/
	componentWillMount(){
		const localStorageText = localStorage.getItem('text');
		console.log(localStorageText);
		//Si localStorage existe
		if (localStorageText){
			this.setState({ text: localStorageText});
		}
	}
	/*Avant le rendu*/
	componentWillUpdate(nextProps, nextState){
		localStorage.setItem('text', nextState.text);
	}
	editText = (event) => {
		const text = event.target.value;
		this.setState({ text});
	};

	renderText = (text) => {
		const renderText = marked(text, {sanitize: true});
		return { __html: renderText};
	};
	render(){
		return(
			<div className="container-fuid">
				<div className="App-header center-block">
					<img src={logo} className="App-logo center-block" alt="logo" />
					<h2>Welcome to my Markdown</h2>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<textarea
								value={this.state.text}
								rows="35"
								className="form-control"
								onChange={(e) => this.editText(e)}>
							</textarea>
						</div>
						<div className="col-sm-6">
							<div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

render(
	<App />,
	document.getElementById('root')
);


