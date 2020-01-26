import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import foods from './foods.json'
import FoodBox from './component/FoodBox'
import AddFood from './component/addFood'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.getData(),
      name: '',
      items: []
    }
    this.addFoodItem = this.addFoodItem.bind(this);
  }

  getData() {
    const result = foods
    return result
  }

  addFoodHandler = (theFood) => {
    const foodCopy = [...this.state.list];
    foodCopy.push(theFood);
    this.setState({
      list: foodCopy
    })
  }

  searchHandleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value })
  }

  addFoodItem(value) {
    const items = [...this.state.items];
    const hasItem = items.some(el => el.name === value.name);
    if (!hasItem) {
      items.push(value);
      console.log(items[0].quantity - 1)
    } else {
      for (let idx = 0; idx < items.length; idx += 1) {
        if (items[idx].name === value.name) {
          items[idx].quantity += value.quantity;
          break;
        }
      }
    }

    this.setState({ items });
  }

  removeItem(index) {
    const items = [...this.state.items];
    items[index].quantity -= 1
    if (items[index].quantity === 0) {
      items.splice(index, 1);
    }
    this.setState({ items });
  }

  render() {
    const { items } = this.state;

    let input = this.state.name

    // transform first capital lettler
    const titleize = text => {
      if (text !== '') {
        var words = text.toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
          var w = words[a];
          if (w[0] !== undefined) {
            words[a] = w[0].toUpperCase() + w.slice(1);
          }
        }
        return words.join(" ");

      }
      return ""
    }

    return (
      <div className="App">
        <div className="has-text-centered content">
          <h1 className="title">Iron Nutrition</h1>
          <hr />
          <div className="field">
            <label className="label">Search:</label>
            <div className="control">
              <input className="input" type="text" name="name" value={this.state.name} onChange={(e) => this.searchHandleChange(e)} />
            </div>
          </div>
        </div>
        <AddFood addTheFood={this.addFoodHandler} />
        <div className="columns">
          <div className="column is-three-fifths">
            {this.state.list.filter((el) => el.name.includes(titleize(input))).map((el, idx) => (
              <FoodBox
                key={idx}
                name={el.name}
                calories={el.calories}
                image={el.image}
                quantity={el.quantity + 1}
                add={this.addFoodItem}
              />
            ))}
          </div>
          <div className="column">
            <div className="column content">
              <h2 className="subtitle">Today's foods</h2>
              <ul>
                {items.map((item, idx) => (
                  <li key={idx}>
                    {item.quantity} {item.name} = {item.calories * item.quantity} cal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className="button is-danger is-small is-outlined" onClick={() => this.removeItem(idx)}>
                      Remove
                  </button>
                  </li>
                ))}
              </ul>
              <strong>Total: {items.reduce((acc, item) => (acc += item.calories * item.quantity), 0)} cal</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
