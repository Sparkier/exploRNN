import Cookies from 'universal-cookie';

/**
 * Get the state of the Intro for this user.
 *
 * @return {object} the state of the introduction.
 */
export function getIntroState() {
  const cookies = new Cookies();
  const currentState = cookies.get('exploRNNIntroState');
  return currentState;
}

/**
 * Set the state of the introduction for a user.
 *
 * @param {object} state the current state of the introduction
 */
export function setIntroState(state) {
  const cookies = new Cookies();
  cookies.set('exploRNNIntroState', state);
}

/**
 * Remove the cookie so that the intro can be shown from the beginning.
 */
export function removeIntroState() {
  const cookies = new Cookies();
  cookies.remove('exploRNNIntroState');
}
