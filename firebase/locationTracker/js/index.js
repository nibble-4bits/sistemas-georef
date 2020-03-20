import util from './util.js';

if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', util.uuid());
}