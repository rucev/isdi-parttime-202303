import { context,  } from '../ui/general-tools.js';
import { loginPage } from './login-page.js';
import { logout, } from '../ui/login-register.js';
import { setOff, setOn, resetAlerts, clearForms, } from '../ui/general-tools.js'
import { displayProfile, displayWelcome, } from '../ui/home.js'
import { favoritesPage, profile, profileButtons, } from './home-user-profile-page.js';
import initPostsList from '../components/posts-list.js';
import initPostModal from '../components/post-modal.js';

export const homePage = document.querySelector('.home');
export const mainHome = document.querySelector('.home-main');
export const profileForms = document.querySelector('.profile-forms');
export const postModal = initPostModal(context.userAuth);

const toNewPost = document.querySelector('.to-new-post');

const toLogout = document.querySelector('.logout');
const toUserProfile = document.querySelector('.to-user-profile');
const toHome = document.querySelector('.to-home');

const toggleNav = document.querySelector('.nav-menu');
const nav = document.querySelector('.navbar');
const page = document.querySelector('.home-page');

toggleNav.addEventListener('click', (event)  => {
  event.preventDefault();
  toggleNav.classList.toggle('close')
  nav.classList.toggle('show')
})

page.addEventListener('click', (event)  => {
  if((nav.classList).contains('show')){
    event.preventDefault();
    nav.classList.remove('show')
    toggleNav.classList.remove('close')
  }
})

toLogout.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setOff(profile, profileForms, profileButtons, mainHome)
  logout(loginPage, homePage);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setOn(profile, profileButtons);
  setOff(mainHome, profileForms, favoritesPage);
  displayProfile(context.userAuth);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setOn(mainHome);
  setOff(profile, profileButtons, profileForms);
  initPostsList(context.userAuth, postModal, 'all');
  displayWelcome(context.userAuth)
});

toNewPost.addEventListener('click', (event) => {
  event.preventDefault();
  postModal.openPostModal();
});


  

