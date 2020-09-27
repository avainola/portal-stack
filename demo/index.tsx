import React from 'react';
import ReactDOM from 'react-dom';
import { RemoteFrame, RemoteFramesProvider } from '../src';

function Page () {
  return (
    <>
      <RemoteFramesProvider target={new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          resolve(document.getElementById('remote-node'))
        })
      })}>
        <Frames />
      </RemoteFramesProvider>
      <div id="remote-node" style={{ margin: '20px', padding:'20px', backgroundColor: 'lightgray' }}/>
    </>
  )
}

function Frames () {
  const [isOpenFrame1, toggleFrame1] = React.useState(true)
  const [isOpenFrame2, toggleFrame2] = React.useState(false)

  const closeFrame1 = React.useCallback(() => {
    toggleFrame1(false)
  }, [toggleFrame1])
  const closeFrame2 = React.useCallback(() => {
    toggleFrame2(false)
  }, [toggleFrame2])

  return (
    <div style={{ margin: '20px', border: '1px solid black', display: 'flex' }}>
      <div style={{ margin: '20px' }}>
        <button onClick={() => toggleFrame1(!isOpenFrame1)}>Toggle Frame 1</button>
        {isOpenFrame1 && <RFrame key="1" id="1" close={closeFrame1} />}
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={() => toggleFrame2(!isOpenFrame2)}>Toggle Frame 2</button>
        {isOpenFrame2 && <RFrame key="2" id="2" close={closeFrame2} />}
      </div>
    </div>
  )
}

interface FrameProps { 
  id: string
  close: () => void
}

function Frame ({ id, close }: FrameProps) {
  const nextId = `${id}.1`
  const [isOpen, setIsOpen] = React.useState(false);
  const closeFrame = React.useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])
  const toggleFrame = React.useCallback(() => {
    setIsOpen(state => !state)
  }, [setIsOpen])
  const [value, setValue] = React.useState('')

  return (
    <>
      <p>Frame {id}</p>
      <button onClick={close}>Close</button>
      <button onClick={toggleFrame}>Open nested</button>
      <p>
        <input type="text" value={value} onChange={(event) => setValue(event.target.value)}></input>
      </p>
      {isOpen && <RFrame key={nextId} id={nextId} close={closeFrame}/>}
    </>
  )
}

function RFrame (props: FrameProps) {
  return (
    <RemoteFrame>
      <Frame {...props} />
    </RemoteFrame>
  )
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
