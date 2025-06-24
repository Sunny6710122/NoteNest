import React from 'react'

function Alert(props) {
    
  return (
    <div style={{height: '50px'}}>
      {props.alertt && <div>
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{props.alertt.type}: </strong> {props.alertt.msg}
          </div>
      </div>}
    </div>
  )
}

export default Alert
