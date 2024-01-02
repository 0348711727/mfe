import React, { lazy, Suspense, useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'))
const generateClassName = createGenerateClassName({
  productionPrefix: 'con'
})
import Loading from './components/Loading'

export default (props) => {
  const [isSignedIn, setIsSignIn] = useState(false)
  const onSignOut = () => {
    setIsSignIn(false)
  }
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path='/auth' >
                <AuthLazy onSignIn={() => setIsSignIn(true)} />
              </Route>
              <Route path='/' component={MarketingLazy} />
              <Route path='/dashboard' component={DashboardLazy} />

            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  )

}