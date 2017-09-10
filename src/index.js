import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/bootstrap.min.css';
import './index.css';
import { sampleText } from './sampleText';
import marked from 'marked';

class App extends React.Component {
	state = {
		text: sampleText
	};

	componentWillMount(){
		const text = localStorage.getItem('text')
		if(text){
			this.setState({ text })
		}
	}
	componentWillUpdate(nexProps, nextState) {
		localStorage.setItem('text', nextState.text);
	}

	editText = (event) => {
		const text = event.target.value
		this.setState({text})
	}

	downloadFile = (name_file, type) => {
		const text = this.state.text
		var element = document.getElementById("file");
		let file = new Blob([text], {type: type});
		element.href = URL.createObjectURL(file);
		element.download = name_file;
	};

	renderText = (text) => {
		const renderText = marked(text, {sanitize: true });
		return { __html: renderText };
	}
	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea rows="35" onChange={((e) => this.editText(e))} value={this.state.text} className="form-control"></textarea>
						<button className="btn btn-primary" onClick= { this.downloadFile.bind(this, 'test.md', 'text/plain')}> création de votre fichier</button>
						<a href="" id="file">Télécharger votre fichier une fois que vous l'avez créer</a>
						
					</div>
					<div className="col-sm-6">
						<h1> Resultat</h1>
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
					</div>	
				</div>
			</div>
		);
	}
}

ReactDOM.render( <App />, document.getElementById('root'));