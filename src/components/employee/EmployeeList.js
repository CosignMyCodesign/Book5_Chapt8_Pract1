import React, { Component } from 'react'
import employeeIcon from "./EmployeeIcon.png"
import { Link } from "react-router-dom";
import "./Employee.css"


export default class EmployeeList extends Component {
  render() {
      return (

        <React.Fragment>
                <div className="employeeButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/employees/new")}
                            }>
                        Hire Employee
                    </button>
                </div>
          <section className="employees">
            {
              this.props.employees.map(employee =>
                  <div key={employee.id} className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <img src={employeeIcon} className="icon--employee" />
                        {employee.name}
                        <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                        <a href="#"
                          onClick={() => this.props.fireEmployee(employee.id)}
                          className="card-link">Fire Employee</a>
                      </h5>
                    </div>
                  </div>
              )
          }
          </section>
          </React.Fragment>
      )
  }
}