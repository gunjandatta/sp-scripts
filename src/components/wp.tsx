import * as React from "react";
import {ITestProjectItem, TestProjectDataSource} from "../data/panel";
import {MyView} from "./myView";

/**
 * State
 */
interface State {
    items: Array<ITestProjectItem>
}

/**
 * Test Project Web Part
 */
export class TestProjectWebPart extends React.Component<null, State> {
    // Constructor
    constructor(props) {
        super(props);

        // Set the state
        this.state = {
            items: []
        };

        // Get the items
        TestProjectDataSource.loadData().then((items:Array<ITestProjectItem>) => {
            // Update the state
            this.setState({ items });
        });
    }

    // Render the component
    render() {
        return (
            <MyView items={this.state.items} />
        );
    }
}