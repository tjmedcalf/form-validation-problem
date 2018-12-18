import React, { Component } from 'react';
import TextInput from './components/TextComponent';
import SelectField from './components/SelectComponent';
import CheckboxGroup from './components/CheckboxGroup';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {showSummary: false};
	}

	successManager = results => {
		this.setState({results: results}, ()=> {
			this.setState({showSummary: true});
		});
	}
	
	render() {
		let page;

		if(!this.state.showSummary) {
			page = <FormComponent success={this.successManager} />
		} else {
			page = <Summary result={this.state.results} />
		}
		
		return (
			<div>
				{page}
			</div>
    	);
  	}
}

class FormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {isFormValid: false, formData: {}, showSummary: false};
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.bindEl = this.bindEl.bind(this);
		this.bindArr = this.bindArr.bind(this);
	}

	triggerEvent = input => {
		input.focus();
		input.blur();
	}

	handleSubmit = evt => {
		evt.preventDefault();
		let formData = this.state.formData;
		
		//Validate all fields.
		if(Object.keys(formData).length > 0) {
			let test = true;
			
			Object.keys(formData).map(field => {
				//trigger event on element;
				if(formData[field].el) {
					if(formData[field].el.focus == undefined) {
						formData[field].el.map(input => {
							this.triggerEvent( input );
						});
					} else {
						this.triggerEvent( formData[field].el );
					}
				}
				
				if(!formData[field].valid) {
					test = false;
				}
			});

			this.setState({isFormValid: test}, ()=> {
				if(this.state.isFormValid) {
					this.props.success(this.state.formData)
				}
			});
		} else {
			this.setState({isFormValid: false});
		}		
	}

	//Methods to bind data from children Components
	bindEl(fieldId, data, isValid = "", remove = false) {
		let formData = this.state.formData;
		let freshData;
		
		//Create initial instance of formData
		if(formData[fieldId] == undefined) {
			formData[fieldId] = {};
		}

		//process the data - first time it has a reference element attached;
		//subsequent updates are data-binding input value only;
		if(data.focus != undefined) {
			freshData = {
				value: data.value,
				valid: isValid,
				el: data
			}
		} else {
			freshData = {
				value: data,
				valid: isValid,
			}
		}

		if(!remove) {
			//Merge new input data with initial instance;
			Object.assign(formData[fieldId], freshData);	
		} else {
			delete formData[fieldId];
		}
		
		this.setState({formData});
	}
	//For fields with multiple choice
	bindArr(fieldId, data, isValid = "") {
		let formData = this.state.formData;
		let freshData;
		
		//Create initial instance of formData
		if(formData[fieldId] == undefined) {
			formData[fieldId] = {};
		}

		if(data.el != undefined) {
			freshData = {
				value: data.value,
				valid: isValid,
				el: data.el
			}
		} else {
			freshData = {
				value: data.value,
				valid: isValid,
			}
		}

		//Merge new input data with initial instance;
		Object.assign(formData[fieldId], freshData);
		this.setState({formData});
	}

	render() {
		const rules = {
			email: {
				regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: "Please enter a valid email address - hint: must include @ and .",
			},
			password: {
				minLength: 8,
				message: "Password must be at least 8 characters"
			},
			animals: {
				min: 2,
				message: "You must choose at least 2 options"
			},
			typeOfTiger: {
				required: true,
				condition: () => {
					if(this.state.formData.Animals) {
						const result = (this.state.formData.Animals.value.indexOf("Tiger") > -1);
						return result;
					} else {
						return false;
					}
				}
			}
		};

		const options = {
			animals: ["Tiger", "Bear", "Snake", "Donkey"],
			colours: ["Blue", "Green", "Red", "Black", "Brown"],
		}

		return(
			<form method='post' action='' onSubmit={this.handleSubmit}>
				<h1>Fill out this awesome form</h1>
				
				<fieldset>
					<legend>Your details</legend>

					<TextInput handleData={this.bindEl} 
							   rule={rules.email} 
							   label="Email" id="email" type="email" placeholder="john.doe@example.com" />
							   
					<TextInput handleData={this.bindEl} 
							   rule={rules.password} 
							   label="Password" id="password" type="password" placeholder="Minimum 8 characters" />
				</fieldset>

				<fieldset>
					<legend>Your animal</legend>

					<SelectField defaultValue="Please select a colour" 
								 handleData={this.bindEl}
								 label="Colour" 
								 options={options.colours}
								 required={true} />

					<CheckboxGroup label="Animals" 
								   handleData={this.bindArr} 
								   options={options.animals}
								   rule={rules.animals} />

					<TextInput label="Type of tiger" 
							   id="tiger_type" 
							   placeholder="This field is required"
							   handleData={this.bindEl} 
							   condition={ rules.typeOfTiger.condition }
							   rule={rules.typeOfTiger} />
				</fieldset>

				<input type='submit' value='Create account' />
			</form>
		)
	}
}

class Summary extends Component {
	renderResults = results => (
		Object.keys(results).map(field => {
			return (
				<li>
					{field}: {results[field].value}
				</li>
			)
		})
	)
	
	render() {
		const {result} = this.props;
		
		return (
			<div>
				<h1>Congrats! Here are your results</h1>
				
				<ul>
					{this.renderResults(result)}
				</ul>
			</div>
		)
	}
}

export default App;