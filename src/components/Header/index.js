import './styles.css'

function Header () {
  return(
    <header>
      <div>
        <h1>
          Conversor de Moedas
        </h1>

        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">Sobre</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header