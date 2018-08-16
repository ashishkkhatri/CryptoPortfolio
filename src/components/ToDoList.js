import React, { Component } from 'react';
import * as actions  from '../actions/listAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DisplayList from '../components/DisplayList';
import AddItmeForm from './AddItemForm';
import axios from 'axios';
import {MarketTable} from './MarketCapList';
import { CRYPTO_HOLDINGS } from '../constants';

class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      addRow: false,
      totalNetWorth: 0
    };
    this.addRow = this.addRow.bind(this);
    this.cancelAddition = this.cancelAddition.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.saveEditedData = this.saveEditedData.bind(this);
  }
  componentWillMount(){
    let data = JSON.parse(localStorage.getItem(CRYPTO_HOLDINGS));
    if(data !== null){
      this.saveRow(data);
    }
  }
  componentDidMount(){
    axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=INR&limit=100').then(
      (response)=>{
        this.props.actions.saveCryptoData(response.data);
      }
    );
    axios.get('https://s2.coinmarketcap.com/generated/search/quick_search.json').then(
      (response)=>{
        let data = response.data.slice(0,99);
        this.props.actions.saveCryptoQuickSearchData(data);
      }
    );
  }

  componentWillReceiveProps(nextProps){
    let { cryptoData, quickSearchCryptoData, toDoList } = nextProps;
    let totalNetWorth = 0;
    if(cryptoData !== undefined){
      quickSearchCryptoData.map((data)=>{
        let holding = 0;
        for(var i=0; i<toDoList.length; i++){
          if(toDoList[i].coin === data.symbol){
            holding = toDoList[i].holding;
            break;
          }
        };
        let inrEquivalent = Number(holding) * Number(cryptoData.data[data.id].quotes.INR.price);
        totalNetWorth += inrEquivalent;
      });
      this.setState({totalNetWorth:totalNetWorth});
    }
  }
  addRow(e){
    this.setState({addRow:true});
  }
  cancelAddition(e){
    this.setState({addRow:false});
  }
  saveEditedData(index,data){
    data.editing = false;
    this.props.actions.saveEditedAction(index,data);
  }
  saveRow(rowData){
    this.props.actions.addToToDoList(rowData);
    this.setState({
      addRow:false,
    });
  }
  enableEdit(index){
    this.props.actions.enableEditAction(index);
  }
  deleteItem(index){
    this.props.actions.deleteItemAction(index);
  }

  render(){
    let { addRow } = this.state;
    let { cryptoData, quickSearchCryptoData } = this.props;
    
    return(
      <div>
        <DisplayList data={this.props.toDoList} deleteItem={this.deleteItem} enableEdit={this.enableEdit} saveEditedData={this.saveEditedData} totalNetWorth={this.state.totalNetWorth}/>
        <div>
          {!addRow && <button type="button" onClick={this.addRow}>Add Item</button>}
        </div>
        {addRow && <div>
          <AddItmeForm saveRow={this.saveRow} />
        </div>}
        {cryptoData!==undefined && <MarketTable quickSearchCryptoData={ quickSearchCryptoData } cryptoData={ cryptoData.data } />}
      </div>
    );
  }
}

const mapStateTOProps = state => {
  // console.log('this is state',state);
  return {
    toDoList: state.todos,
    cryptoData: state.cryptoData.cryptoData,
    quickSearchCryptoData: state.quickSearchCryptoData
  };
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const withConnect = connect(mapStateTOProps,mapDispatchToProps)(ToDoList);

export default withConnect;