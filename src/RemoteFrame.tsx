import * as React from 'react'

import RemoteFramesContext from './RemoteFramesContext'

interface ConsumerProps {
  pushToPortal?: (children: React.ReactNode) => void;
  removeFromPortal?: (children: React.ReactNode) => void;
}

interface Props {
  children: React.ReactNode;
}

const RemoteFrame = ({ children }: Props): React.ReactNode => {
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
  }, [children])

  if (!pushToPortal) {
    return children;
  }

  return null;
}

export default RemoteFrame;
