import React, { Component } from "react"
import LocationIcon from "./LocationIcon.png"
import "./Location.css"


export default class LocationDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const location = this.props.locations.find(a => a.id === parseInt(this.props.match.params.locationId)) || {}

        return (
          <section className="locations">
            <div key={location.id} className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <img src={LocationIcon} className="icon--location" />
                  {location.name}
                </h4>
                <br></br>
                <h6 className="card-title">{location.coordinates}</h6>
              </div>
            </div>
          </section>
        )
    }
}