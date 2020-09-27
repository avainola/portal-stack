import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RemoteFramesContext from './RemoteFramesContext';


interface FramePortalProps {
  stack: React.ReactElement[]
  container?: HTMLElement
}

const FramePortal = React.memo(function FramePortal ({ stack, container }: FramePortalProps) {
  if (stack.length < 1 || !container) {
    return null;
  }

  const renderStack = stack.map((item, index) => (
    <div
      key={item.props.id}
      style={{ display: index === stack.length - 1 ? 'block' : 'none' }}
    >
      {item}
    </div>
  ));

  return ReactDOM.createPortal(<>{renderStack}</>, container);
})

interface Props {
  target: HTMLElement | Promise<HTMLElement>;
}

const RemoteFramesProvider: React.FC<Props> = ({ children, target }) => {
  const [container, setContainer] = React.useState<HTMLElement>();

  React.useEffect(() => {
    if (target instanceof HTMLElement) {
      setContainer(target);
    } else if (target instanceof Promise) {
      target.then((element: HTMLElement) => {
        setContainer(element);
      });
    } else {
      throw new Error('Bad container');
    }
  }, [target]);

  const [stack, updateStack] = React.useState<React.ReactElement[]>([]);

  const pushToPortal = React.useCallback(function pushToPortal(remoteFrameChildren: React.ReactElement) {
    updateStack(stack => [...stack, remoteFrameChildren]);
  }, [updateStack])

  const removeFromPortal = React.useCallback(function removeFromPortal(remoteFrameChildren: React.ReactElement) {
    updateStack(stack => stack.filter(item => item !== remoteFrameChildren));
  }, [updateStack])

  return (
    <RemoteFramesContext.Provider value={{ pushToPortal, removeFromPortal }}>
      {children}
      <FramePortal stack={stack} container={container} />
    </RemoteFramesContext.Provider>
  );
};

export default RemoteFramesProvider;
