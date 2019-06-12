import React, { Component } from 'react';
import EachRow from './EachRow';

class App extends Component {

  state = {
    small: {
      number: 0,
      minus: true,
      plus: false,
      price: 150
    },
    medium: {
      number: 1,
      minus: true,
      plus: false,
      price: 200
    },
    large: {
      number: 0,
      minus: true,
      plus: false,
      price: 300
    },
    adults: {
      number: 1,
      minus: true,
      plus: false
    },
    children: {
      number: 0,
      minus: true,
      plus: false
    },
    maxTotalPrice: 1000,
    minTotalPrice: 200
  }

  componentWillMount() {
    const { small, medium, large } = this.state
    this.setState({ totalPrice: this.getTotalPrice(small, medium, large) });
  }

  getTotalPrice = (small, medium, large) => {
    const totalPrice = 
      (small.number*small.price) + 
      (medium.number*medium.price) + 
      (large.number*large.price);
    return totalPrice;
  }

  handler = (name, type) => {
    const newState = { ...this.state };
    name = name.toLowerCase();
    let value = newState[name].number
    if (type === 'minus') value -= 1;
    else value += 1;
    newState[name.toLowerCase()].number = value;
    this.setState({ ...newState });
    this.disabledButtonHandler(this.state, name, type);
  }

  disabledButtonHandler = (props, name, type) => {
    let newState = props;
    const { small, medium, large } = newState;
    switch (name) {
      case 'small':
        if(type === 'plus'){
            newState.children.number += 1;
          if(newState.small.number % 2 === 0) {
            newState.small.number = 0;
            newState.medium.number += 1;
            if(newState.medium.number % 2 === 0) {
              newState.medium.number = 0;
              newState.large.number += 1;
            }
          }
        } else {
          newState.children.number -= 1;
        }
        break;
      case 'medium':
        if(type === 'plus'){
            newState.adults.number += 1;
          if(newState.medium.number % 2 === 0) {
            newState.medium.number = 0;
            newState.large.number += 1;
          }
        } else {
          if(newState.adults.number > 1) newState.adults.number -= 1;
          else newState.children.number -= 2;
        }
        break;
      case 'large':
        if(type === 'plus'){
          newState.adults.number += 2;
        } else {
          if(newState.adults.number > 1) 
            if(newState.adults.number === 2){
              newState.adults.number -= 1;
              newState.children.number -= 2;
            } else {
              newState.adults.number -= 2;
            }
          else newState.children.number -= 4;
        }
        break;
      case 'adults':
        if(type === 'plus'){
          newState.medium.number += 1;
          if(newState.medium.number % 2 === 0) {
            newState.medium.number = 0;
            newState.large.number += 1;
          }
        } else {
          if (newState.medium.number > 1) newState.medium.number -= 1;
          else {
            newState.medium.number += 1;
            newState.large.number -= 1;
          }
        }
        break;
      case 'children':
        if(type === 'plus'){
          newState.small.number += 1;
          if(newState.small.number % 2 === 0) {
            newState.small.number = 0;
            newState.medium.number += 1;
            if(newState.medium.number % 2 === 0) {
              newState.medium.number = 0;
              newState.large.number += 1;
            }
          }
        } else {
          if (newState.small.number > 0) newState.small.number -= 1;
          else if (newState.large.number > 0) {
            if (newState.medium.number > 0) {
              newState.medium.number -= 1;
              newState.small.number += 1;
            } else {
              newState.large.number -= 1;
              newState.medium.number += 1;
              newState.small.number += 1;
            }
          }
        }
        break;
      default:
        break;
    }
    newState.totalPrice = this.getTotalPrice(small, medium, large);
    Object.keys(newState).map((ele) => {
      if(typeof(newState[ele]) === "object") {
        if (newState[ele]['number'] < 1) 
          newState[ele]['minus'] = true;
        else
          newState[ele]['minus'] = false;
        if ( newState[ele]['price'] !== undefined ) {
          if ((newState.totalPrice + newState[ele]['price'])/newState[ele]['price'] > newState.maxTotalPrice/newState[ele]['price'])
            newState[ele]['plus'] = true;
          else 
            newState[ele]['plus'] = false
          if (((newState.totalPrice - newState[ele]['price'])/newState[ele]['price'] < newState.minTotalPrice/newState[ele]['price']) || newState[ele].number === 0) 
            newState[ele]['minus'] = true;
          else 
            newState[ele]['minus'] = false
        } else {
          if(newState.medium.plus && newState.large.plus && newState.small.plus) {
            newState.adults.plus = true;
            newState.children.plus = true;
          } else {
            newState.adults.plus = false;
            newState.children.plus = false;
          }
          if(newState.adults.number === 1) newState.adults.minus = true;
          else newState.adults.minus = false;
        }
      }
      return ele;
    });
    this.setState({ ...newState });
  }

  render() {
    const { small, medium, large, adults, children, totalPrice } = this.state;
    return (
      <div className="container w-50 py-5 mx-auto">
        <h3 className="text-primary">
          Order <span className="h2">Pizza</span>
        </h3>
        <div className="border p-3">
          <EachRow 
            name="SMALL" 
            number={small.number} 
            size='15' 
            icon='pizza'
            handler={this.handler}
            plus={small.plus}
            minus={small.minus}
          />
          <EachRow 
            name="MEDIUM" 
            number={medium.number} 
            size='20' 
            icon='pizza'
            handler={this.handler}
            plus={medium.plus}
            minus={medium.minus}
          />
          <EachRow 
            name="LARGE" 
            number={large.number} 
            size='26' 
            icon='pizza'
            handler={this.handler}
            plus={large.plus}
            minus={large.minus}
          />
          <hr />
          <EachRow 
            name="ADULTS" 
            number={adults.number} 
            icon="user" 
            handler={this.handler}
            plus={adults.plus}
            minus={adults.minus}
          />
          <hr />
          <EachRow 
            name="CHILDREN" 
            number={children.number} 
            icon="user" 
            handler={this.handler}
            plus={children.plus}
            minus={children.minus}
          />
        </div>
        <div className="d-flex justify-content-between">
          <h2>Total Price</h2>
          <h1>Rs {totalPrice}/- </h1>
        </div>
      </div>
    )
  }
}

export default App;