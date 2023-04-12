import { retrieveUser, } from '../logic/retrieve-user.mjs';
import { updatePost } from '../logic/update-post.mjs';

export const context = { userAuth: undefined}

export const toggleOff = (...items) => {
  items.forEach((item) => {
    item.classList.toggle('off');
  });
};

export const setOff = (...items) => {
  items.forEach((item) => {
    item.classList.add('off');
  });
};

export const setOn = (...items) => {
  items.forEach((item) => {
    item.classList.remove('off');
  });
};

export const clearForms = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
  const filesInputs = document.querySelectorAll('input[type="file"]');
  filesInputs.forEach((input) => (input.value = ''));
  const filesDelete = document.querySelectorAll('.delete-img');
  filesDelete.forEach((item) => {
    item.classList.add('off');
  });
};

export const clearPostModal = (modal) => {
  clearForms();
  modal.className = 'post-modal';
  const selectedNewPostImg = document.querySelector('.new-post-image');
  const setNewPostImg = document.querySelector('.set-image');
  selectedNewPostImg.src = 'https://sgame.etsisi.upm.es/pictures/12946.png';
  setOn(setNewPostImg);
}

const resetAlertStyles = (alertUser) => {
  alertUser.classList.remove('alert-success');
  alertUser.classList.remove('alert-warning');
  alertUser.classList.remove('alert-danger');
  alertUser.classList.add('off');
};

export const resetAlerts = () => {
  const alerts = document.querySelectorAll('.alert');
  if (alerts.length > 0) {
    alerts.forEach((alertUser) => resetAlertStyles(alertUser));
  };
};

export const setAlert = (alertArea, alertColor, alertMessage) => {
  const alertUser = document.querySelector(`.${alertArea}`);
  alertUser.innerHTML = `${alertMessage}<span class='close-alert'>x</span>`;
  alertUser.classList.add(alertColor);
  alertUser.classList.remove('off');
  const closeAlert = document.querySelector(`.${alertArea}`).querySelector('.close-alert');
  closeAlert.addEventListener('click', (event) => {
    event.preventDefault();
    alertUser.classList.add('off');
  });
};

export const setSimpleAlert = (alertArea, alertColor, alertMessage) => {
  const alertUser = document.querySelector(`.${alertArea}`);
  alertUser.innerHTML = `${alertMessage}`;
  alertUser.classList.add(`${alertColor}--simple`);
  alertUser.classList.remove('off');
};

export const setPredeterminateAvatar = (userAuth) => {
  if (userAuth) {
    const user = retrieveUser(userAuth);
    document.querySelector('.avatar').src = user.avatar;
  } else {
    document.querySelector('.avatar').src = 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png';
  };
};

export const getImgUrl = (event) => {
  const reader = new FileReader() 
  const file = event.target.files[0]; 
  reader.onload = () => {     
    reader.result;
  }
  reader.readAsDataURL(file)
  return URL.createObjectURL(file)
}

export const controlUsernameInput = (input) => {
  let username = '';
  const regexRule = /^[a-zA-Z0-9]*$/;
  if(!regexRule.test(input.value)) {
    username = input.value.slice(0, -1);
  } else {
    username = input.value
  }
  input.value = username
}

//TODO: add validators to print post, plus try catch -> validate user is logged, 

export const openModal = (modal, previousPost) => {
  previousPost ? modal.classList.add(`editing-${previousPost.id}`) : modal.classList.add('creating')
  const blur = document.querySelector('.blur');
  setOn(modal, blur);
  const selectedNewPostImg = document.querySelector('.new-post-image');
  const newPostTextInput = document.querySelector('.new-post-form').querySelector('input[name="post-text"]');
  if(previousPost) {
    selectedNewPostImg.src = previousPost.image;
    newPostTextInput.value = previousPost.text;

  }
};


export const closeModal  = (modal) => {
  clearPostModal(modal)
  const blur = document.querySelector('.blur');
  setOff(modal, blur);
};