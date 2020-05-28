
import React, { useState } from "react"
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import { Link } from 'gatsby'

import GreenPlazaLogo from "../icons/logo.svg"
import Hamburger from "./00-Menu/hamburger"
import { disableScroll, enableScroll } from "./showHide"


const Header = ({lang}) => {
  const [headerStyle, setHeaderStyle] = useState({
    transition: "all 200ms ease-in",
  })

  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuClass: "",
  })

  const [menuClosed, setMenuClosed] = useState(false)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible = currPos.y > prevPos.y || currPos.y > -50
      if (state.clicked !== true) {
        setTimeout(() => {
          const shouldBeStyle = {
            transition: `all 200ms ${isVisible ? "ease-in" : "ease-out"}`,
            transform: isVisible
              ? "none"
              : `translate(0, -${
                document.querySelector(".header").offsetHeight
              }px)`,
          }

          if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

          if (menuClosed) {
            setMenuClosed(false)
          }
          setHeaderStyle(shouldBeStyle)
        }, menuClosed ? 1000 : 0)
      }
    },
    [headerStyle, state]
  )

  const [disabled, setDisabled] = useState(false)

  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuClass: "close",
      })
      disableScroll()
      const shouldBeStyle = {
        transition: `all 200ms ease-in`,
        transform: "none",
        top: '0px'
      }
      setHeaderStyle(shouldBeStyle)
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuClass: "",
      })
      setMenuClosed(true)
      enableScroll()
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuClass: "close",
      })
      disableScroll()
      const shouldBeStyle = {
        transition: `all 200ms ease-in`,
        transform: "none",
        top: '0px'
      }
      setHeaderStyle(shouldBeStyle)
    }
  }

  const disableMenu = () => {
    setDisabled(!disabled)
    setTimeout(() => {
      setDisabled(false)
    }, 1200)
  }

  return (
    <header className="header" style={{ ...headerStyle }}>
      <div className="container">
        <div className="row v-center space-between">
          <div className="logo">
            <GreenPlazaLogo />
          </div>
          <div className="contacts">
            <a href="#" target="_blank">
              г. Актау, 17 мкр., д. 6
            </a>
            <a href="tel:+77292470001">+7 (7292) 470 001</a>
          </div>
          <div className="left-side">
            <div className="langs">
              <Link to="/" className={"langs-item " + (lang !== 'kk' ? 'active' : '')}>
                Ru
              </Link>
              <span>|</span>
              <Link to={"/kk"} className={"langs-item " + (lang === 'kk' ? 'active' : '')}>
                Kz
              </Link>
            </div>
            <div className="nav-toggle">
              <button disabled={disabled} className={"hamburger-menu " + state.menuClass} onClick={() => handleMenu()}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Hamburger state={state} clicked={handleMenu} lang={lang} />
    </header>
  )
}

export default Header
