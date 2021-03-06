import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeGoalRef,goalRef } from '../firebase';

class GoalItem extends Component {
  completeGoal() {
    // add to coplete goal

    const { email } = this.props.user;
    const { title, serverKey } = this.props.goal;
    console.log('serverKey', serverKey);
    goalRef.child(serverKey).remove();
    completeGoalRef.push({email, title});
  }
  render () {
    console.log('goal item の中身', this.props.goal);
    const { email, title } = this.props.goal;
    return(
      <div style={{margin: '5px'}}>
        <strong>{title}</strong>
        <span style={{margin: '5px'}}> submitted by <em>{email}</em></span>
        <button className="btn btn-sm btn-primary"
          onClick={() => this.completeGoal()}>
          complate
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps,null)(GoalItem);
