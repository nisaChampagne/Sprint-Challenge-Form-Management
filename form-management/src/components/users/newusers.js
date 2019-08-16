import React from 'react'



const NewUsers = (props) => {

  console.log('new users', props);
  return(
    <div>
      <p>{props.name}</p>
    </div>
    )
  }
export default NewUsers