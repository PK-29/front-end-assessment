import React, { Component } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

class Api extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      term: "",
      className: "accordion-content accordion-close",
      headingClassName: "accordion-heading"
    };
    this.handleClick = this.handleClick.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  handleClick() {
    const { open } = this.state;
    if (open) {
      this.setState({
        open: false,
        className: "accordion-content accordion-close",
        headingClassName: "accordion-heading"
      });
    } else {
      this.setState({
        open: true,
        className: "accordion-content accordion-open",
        headingClassName: "accordion-heading clicked"
      });
    }
  }
  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  componentDidMount() {
    fetch("https://www.hatchways.io/api/assessment/students")
      .then(results => results.json())
      .then(data => this.setState({ students: data }));
  }

  getallPics() {
    if (this.state.students.students) {
      //console.log(this.state.students.students);
      let avg = array =>
        array.reduce((num1, num2) => Number(num1) + Number(num2), 0) /
        array.length;
      let filterd = this.state.students.students.filter(id => {
        //console.log(id);
        return (
          id.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
          -1
        );
      });
      return (
        <div className="container ">
          {filterd.map(stdnt => (
            <div className="container" key={stdnt.id}>
              <div className="row">
                <div className="pl-2 col-sm">
                  <img
                    className="float-left img-thumbnail"
                    src={stdnt.pic}
                    alt="pic"
                  />
                </div>
                <div className="container col-sm">
                  <h3>{stdnt.firstName + " " + stdnt.lastName}</h3>
                  <p>{stdnt.email}</p>
                  <p>{stdnt.company}</p>
                  <p>{stdnt.skill}</p>
                  <p>Average: {avg(stdnt.grades)}%</p>
    
                  <div id="marks" className="collapse">
                    {stdnt.grades.map(marks => (
                      <p>
                        Test {marks.indexOf(marks)} {marks}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else return "loading";
  }

  render() {
    return (
      <div className="container">
      
        <form className="text-center">
          <input type="text" onChange={this.searchHandler} />
        </form>

        {this.getallPics()}
      </div>
    );
  }
}

export default Api;
