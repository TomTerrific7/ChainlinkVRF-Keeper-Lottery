import logo from './logo.svg';
import './App.css';
import { React, Component } from 'react';
import web3 from './web3';
import lottery from './Lottery';

class App extends Component {

  state = {
   
    open:'',
    value:'',
    calculating:''

  };

  async componentDidMount(){
    const open = await lottery.methods.startNewLottery.call();
    const calculating = await lottery.methods.getRandomNumber.call();
    
    
    const balance = await web3.eth.getBalance(lottery.options.address);
    // set the  state
    this.setState({ open, calculating });
  }

  onClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Starting New Lottery... please hold on'})

    await lottery.methods.startNewLottery().send({
      from: '0xf2c8029A51137f94675dECb7996F290ef2b42F23'
    });

    this.setState({message: 'Lottery Started!'});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);
    this.setState({ message: "waiting for transaction ...please hold on!"})
    // this will take some time
    await lottery.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    // after the execution of enter call
    this.setState({message: "You have been entered...Good Luck!"})
  }

 
  render() { 


  return (
    <div class="App">
      
      <button onClick= {this.onClick} >Start Lottery</button>
      <hr />
      <h1>{this.state.message}</h1>
      <form onSubmit={this.onSubmit}>
        <h4>Enter Lottery</h4>
        <div>
          <label>Price is .1 Ether </label>
          <br/>
          <input 
          value = {this.state.value}
          onChange = {event => this.setState({value: event.target.value })} />
          
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
}
}

export default App;
