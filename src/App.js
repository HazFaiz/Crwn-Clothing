import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { setCurrentUserRedux } from './redux/user/user.actions';


import {auth, createUserProfileDocument} from './firebase/firebase.utils'


class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount() {
    const { makeANewUser } = this.props;

   


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          makeANewUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      makeANewUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

// setCurrentUser is this file's own state. blablaRedux is the user.actions.js
// makeANewUser is first made in here and then will be available througout this file from this.props
const mapDispatchToProps = dispatch => ({
  makeANewUser: user => dispatch(setCurrentUserRedux(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
