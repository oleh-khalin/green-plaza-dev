import React from "react"
// import { useLocalJsonForm, useGlobalJsonForm } from "gatsby-tinacms-json"

import RhombusIcon from "../../icons/rhombus.svg"
import { graphql, useStaticQuery } from "gatsby"
import { YMaps, Map, Placemark } from "react-yandex-maps"

const mapData = {
  center: [43.675031, 51.1378],
  zoom: 12,
}

const coordinates = [43.675031, 51.1378]

const Contacts = ({ lang }) => {
  const data = useStaticQuery(graphql`
    query {
      directusContact {
        phones {
          id
          phone
        }
        addresses_ru {
          id
          name
          link
        }
        addresses_kz {
          id
          name
          link
        }
        working_hours_ru
        working_hours_kz
      }
    }
  `)
  // const { phones, addresses, working_hours } = data.directusContact
  const phones = data.directusContact.phones

  let header
  let addresses
  let working_hours
  let phoneTitle
  let locationTitle
  let hoursTitle
  if (lang !== "kk") {
    header = "Контакты"
    addresses = data.directusContact.addresses_ru
    working_hours = data.directusContact.working_hours_ru
    phoneTitle = `Телефоны`
    locationTitle = `Местоположение`
    hoursTitle = `Режим работы`
  } else {
    header = "Байланыс"
    addresses = data.directusContact.addresses_kz
    working_hours = data.directusContact.working_hours_kz
    phoneTitle = `Телефондар`
    locationTitle = `Орналасуы`
    hoursTitle = `Жұмыс тәртібі`
  }

  return (
    <section className="section light contacts">
      <div className="container">
        <div className="row v-center space-between">
          <h2>
            <span className="h2-line">{header}</span>
          </h2>
        </div>
        <div className="row v-center space-between">
          <div className="contacts-map">
            <YMaps
              enterprise
              query={{
                apikey: '0de5a7fd-4f3d-446c-a194-8901955249b9',
              }}
            >
              <Map defaultState={mapData} width="-1" height="100%">
                <Placemark geometry={coordinates} />
              </Map>
            </YMaps>
          </div>
        </div>
        <div className="row v-center space-between">
          <div className="contacts-info">
            <div className="contacts-item">
              <h3 className="contacts-item-header">
                <RhombusIcon />
                {phoneTitle}
              </h3>
              <ul className="contacts-item-list">
                {phones.map(phone => (
                  <li key={phone.id}>
                    <a href={"tel:" + phone.phone}>{phone.phone}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contacts-item">
              <h3 className="contacts-item-header">
                <RhombusIcon />
                {locationTitle}
              </h3>
              <ul className="contacts-item-list">
                {addresses.map(addressItem => (
                  <li key={addressItem.id}>
                    <a
                      href={addressItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {addressItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contacts-item">
              <h3 className="contacts-item-header">
                <RhombusIcon />
                {hoursTitle}
              </h3>
              <div dangerouslySetInnerHTML={{ __html: working_hours }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
