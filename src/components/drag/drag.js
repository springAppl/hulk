import React, { Component } from "react";
import initialData from "../../resources/initial-data";
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";
export default class Drag extends Component {
  state = initialData;
  dragEnd = result => {
    console.log(result);
  }
  render() {
    const list = this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
      return <Column key={column.id} column={column} tasks={tasks} />;
    });
    return (
      <DragDropContext
        onDragEnd={this.dragEnd}
      >
        <div
          style={{
            marginLeft: 400
          }}
        >
          {list}
        </div>
      </DragDropContext>
    );
  }
}
