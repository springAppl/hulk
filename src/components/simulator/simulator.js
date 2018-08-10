import React, { Component } from "react";
import hardware from "../../image/silver_hardware_medium.png";
import "./simulator.css";
import Category from "../minicomponents/category/category";
import HotItems from "../minicomponents/hotitems/hotitems";
import Drag from '../drag/drag';
export default class Simulator extends Component {
  onDragStart = (start) => {
      console.log(start);
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    // the only one that is required
  };
  render() {
    var divStyle = {
      backgroundImage: "url(" + hardware + ")",
      height: 628,
      width: 319,
      float: 'left'
    };
    return (
      <div style={divStyle}>
        <div
          style={{
            height: 73
          }}
        />
        <div
          style={{
            background: "white",
            height: 483,
            width: 274,
            marginLeft: 21
          }}
          className="container"
        >
          <Category />
          <HotItems />
          <Drag/>
        </div>
      </div>
    );
  }
}
