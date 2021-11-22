
import { store } from 'react-notifications-component';


//https://github.com/teodosii/react-notifications-component
function notify(message){
    store.addNotification({
        title:'',
        message,
        type:'success',
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__bounceIn"],
        animationOut: ["animate__animated", "animate__bounceOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
}

function notifyError(message=''){
  store.addNotification({
      title:'Error',
      message,
      type: 'danger',
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__bounceIn"],
      animationOut: ["animate__animated", "animate__bounceOut"],
      dismiss: {
        duration: 6000,
        onScreen: true
      }
    });
}
export {notify, notifyError};
