import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { Home } from './Home'
import { Legal } from './Legal'
import { News } from './News'
import { SecondPool, SecondRecycler } from './SecondChance'
import { Staking } from './Staking'
import WhitePaperV1 from '../assets/files/DFT-DeFiat-Whitepaper-V1-August28th2020.pdf'
import WhitePaperV2 from '../assets/files/DFT-DeFiat-Whitepaper.pdf'
import { Footer } from '../components/Footer'
import { Container } from '@material-ui/core'
import { FAQ } from './FAQ'
import { NoMatch } from './NoMatch'
import { Dashboard } from './Dashboard'
import { Scroll } from '../components/Scroll'


export const Routes = () => {
  return (
    <Router basename="/">
      <Scroll />
      <TopBar />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/faq" component={FAQ} />
          <Route path="/legal" component={Legal} />
          <Route path="/news" component={News} />
          <Route path="/second/pool" component={SecondPool} />
          <Route path="/second" component={SecondRecycler} />
          <Route path="/staking" component={Staking} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
      
      <Footer />

      <div className="hidden">
        <a href={WhitePaperV2}>&nbsp;</a>
        <a href={WhitePaperV1}>&nbsp;</a>
      </div>
    </Router>
  )
}
