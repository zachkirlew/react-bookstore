export const bookReducer = (state = {books:[]}, action) =>{
  switch(action.type){

    case 'GET_BOOKS':
    return {...state, books:[...action.payload]} ;

    case 'POST_BOOK':
    return {...state,
            books: [...state.books, ...action.payload]
            ,msg:'Saved! Click to continue',
            style:'success',
            validation:'success'} ;

    case 'POST_BOOK_REJECTED':
    return {...state,
            msg:'Please try again',
            style:'danger',
            validation:'error'} ;

    case 'RESET_BUTTON':
    return {...state,
            msg:null,
            style:'primary',
            validation:null} ;

    case 'DELETE_BOOK':
    const booksCopyForDelete = [...state.books];
    const indexToDelete = booksCopyForDelete.findIndex(book => book._id == action.payload)

    return {books: [...booksCopyForDelete.slice(0,indexToDelete),
      ...booksCopyForDelete.slice(indexToDelete + 1)]};

    case 'UPDATE_BOOK':

    const booksCopyForUpdate = [...state.books];
    const indexToUpdate = booksCopyForUpdate.findIndex((book) => book._id === action.payload._id)

    const updatedBook = {
        ...booksCopyForUpdate[indexToUpdate],
        title : action.payload.title
      }

    return {books: [...booksCopyForUpdate.slice(0,indexToUpdate),
        updatedBook,
        ...booksCopyForUpdate.slice(indexToUpdate + 1)]};
      }
      return state
    }
