export default function socketDispatcher(config, action, name, dispatch, payload, cb, options) {
  console.log('socketDispatcher')
  action = action.toUpperCase();
  if(!config) config = {};
  if(!config.eventName) config.eventName = "redux_action_event";
  if(config.socketIoFunction) {
    let actionData = {
      type: action+'_'+name
    };
    if(payload) actionData.data = payload;
    console.log('socketDispatcher config', config)
    return new Promise((resolve, reject) => {
      console.log(config.eventName, actionData)
      config.socketIoFunction(config.eventName, actionData, (err, res) => {
        if(err) {
          dispatch({
            type: action+'_'+name+'_FAILED',
            error: err,
          });
          reject(err);
        } else { 
          dispatch({
            type: action+'_'+name+'_COMPLETED',
            data: res,
          });
          resolve(res);
        }
        if(cb) cb(err, res);
        return cb;
      });
    });
  } 
}