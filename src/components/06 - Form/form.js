import React from "react"

import Img from "gatsby-image"

import MainForm from "../mainForm"
import { graphql, useStaticQuery } from "gatsby"

const Form = ({ lang }) => {
  const data = useStaticQuery(graphql`
    query {
      directusFormImage {
        top_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        top_alt_ru
        top_alt_kz
        bottom_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        bottom_alt_ru
        bottom_alt_kz
      }
    }
  `)

  let header
  if (lang !== "kk") {
    header = (
      <>
        <span className="h2-line">
          <span className="h2-color">Оставьте заявку</span> на консультацию
        </span>
        <span className="h2-line">и мы перезвоним вам</span>
      </>
    )
  } else {
    header = (
      <>
        <span className="h2-line">
          Консультацияға (кеңес беруге){" "}
          <span className="h2-color">өтініш қалдырыңыз</span>,
        </span>
        <span className="h2-line">біз сізге қоңырау шаламыз</span>
      </>
    )
  }

  return (
    <section className="section dark form" id="contacts">
      <div className="container">
        <div className="row v-center space-between">
          <h2>{header}</h2>
        </div>
        <div className="row v-center space-between">
          <div className="form-container">
            <div className="form-images">
              <div className="form-images-wrapper">
                <div className="form-images-top">
                  <Img
                    fluid={
                      data.directusFormImage.top_image.localFile.childImageSharp.fluid
                    }
                    alt={lang !== 'kk' ? data.directusFormImage.top_alt_ru : data.directusFormImage.top_alt_kz}
                  />
                </div>
                <div className="form-images-bottom">
                  <Img
                    fluid={
                      data.directusFormImage.bottom_image.localFile.childImageSharp.fluid
                    }
                    alt={lang !== 'kk' ? data.directusFormImage.bottom_alt_ru : data.directusFormImage.bottom_alt_kz}
                  />
                </div>
              </div>
            </div>
            <div className="form-content">
              <div className="form-wrapper">
                <MainForm lang={lang} />
              </div>
              {/*<form>*/}
              {/*  <label htmlFor="name" className="form-content-label name">*/}
              {/*    <span className="form-content-text">Ваше имя и фамилия *</span>*/}
              {/*    <input*/}
              {/*      className="form-content-input"*/}
              {/*      id="name"*/}
              {/*      type="text"*/}
              {/*      name="name"*/}
              {/*      required*/}
              {/*      placeholder="Иван Иванов"*/}
              {/*    />*/}
              {/*  </label>*/}
              {/*  <label htmlFor="email" className="form-content-label email">*/}
              {/*    <span className="form-content-text">Ваше E-mail *</span>*/}
              {/*    <input*/}
              {/*      className="form-content-input"*/}
              {/*      id="email"*/}
              {/*      type="email"*/}
              {/*      name="email"*/}
              {/*      required*/}
              {/*      placeholder="example@example.com"*/}
              {/*    />*/}
              {/*  </label>*/}
              {/*  <label htmlFor="phone" className="form-content-label phone">*/}
              {/*    <span className="form-content-text">Ваш телефон</span>*/}
              {/*    <input*/}
              {/*      className="form-content-input"*/}
              {/*      id="phone"*/}
              {/*      type="text"*/}
              {/*      name="phone"*/}
              {/*      placeholder="+7"*/}
              {/*    />*/}
              {/*  </label>*/}
              {/*  <label htmlFor="message" className="form-content-label message">*/}
              {/*    <span className="form-content-text">Ваш комметарий *</span>*/}
              {/*    <textarea*/}
              {/*      className="form-content-input"*/}
              {/*      id="message"*/}
              {/*      name="message"*/}
              {/*      required*/}
              {/*      placeholder="Напишите нам что-нибудь"*/}
              {/*    ></textarea>*/}
              {/*  </label>*/}
              {/*  <Button buttonType="bordered">оставить заявку</Button>*/}
              {/*</form>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Form
