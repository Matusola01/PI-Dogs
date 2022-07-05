import React, { Component } from "react";
import { connect } from "react-redux";
import './SearchBar.css';
import { getDogByName } from "../../redux/actions/index";


export class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
      // this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
      this.setState({ name: e.target.value });
      // this.props.setPage(1);
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.getDogByName(this.state.name);
      this.setState({name:""});
    }
  
    render() {
      const { name } = this.state;
      return (
        <div>
          <form className="form-container" onSubmit={(e) =>this.handleSubmit(e)}>
            <div className='containerS'>
              <input
                className="input"
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Enter your breed name..."
                value={name}
                onChange={(e) => this.handleChange(e)}
              />
              <button type="submit" className="buttonSubmit">Search</button>
            </div>
          </form>
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      Dogs: state.Dogs
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getDogByName: name => dispatch(getDogByName(name)),
        // setPage: value => dispatch(setPage(value))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar);