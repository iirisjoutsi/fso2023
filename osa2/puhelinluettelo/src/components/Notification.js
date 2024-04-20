const Notification = ({ message, error }) => {
  if (message === "") {
    return null
  }

  if (error) {
    return (
      <div className="notification error">
        {message}
      </div>
    )
  }
  
  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification