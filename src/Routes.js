import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'

function Routes () {
  return (
    <Switch>
      <Route path="/about" exact component={About} />
      <Route path="/" exact component={Home} />
    </Switch>
  )
}

export default Routes