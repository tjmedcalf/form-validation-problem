import React, { Component } from 'react';

class CheckboxInput extends Component {
	constructor(props) {
		super(props);
		this.state = {isChecked: false}
	}

	componentDidMount = () => {
		this.props.elementRef(this.checkboxElement)
	}

	updateParent = () => {
		this.props.validate();
	}

	toggleSelected = () => {
		let {label, handleCheckboxChange} = this.props;
		
		this.setState(({ isChecked }) => (
			{
			  isChecked: !isChecked,
			}
		));

		handleCheckboxChange(label);
	}
	
	render() {
		let {label} = this.props;
		let inputId = label.toLowerCase();
		let isChecked = this.state.isChecked;
		
		return(
			<li className="e-ulist__item">
				<div className="c-checkbox">
					<input type='checkbox' name='animal'
						   checked={isChecked}
						   value={inputId} 
						   id={inputId}
						   ref={input => this.checkboxElement = input} 
						   onBlur={this.updateParent}
						   onChange={this.toggleSelected} />

					<label className="c-checkbox__label" htmlFor={inputId}>
						{label}
					</label>
				</div>
			</li>
		)
	}
}

export default CheckboxInput;