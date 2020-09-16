import React from 'react';
import CharacterSheet from './characterSheet';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
        <AmplifySignOut />
        <CharacterSheet/>
    </div>
  );
}

export default withAuthenticator(App);
