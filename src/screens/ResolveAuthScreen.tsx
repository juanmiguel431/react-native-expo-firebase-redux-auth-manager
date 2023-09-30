import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { connect } from 'react-redux';
import { resolveAuth } from '../actions';
import { RootState } from '../reducers';

type Props = DispatchProps;

const ResolveAuthScreen: React.FC<Props> = ({ resolveAuth }) => {

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      resolveAuth(user);
    });
  }, [resolveAuth]);

  return null;
};

type DispatchProps = {
  resolveAuth: typeof resolveAuth;
}

export default connect<{}, DispatchProps, {}, RootState>(null, {
  resolveAuth
})(ResolveAuthScreen);
