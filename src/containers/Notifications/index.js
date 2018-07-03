import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeToast as removeToastAction } from '../../actions/notifications';

const mapDispatchToProps = {
  removeToast: removeToastAction,
};

const mapStateToProps = state => ({
  notifications: state.notifications,
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Notifications extends Component {
  render() {
    const { notifications } = this.props;

    if (notifications.count === 0) {
      return null;
    }

    return (
      <button
        onClick={() => {
          this.props.removeToast();
        }}
      >
        {notifications.toasts[0].message}
      </button>
    );
  }
}

export default Notifications;
