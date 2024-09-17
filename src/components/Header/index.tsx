import { Link } from 'react-router-dom';

import './styles.css';

export function Header() {
  return (
    <header>
      <div>
        <h1>Conversor de Moedas</h1>

        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
