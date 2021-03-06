import React from "react"

import Infrastructure from "../../icons/infrastructure.svg"
import InfrastructureMobile from "../../icons/infrastructure-mobile.svg"
import InfrastructureKZ from "../../icons/infrastructure_kz.svg"
import InfrastructureMobileKZ from "../../icons/infrastructure-mobile_kz.svg"
import ComplexFlats from "./complexFlats"
import ComplexPlan from "./complexPlan"

const Complex = ({ lang }) => {
  let header
  if (lang !== "kk") {
    header = (
      <>
        <span className="h2-line">Расположение домов и планировка квартир</span>
        <span className="h2-line">
          В ЖК <span className="h2-color">GREEN PLAZA</span>
        </span>
      </>
    )
  } else {
    header = (
      <>
        <span className="h2-line">
          <span className="h2-color">GREEN PLAZA</span>-да үйлердің орналасуы
          және
        </span>
        <span className="h2-line">пәтерлердің орналасуы</span>
      </>
    )
  }

  let infrastrMobile = <InfrastructureMobile />
  let infrastrDesktop = <Infrastructure />

  if (lang === "kk") {
    infrastrMobile = <InfrastructureMobileKZ />
    infrastrDesktop = <InfrastructureKZ />
  }

  return (
    <section className="section light complex">
      <div className="container">
        <div className="row v-center space-between">
          <h2>{header}</h2>
        </div>
        <div className="row">
          <div className="complex-plans">
            {infrastrMobile}
            {infrastrDesktop}
            <ComplexPlan lang={lang} />
          </div>
        </div>
        <div className="row">
          <ComplexFlats lang={lang} />
        </div>
      </div>
    </section>
  )
}

export default Complex
