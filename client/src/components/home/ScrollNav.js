import React, { Component } from "react";
import {
    Navbar,
    Nav,
    NavItem,
  } from 'reactstrap';
  import { Link, animateScroll as scroll } from 'react-scroll';
  import Headroom from 'react-headroom';
import { FaArrowAltCircleUp } from 'react-icons/fa';


export default class ScrollNav extends Component {
       scrollToTop = () => {
        scroll.scrollToTop();
      };


    render() {
        return (
            <div className="m-top-1 border-bottom">
                <Headroom>
                    <Navbar className="small-scroll-nav" color="white">
                        <Nav>
                            <NavItem>
                                <Link 
                                    className="nav-link btn btn-light"
                                    activeClass="active"
                                    to="présentation"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    >
                                    Présentation
                                </Link>
                            </NavItem>
                            {/* <NavItem className="nav-link">|</NavItem> */}
                            <NavItem>
                                <Link
                                    className="nav-link btn btn-light"
                                    activeClass="active"
                                    to="disponibilité"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    >
                                    Disponibilité
                                </Link>
                            </NavItem>
                            {/* <NavItem className="nav-link">|</NavItem> */}
                            <NavItem>
                                <Link
                                    className="nav-link btn btn-light"
                                    activeClass="active"
                                    to="commentaires"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    >
                                    Commentaires
                                </Link>
                            </NavItem>
                            {/* <NavItem className="nav-link">|</NavItem> */}
                            <NavItem>
                                <Link
                                    className="nav-link btn btn-light"
                                    activeClass="active"
                                    to="emplacement"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    >
                                    Emplacement
                                </Link>
                            </NavItem>
                            {/* <NavItem className="nav-link">|</NavItem> */}
                            <NavItem>
                                <Link
                                    className="nav-link btn btn-light"
                                    activeClass="active"
                                    to="l'hôte"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    >
                                    L'hôte
                                </Link>
                            </NavItem>
                            {/* <NavItem className="nav-link">|</NavItem> */}
                            <NavItem>
                                <Link
                                    className="nav-link btn btn-light"
                                    activeClass="active"
                                    to="règlement"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    >
                                    Règlement
                                </Link>
                            </NavItem>
                            {/* <NavItem className="nav-link">|</NavItem> */}
                            <NavItem className="nav-item" onClick={this.scrollToTop}>
                                <div className="nav-link btn btn-light">
                                    <FaArrowAltCircleUp/>
                                </div>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Headroom>
            </div>
        )
    }
}