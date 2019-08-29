import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ fireBase }) => (
    <button type="button" onClick={fireBase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);
