import './style.css';

let productValue = Number(prompt('Enter the product value'));

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Product Value: ${productValue >= 20 ? 'Approved' : 'Denied'}</h1>
  </div>
`;
