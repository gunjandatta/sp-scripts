import * as React from "react";
import {ITestProjectItem, TestProjectDataSource} from "../data/panel";
import {
    Label, Link,
    Panel, PanelType
} from "office-ui-fabric-react";
import "../sass/panel.scss";

/**
 * Properties
 */
interface Props {
    id: string;
}

/**
 * State
 */
interface State {
    items: Array<ITestProjectItem>;
    visible: boolean;
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
            items: [],
            visible: false
        }

        // Add the suite bar link
        this.addSuiteBarLink();

        // Load the data
        TestProjectDataSource.loadData().then((items:Array<ITestProjectItem>) => {
            // Update the state
            this.setState({items});
        });
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
            return;
        }

        // Get the ribbon top bar
        let ribbonTopBar = document.querySelector("#Ribbon .ms-cui-topBar2 #RibbonContainer-TabRowRight");
        if(ribbonTopBar) {
            // Create the link
            let link = document.createElement("a");
            link.className="ms-promotedActionButton";
            link.innerHTML = "<span class='sp-clust ms-promotedActionButton-icon' alt='Test Project' style='height:16px;width:16px;position:relative;display:inline-block;overflow:hidden'><img style='left: -236px; top: -49px; position: absolute;' alt='Test Project' src='/_layouts/15/images/spcommon.png?rev=44' /></span><span class='ms-promotedActionButton-text'>Test Project</span>";
            link.style.cursor = "pointer";
            link.title = "Opens the 'Test Project' data panel.";
            link.onclick=this.panelEvent;

            // Add the link
            ribbonTopBar.insertBefore(link, ribbonTopBar.childNodes[0]);
            return;
        }

        // Log
        console.log("The suite bar was not detected.");
    }

    // Event to handle opening/closing the panel
    private panelEvent = (ev?:Event) => {
        // Disable postback
        ev ? ev.preventDefault() : null;

        // Update the state
        this.setState({
            visible: this.state.visible ? false : true
        });
    }
    
    // Render the component
    render() {
        return (
            <Panel isLightDismiss={true} isOpen={this.state.visible} onDismiss={this.panelEvent} type={PanelType.medium}>
                <div className="tpLink">
                    {this.renderLinks()}
                </div>
            </Panel>
        );
    }

    // Method to render the links
    private renderLinks() {
        let categories = {};
        let links = [];

        // Ensure items exist
        if(this.state.items == null || this.state.items.length == 0) {
            return <Label>The list contains no items.</Label>;
        }

        // Parse the items
        for(let i=0; i<this.state.items.length; i++) {
            let item = this.state.items[i];

            // Ensure the category exists
            if(categories[item.TPCategory] == null) {
                categories[item.TPCategory] = [];
            }

            // Add the link
            categories[item.TPCategory].push(item);
        }

        // Parse the links
        for(let category in categories) {
            // Add the header
            links.push(<Label className="tpLink-header" key={"link-cat-" + category}>{category}</Label>);

            // Parse the links
            for(let i=0; i<categories[category].length; i++) {
                let link:ITestProjectItem = categories[category][i];

                // Add the link
                links.push(<Link className="tpLink-link" key={"link-" + category + "-" + i} href={link.TPLink.Url}>{link.Title}</Link>)
            }
        }

        // Return the links
        return links;
    }
}