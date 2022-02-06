
import { hostService } from '../services/host.service'


export function loadAssets(hostId) {
  return async (dispatch) => {
    try {
      const assets = await hostService.query(hostId);
      dispatch({ type: 'LOAD_ASSETS', assets });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}
export function addAsset(asset) {
  return async (dispatch) => {
    try {
      
      await hostService.save(asset);
     dispatch({ type: 'ADD_ASSET', asset });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}
export function onLoadHostOrders(hostId) {
  return async (dispatch) => {
    try {
      const orders = await hostService.query(hostId);
      dispatch({ type: 'LOAD_HOST_ORDERS', orders });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}

