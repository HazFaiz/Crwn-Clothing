import React from "react";

import {ReactComponent as ShoppingIcon} from '../../assets/122 shopping-bag.svg'
import { connect } from "react-redux";

import { toggleCartHiddenRedux } from "../../redux/cart/cart.actions";

import './cart-icon.style.scss'

const CartIcon = ({toggleCartHiddenInside}) => (
    <div className="cart-icon" onClick={toggleCartHiddenInside}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHiddenInside: () => dispatch(toggleCartHiddenRedux())
})

export default connect(null, mapDispatchToProps)(CartIcon);