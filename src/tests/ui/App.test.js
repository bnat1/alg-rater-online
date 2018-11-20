import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
// https://medium.com/@leonardobrunolima/react-tips-working-with-relative-path-using-create-react-app-fe55c5f97a21

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
