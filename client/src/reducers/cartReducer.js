export const cartReducer = (state = {items:[]}, action) =>{
  switch(action.type){

    case 'GET_CART':
    return {...state,
      items:action.payload,
      totalAmount: total(action.payload).amount,
      totalQty: total(action.payload).quantity};

    case 'ADD_TO_CART':
    return {...state,
      items:action.payload,
      totalAmount: total(action.payload).amount,
      totalQty: total(action.payload).quantity};

    case 'DELETE_CART_ITEM':
    return {...state,
      items: action.payload,
      totalAmount: total(action.payload).amount,
      totalQty: total(action.payload).quantity};

    case 'UPDATE_CART':
    return {...state,
      items: action.payload,
      totalAmount: total(action.payload).amount,
      totalQty: total(action.payload).quantity
    };
    }
    return state
  }

  export const total = cartPayload => {
    const totalCost = cartPayload.map(item => item.price * item.quantity).reduce((a,b)=>a+b,0);

    const totalQty = cartPayload.map(item => item.quantity).reduce((a,b)=>a+b,0);


    return {amount: totalCost.toFixed(2),
            quantity: totalQty};
  }
