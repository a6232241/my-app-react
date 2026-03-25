import { useImperativeHandle, useRef } from 'react';
import { Main } from '../components/layout';

interface MyInputRef {
  focus: () => void;
}

const MyInput = ({ref}: {ref?: React.RefObject<MyInputRef | null>}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        console.log('I focus on input')
        inputRef.current?.focus();
      },
    };
  });

  return <input ref={inputRef} />
}

const UseImperativeHandlePage = () => {
  const ref = useRef<MyInputRef>(null);

  return (
    <Main>
      <h1>useImperativeHandle</h1>
      <MyInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </Main>
  );

}

export default UseImperativeHandlePage;