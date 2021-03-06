import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import gsap from "gsap"
import scrollTo from "gatsby-plugin-smoothscroll"

import menuImage1 from "../../images/menu_image1.jpg"
import menuImage2 from "../../images/menu_image2.jpg"
import menuImage3 from "../../images/menu_image3.jpg"
import menuImage4 from "../../images/menu_image4.jpg"

import RhombusIcon from "../../icons/rhombus.svg"

const Hamburger = ({ state, clicked, lang }) => {
  let menu = useRef(null)
  let revealMenu = useRef(null)
  let revealMenuBackground = useRef(null)
  let line1 = useRef(null)
  let line2 = useRef(null)
  let line3 = useRef(null)
  let line4 = useRef(null)
  let backgroundImage = useRef(null)
  let backgroundImageInner = useRef(null)

  useEffect(() => {
    if (state.clicked === false) {
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 1,
        width: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.09,
        },
      })
      gsap.to(menu, {
        duration: 1,
        css: { display: "none" },
      })
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.to(menu, {
        duration: 1,
        css: { display: "block" },
      })
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0,
        opacity: 1,
        skewY: 0,
        width: "100%",
      })
      gsap.from([revealMenuBackground, revealMenu], {
        duration: 1,
        width: 0,
        transformOrigin: "right top",
        skewX: 3,
        ease: "power3.inOut",
        stagger: {
          amount: 0.12,
        },
      })
      gsap.from([line1, line2, line3, line4], {
        duration: 0.8,
        y: 100,
        delay: 0.3,
        ease: "power3.inOut",
        stagger: {
          amount: 0.3,
        },
      })
    }
  }, [state])

  const handleItem = image => {
    gsap.to(backgroundImage, {
      duration: 0,
      opacity: 1,
      delay: 0.4,
      backgroundImage: `url(${image})`,
    })
    gsap.to(backgroundImageInner, {
      duration: 0.4,
      width: 0,
      delay: 0.4,
      // skewY: 0,
      ease: "power3.inOut",
    })
    gsap.to(backgroundImage, {
      duration: 0.4,
      scale: 1,
      delay: 0.4,
      ease: "power3.inOut",
    })
  }

  const handleItemReturn = () => {
    gsap.to(backgroundImageInner, {
      duration: 0.4,
      width: "100%",
      ease: "power3.inOut",
    })
    gsap.to(backgroundImageInner, {
      duration: 0.4,
      delay: 0.4,
      width: "100%",
      ease: "power3.inOut",
    })
    gsap.to(backgroundImage, {
      duration: 0.4,
      scale: 1.4,
      ease: "power3.inOut",
    })
  }

  const scrollToMenu = (e, id) => {
    e.preventDefault()
    clicked()
    setTimeout(() => {
      scrollTo(id)
    }, 600)
  }

  const goToLang = () => {
    clicked()
  }

  let about
  let plans
  let gallery
  let contacts
  if (lang !== "kk") {
    about = `О комплексе`
    plans = `Планировки`
    gallery = `Галерея`
    contacts = `Контакты`
  } else {
    about = `Кешен жайлы`
    plans = `Жоспарлар`
    gallery = `Галерея`
    contacts = `Байланыс`
  }

  return (
    <div className="menu" ref={el => (menu = el)}>
      <div
        className="menu-secondary-background-color"
        ref={el => (revealMenuBackground = el)}
      ></div>
      <div className="menu-layer" ref={el => (revealMenu = el)}>
        <div className="container">
          <div className="row v-center space-between">
            <div className="menu-wrapper">
              <div className="menu-photos">
                <div
                  className="menu-photos-image"
                  ref={el => (backgroundImage = el)}
                ></div>
                <div
                  className="menu-photos-inner"
                  ref={el => (backgroundImageInner = el)}
                ></div>
              </div>
              <div className="menu-links">
                <nav>
                  <ul>
                    <li>
                      <RhombusIcon />
                      <div className="link-wrapper">
                        <button
                          ref={el => (line1 = el)}
                          onMouseEnter={() => handleItem(menuImage1)}
                          onMouseLeave={handleItemReturn}
                          onClick={e => scrollToMenu(e, "#complex")}
                        >
                          {about}
                        </button>
                      </div>
                    </li>
                    <li>
                      <RhombusIcon />
                      <div className="link-wrapper">
                        <button
                          ref={el => (line2 = el)}
                          onMouseEnter={() => handleItem(menuImage2)}
                          onMouseLeave={handleItemReturn}
                          onClick={e => scrollToMenu(e, "#flats")}
                        >
                          {plans}
                        </button>
                      </div>
                    </li>
                    <li>
                      <RhombusIcon />
                      <div className="link-wrapper">
                        <button
                          ref={el => (line3 = el)}
                          onMouseEnter={() => handleItem(menuImage3)}
                          onMouseLeave={handleItemReturn}
                          onClick={e => scrollToMenu(e, "#gallery")}
                        >
                          {gallery}
                        </button>
                      </div>
                    </li>
                    <li>
                      <RhombusIcon />
                      <div className="link-wrapper">
                        <button
                          ref={el => (line4 = el)}
                          onMouseEnter={() => handleItem(menuImage4)}
                          onMouseLeave={handleItemReturn}
                          onClick={e => scrollToMenu(e, "#contacts")}
                        >
                          {contacts}
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="menu-languages">
              <Link
                onClick={() => goToLang()}
                to={"/"}
                className={"menu-languages-item " + (lang !== "kk" ? "active" : "")}
              >
                Русский
              </Link>
              <span>|</span>
              <Link
                onClick={() => goToLang()}
                to={"/kk"}
                className={"menu-languages-item " + (lang === "kk" ? "active" : "")}
              >
                Қазақ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hamburger
