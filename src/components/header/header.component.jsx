import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({thisCurrentUser, hiddenCartDropdown}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <span>
        {thisCurrentUser ? `Hello ${thisCurrentUser.displayName}` : null}
      </span>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        thisCurrentUser ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> 
        : 
        <Link className='option' to='/signin'>SIGN IN</Link>
      }
      <CartIcon/>
    </div>
    { hiddenCartDropdown ? null : <CartDropdown/> }
  </div>
);
// thisCurrentUser  below is the state that's being used by this header. it is made/instantiaed first here
// state below is from the root reducer. state.user is inside root reducer. state.user.currentUser is inside
// Make sure you add in the below new vars thiscurrentUser and hiddencartdropdown into the props above
const mapStateToProps = (state) => ({
  thisCurrentUser: state.user.currentUser,
  hiddenCartDropdown: state.cart.hidden

})

export default connect(mapStateToProps)(Header);
