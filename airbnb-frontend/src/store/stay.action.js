import { stayService } from '../services/stay.service';

export function loadStays(filterBy) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filterBy);
      dispatch({ type: 'SET_STAYS', stays });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}

export function onSetStays(stays) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.log('err', err);

    }
  }

}


export function onSetFilter(filterBy) {
  try {
    return (dispatch) => {
      stayService.query(filterBy)
        .then(stays => {
          dispatch({
            type: 'SET_STAYS',
            stays
          })
        })
    }
  } catch (err) {
    console.log('err', err);
  }
}


