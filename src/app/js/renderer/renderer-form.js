(() => {
    require('babel-register')(
        {plugins: 'transform-react-jsx'}
    );
    const React = require('react');
    const ReactDOM = require('react-dom');
    const FormContent = require('./components/form');

    const root = document.getElementById('root');
    ReactDOM.render(React.createElement(FormContent), root);
})();