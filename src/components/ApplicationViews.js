import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import LocationManager from "../modules/LocationManager"
import OwnerManager from "../modules/OwnerManager"
import AnimalDetail from './animal/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import LocationDetail from './location/LocationDetail'
import OwnerDetail from './owner/OwnerDetail'
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owner/OwnerForm'


export default class ApplicationViews extends Component {
// Need to start with empty arrays in state
    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }
// componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    componentDidMount() {
      const newState = {}
  
            AnimalManager.getAll().then(allAnimals => {
              this.setState({
                  animals: allAnimals
              })
          })
            EmployeeManager.getAll().then(allEmployees => {
              this.setState({
                  employees: allEmployees
              })
          })
            OwnerManager.getAll().then(allOwners => {
              this.setState({
                  owners: allOwners
              })
          })
            LocationManager.getAll().then(allLocations => {
              this.setState({
                  locations: allLocations
              })
          })
          .then(() => this.setState(newState))
          }

// Chapter 5 addition
// Method to delete an animal
  //     deleteAnimal = id => {
  //     return fetch(`http://localhost:5002/animals/${id}`, {
  //         method: "DELETE"
  //     })
  //     .then(e => e.json())
  //     .then(() => fetch(`http://localhost:5002/animals`))
  //     .then(e => e.json())
  //     .then(animals => this.setState({
  //         animals: animals
  //     })
  //   )
  // }
  //  Challenge chapter 6 to delete animal
  deleteAnimal = (id) => {
    return AnimalManager.removeAndList(id)
    .then(animals => this.setState({
        animals: animals
      })
    )
  }

  addAnimal = (animal) => 
    AnimalManager.post(animal)
    .then(() => AnimalManager.getAll())
    .then(animals => this.setState({
      animals: animals
    })
  )
  
// Method to remove an owner
      removeOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(e => e.json())
        .then(owners => this.setState({
            owners: owners
        })
      )
      }
// Method to fire an employee
      fireEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(e => e.json())
        .then(employees => this.setState({
            employees: employees
        })
      )
      }

      addOwner = (owner) => 
        OwnerManager.post(owner)
        .then(() => OwnerManager.getAll())
        .then(owners => this.setState({
          owners: owners
         })
      )

      addEmployee = (employee) => 
        EmployeeManager.post(employee)
       .then(() => EmployeeManager.getAll())
       .then(employees => this.setState({
          employees: employees
        })
      )
    
// Once the data is fetched we need to render that data
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                  //  Added {...props} according to chapter 8
                   return <AnimalList {...props}
                     animals={this.state.animals}
                     deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                   return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList {...props}
                    employees={this.state.employees}
                    fireEmployee={this.fireEmployee} />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                   return <EmployeeDetail {...props} fireEmployee={this.fireEmployee} employees={this.state.employees} />
                }} />
                <Route exact path="/owners" render={(props) => {
                    return <OwnerList {...props}
                    owners={this.state.owners}
                    removeOwner={this.removeOwner} />
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                   return <OwnerDetail {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                }} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                   return <LocationDetail {...props} locations={this.state.locations} />
                }} />
                {/* Chapter 8 insertion */}
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                      addAnimal={this.addAnimal}
                      employees={this.state.employees} />
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                      addEmployee={this.addEmployee}/>
                }} />
                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                       addOwner={this.addOwner} />
                }} />
                {/* End Chapter 8 insertion */}
            </React.Fragment>
        )
    }
}

