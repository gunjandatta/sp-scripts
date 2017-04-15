import * as React from "react";
import {} from "../data/panel";
import {
    Panel, PanelType
} from "office-ui-fabric-react";

/**
 * Properties
 */
interface Props {
    id: string
}

/**
 * State
 */
interface State {
    visible: boolean
}

/**
 * Test Project Panel
 */
export class TestProjectPanel extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        // Set the state
        this.state = {
            visible: false
        }
    }

    /**
     * Methods
     */

    // Method to add a link to the suite bar
    private addSuiteBarLink = () => {
        let id = this.props.id + "-sbLink";

        // Get the suite bar top links
        let sbTopLinks = document.querySelector("#suiteLinksBox > ul");
        if(sbTopLinks && sbTopLinks.querySelector("#" + id) == null) {
            // Create the link
            let link = document.createElement("a");
            link.className = "ms-core-suiteLink-a";
            link.href = "javascript:void()";
            link.id = id;
            link.innerHTML = "Test Project";
            link.onclick = this.panelEvent;

            // Create the list item
            let topLink = document.createElement("li");
            topLink.className = "ms-core-suiteLink";
            topLink.appendChild(link);

            // Add the link
            sbTopLinks.appendChild(topLink);
        }
    }

    // Event to handle opening/closing the panel
    private panelEvent(ev?:Event) {
        // Disable postback
        ev ? ev.preventDefault() : null;

        // Update the state
        this.setState({
            visible: this.state ? false : true
        });
    }

    // Render the component
    render() {
        return (
            <Panel isLightDismiss={true} isOpen={this.state.visible} onDismiss={this.panelEvent} type={PanelType.medium}>
                <h3>To Do - Render the list data</h3>
            </Panel>
        );
    }
}