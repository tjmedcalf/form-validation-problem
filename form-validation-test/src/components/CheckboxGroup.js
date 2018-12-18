import React, { Component } from 'react';
import CheckboxInput from './CheckboxInput';
import Message from './Message';

class CheckboxGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: "", checkboxEl: Array(0)}
	}

	componentDidMount = () => {
		this.selectedCheckboxes = new Set();
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.state.checkboxEl.length > 0 && prevState.checkboxEl.length == 0) {
			//Tell FORM about this field;
			let fieldData = {
				value:  Array(0),
				el: this.state.checkboxEl,
			}
			
			this.props.handleData(this.props.label, fieldData, this.state.isValid);
		}
	}

	toggleCheckbox = label => {
		if (this.selectedCheckboxes.has(label)) {
			this.selectedCheckboxes.delete(label);
		} else {
			this.selectedCheckboxes.add(label);
		}

		//Validation
		if(this.props.rule) {
			this.checkRule()
		}

		//Update FORM
		//Tell FORM about this field;
		let fieldData = {
			value:  Array.from(this.selectedCheckboxes)
		}
		this.props.handleData(this.props.label, fieldData, this.state.isValid);
	}

	checkRule = () => {
		let result = true;
		let {rule} = this.props;

		if(rule.min != undefined) {
			if(rule.message) {
				this.setState({useCustomMessage: true});
			}

			if(this.selectedCheckboxes.size < rule.min) {
				result = false;
			} else {
                result = true;
            }
        }
        
        this.setState({isValid: result}, ()=> {
            let fieldData = {
                value:  Array.from(this.selectedCheckboxes)
            }
            this.props.handleData(this.props.label, fieldData, this.state.isValid);
        });
	}

	compileItem = (input) => {
		this.setState((state) => {
			return {checkboxEl: [...state.checkboxEl, input]};
		});
	}
	
	renderCheckboxes = fields => (
		fields.map( field => {
			return (
				<CheckboxInput 
						elementRef={this.compileItem}
						validate={this.checkRule} 
						handleCheckboxChange={this.toggleCheckbox} 
						label={field} />
			)
		})
	)
	
	render() {
		let options = this.props.options;
		let {label} = this.props;
		let message;

		if(this.state.isValid === false) {
			if(this.state.useCustomMessage) {
				message = <Message custom={this.props.rule.message} />
			} else {
				message = <Message />
			}
		}

		return(
			<div className={"c-field--checkboxes c-field " + (this.state.isValid === false ? "error": "")}>
				<span className="c-field__label">{label}</span>

				<ul className="e-ulist">
					{this.renderCheckboxes(options)}
				</ul>

				{message}
			</div>
		)
	}
}

export default CheckboxGroup;