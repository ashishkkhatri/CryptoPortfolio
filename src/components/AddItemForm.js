import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      rowFields: {
        coin: '',
        holding: '',
        editing: false
      }
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOnChange(e,field){
    let rowField = Object.assign({}, this.state.rowFields);
    rowField[field] = e.target.value;
    this.setState({rowFields:rowField});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.saveRow(this.state.rowFields);
    let rowFields= {
      coin: '',
      holding: '',
      editing: false
    };
    this.setState({rowFields});
  }
  render(){
    let { rowFields } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField type="text" placeholder="Coin" value={rowFields.coin} required onChange={(e)=>this.handleOnChange(e,'coin')}/>
        <TextField type="text" placeholder="Holding" value={rowFields.holding} required onChange={(e)=>this.handleOnChange(e,'holding')}/>
        <Button variant="contained" type="submit" color="primary">Submit</Button>
      </form>
    );
  }
}

export default AddItemForm;