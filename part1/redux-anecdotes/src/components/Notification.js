
import React from 'react'
import { connect } from 'react-redux'
// import { useSelector } from 'react-redux'

const Notification = ({ notification }) => {
  // const notification = useSelector(state => state.message)
  const style = {
    display: notification ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification