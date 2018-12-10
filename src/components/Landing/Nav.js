import React from 'react';
import {Link} from 'react-router-dom';
import styled, { css } from 'styled-components';
import {LOGO} from "../../constants";
import netflixlogo from './img/logo.svg';

export const NavLogo = styled.nav`
    height: 90px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    /* Netflix logo */
    img {
        width: 350px;
        height : 65px;
        vertical-align: middle;
    }
    .logo {
        display: inline-block;
        line-height: 90px;
        margin: 0 0 0 3%;
    }
`;

const Button = styled.button`
    color: white;
    cursor: pointer;
    background-color: #e50914;
    line-height: normal;
    margin: 18px 3% 0 0;
    padding: 7px 17px;
    font-weight: 100;
    border: transparent;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: one;

    ${props => props.right && css`
        float: right;
    `}
    &:hover {
        background-color: #E53935;
    }
    & a{
        text-decoration: none;
        color: white;
    }
`;

const nav = () => {
  return (
    <NavLogo   >
      <a href={"/"} className="logo">
        {/*<img src={netflixlogo} alt="Netflix Logo" />*/}
        <img src={LOGO} width={'30px'} height={'60px'} alt="Netflix Logo" />
      </a>
      <Button right><Link to='/signin'>Sign In</Link></Button>
      <Button right><Link to='/adminSignin'>Admin</Link></Button>
    </NavLogo>
  )
}

export default nav;
