import { call, fork, put, take } from "redux-saga/effects";
import { firebaseAuth } from "src/firebase";
import history from "src/history";
import { authActions } from "./actions";

function* signIn(authProvider) {
  try {
    const authData = yield call(
      [firebaseAuth, firebaseAuth.signInWithPopup],
      authProvider
    );
    yield put(authActions.signInFulfilled(authData.user));
    yield history.push("/");
  } catch (error) {
    yield put(authActions.signInFailed(error));
  }
}

function* signOut() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.signOutFulfilled());
    yield history.replace("/sign-in");
  } catch (error) {
    yield put(authActions.signOutFailed(error));
  }
}

function* watchSignIn() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN);
    yield fork(signIn, payload.authProvider);
  }
}

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}

export const authSagas = [fork(watchSignIn), fork(watchSignOut)];
