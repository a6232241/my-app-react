import { useInsertionEffect } from 'react';
import { Main } from '../components/layout';

const useCSS = (rules: string) => {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = rules;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  })
}

const UseInsertionEffectPage = () => {

  useCSS(
    `
      .dynamic-box {
        width: 100px;
        height: 100px;
        background-color: #646cff;
        border-radius: 8px;
        margin: 20px 0;
        transition: transform 0.3s ease;
      }
      .dynamic-box:hover {
        transform: scale(1.1);
      }
    `
  )

  useCSS(
    `
    .normal-box {
      width: 100px;
      height: 100px;
      background-color: #646cff;
      border-radius: 8px;
      margin: 20px 0;
      transition: transform 5s ease;
    }

    .normal-box:hover {
      transform: translateX(100px);
    }
    `
  )

  return (
    <Main>
      <h1>useInsertionEffect</h1>
      <p>
        <code>useInsertionEffect</code> is for CSS-in-JS library authors. 
        It allows inserting styles into the DOM before any layout effects fire.
      </p>
      <div className="dynamic-box" />
      <div className="normal-box" />
    </Main>
  );
};

export default UseInsertionEffectPage;
