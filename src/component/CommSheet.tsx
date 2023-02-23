import React, { useEffect } from "react";
import loader from "@ibsheet/loader";

interface props {
  sheetDef: any;
}

class CommSheet extends React.Component<props> {
  state = {
    sheetEl: "",
    options: [],
  };
  sheetId = "";
  componentDidUpdate(previousProps: any, previousState: any) {
    console.log("componentDidUpdate : ");
    return true;
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.options !== this.state.options;
  }

  componentDidMount() {
    const sheetEl = "sheet_" + Math.random().toString(36).substring(2, 7);
    this.setState({ sheetEl });

    const { data, options } = this.props.sheetDef;
    console.log("CommSheet sheetEl : ", sheetEl);
    this.setState({ options });

    loader
      .createSheet({
        el: sheetEl,
        options,
        data,
      })
      .then((sheet) => {
        this.sheetId = sheet.id;
      });

    return () => {
      loader.removeSheet(this.sheetId);
    };
  }

  render() {
    console.log("CommSheet :render");
    return (
      <div>
        <div id={this.state.sheetEl}></div>
      </div>
    );
  }
}

export default React.memo(CommSheet);
