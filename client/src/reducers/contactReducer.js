export const contactReducer = (state = {}, action) =>{
  switch(action.type){

    case 'POST_CONTACT':
    return {...state,
      msg:'Message sent! Click to continue',
      style:'success',
      validation:'success'} ;

    case 'POST_CONTACT_REJECTED':
    return {...state,
        msg:'Please try again',
        style:'danger',
        validation:'error'} ;


    case 'RESET_BUTTON':
    return {...state,
          msg:null,
          style:'primary',
          validation:null} ;
        }
        return state
      }
