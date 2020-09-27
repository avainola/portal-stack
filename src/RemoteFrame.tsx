import * as React from 'react';
import RemoteFramesContext from './RemoteFramesContext';

interface ConsumerProps {
  pushToPortal?: (children: React.ReactElement) => void;
  removeFromPortal?: (children: React.ReactElement) => void;
}

const RemoteFrame: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { pushToPortal, removeFromPortal }: ConsumerProps = React.useContext(RemoteFramesContext);

  React.useEffect(() => {
    if (pushToPortal) {
      pushToPortal(children);
    }

    return () => {
      if (removeFromPortal) {
        removeFromPortal(children);
      }
    }
  }, [pushToPortal, removeFromPortal])

  if (!pushToPortal) {
    return children
  }

  return null;
}

export default RemoteFrame;
