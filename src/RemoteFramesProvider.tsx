import * as React from "react";
import * as ReactDOM from "react-dom";

import RemoteFramesContext from "./RemoteFramesContext";

function renderToPortal(stack: React.ReactNode[], container?: HTMLElement) {
  if (stack.length < 1 || !container) {
    return null;
  }

  const renderStack = stack.map((item, index) => (
    <div
      key={index}
      style={{ display: index === stack.length - 1 ? "block" : "none" }}
    >
      {item}
    </div>
  ));

  return ReactDOM.createPortal(<>{renderStack}</>, container);
}

interface Props {
  target: HTMLElement | Promise<HTMLElement>;
  children: React.ReactNode;
}

const RemoteFramesProvider = ({ children, target }: Props) => {
  const [container, setContainer] = React.useState<HTMLElement>();
  React.useEffect(() => {
    if (target instanceof HTMLElement) {
      setContainer(target);
    } else if (target.then) {
      target.then((element: HTMLElement) => {
        setContainer(element);
      });
    } else {
      throw new Error("Bad container");
    }
  }, [target]);

  const initialState: React.ReactNode[] = [];
  const [stack, updateStack] = React.useState(initialState);

  function pushToPortal(remoteFrameChildren: React.ReactNode) {
    updateStack(stack => [...stack, remoteFrameChildren]);
  }

  function removeFromPortal(remoteFrameChildren: React.ReactNode) {
    updateStack(stack => stack.filter(item => item !== remoteFrameChildren));
  }

  return (
    <RemoteFramesContext.Provider value={{ pushToPortal, removeFromPortal }}>
      {children}
      {renderToPortal(stack, container)}
    </RemoteFramesContext.Provider>
  );
};

export default RemoteFramesProvider;
