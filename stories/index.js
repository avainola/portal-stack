import React from 'react';
import { storiesOf } from '@storybook/react';

import { RemoteFramesProvider, RemoteFrame } from '../src';

const Abc = () => {
  const [isOpen, toggleOpen] = React.useState(false);
  const [isVisible, toggleVisible] = React.useState(false);
  return (
    <div>
      <button onClick={() => toggleOpen(state => !state)}>{isOpen.toString()}</button>
      <RemoteFrame>
        ABC
        {isOpen && (
          <RemoteFrame>
            DEF
            <button onClick={() => toggleVisible(state => !state)}>{isVisible.toString()}</button>
            {isVisible && (
              <RemoteFrame>
                GHI
              </RemoteFrame>
            )}
          </RemoteFrame>
        )}
      </RemoteFrame>
      <RemoteFrame>
        XYZ
      </RemoteFrame>
    </div>
  )
}

storiesOf('Remote frames', module)
  .add('simple', () => (
    <>
      <RemoteFramesProvider target={new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          resolve(document.getElementById("remote-node"))
        })
      })}>
        <Abc />
      </RemoteFramesProvider>
      <div id="remote-node" />
    </>
  ))
