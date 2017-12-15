import React, { Component } from 'react';
import { goalRef } from '../firebase';


class GoalList extends Component {
  componentDidMount(){
    goalRef.on('value', snap => {
      let goals = [];
      snap.forEach(goal => {
        // let goalObject = goal.val();
        const { email, title } = goal.val();
        goals.push({email, title});
      })
      console.log('goals', goals);
    })
  }

  render(){
    return(
      <div>Goall List</div>
    )
  }
}

export default GoalList;
