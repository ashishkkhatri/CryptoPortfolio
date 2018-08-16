import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class DisplayList extends Component{
  constructor(props){
    super(props);
    this.state = {
      editableItemsData:[]
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.submitEditedItem = this.submitEditedItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    let arr =[];
    nextProps.data.map((item,index)=>{
      if(item.editing === true){
        if(this.state.editableItemsData[index] !== undefined){
          arr[index] = this.state.editableItemsData[index];
        } else {
          arr[index] = item;
        }
      }
    });
    this.setState({editableItemsData: arr});
  }
  enableEdit(e,index){
    this.props.enableEdit(index);
    let editableList = [...this.state.editableItemsData];
    editableList[index] = this.props.data[index];
    this.setState({editableItemsData: editableList});
  }
  submitEditedItem(index){
    this.props.saveEditedData(index,this.state.editableItemsData[index]);
  }
  handleChange(e,field,index){
    let data = Object.assign({},this.state.editableItemsData[index]);
    data[field] = e.target.value;
    let list = [...this.state.editableItemsData];
    list[index] = data;
    this.setState({editableItemsData: list});
  }
  render(){
    let itemList = this.props.data;
    let { editableItemsData } = this.state;
    return (
      <div>
        <p>Total Net Worth: {this.props.totalNetWorth}</p>
        {itemList.length > 0 && 
        <Table>
          <TableHead>
          <TableRow>
            <th>Coin</th>
            <th>Holding</th>
            <th>Action</th>
          </TableRow>
          </TableHead>
          <TableBody>
          { itemList.map((item,index)=>{
              if(item.editing === false){
                return (<TableRow key={index}>
                  <TableCell>{item.coin}</TableCell>
                  <TableCell>{item.holding}</TableCell>
                  <TableCell>
                    <Button type="button" color="primary" onClick={(e)=>this.enableEdit(e,index)}>Edit</Button>
                    <Button type="button" color="secondary" onClick={(e)=>this.props.deleteItem(index)}>Delete</Button>
                  </TableCell>
                </TableRow>);
              } else {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <form id={"form"+index} onSubmit={(e)=>{e.preventDefault();this.submitEditedItem(index);}}>
                      <input type="text" placeholder="coin" value={editableItemsData[index].coin} required onChange={(e)=>this.handleChange(e,'coin',index)}/>
                    </form>
                  </TableCell>
                  <TableCell><input form={"form"+index} type="text" placeholder="Holding" value={editableItemsData[index].holding} required onChange={(e)=>this.handleChange(e,'holding',index)}/></TableCell>
                  <TableCell>
                    <input form={"form"+index} type="submit" value="Submit"/>
                  </TableCell>
                </TableRow>
              );
            }
          })}
          </TableBody>
        </Table>}
      </div>
    );
  }
}

export default DisplayList;