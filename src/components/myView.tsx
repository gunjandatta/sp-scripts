import * as React from "react";
import {ITestProjectItem} from "../data/panel";
import {Label, Link} from "office-ui-fabric-react";
import "../sass/panel.scss";

/**
 * Properties
 */
interface Props {
    items: Array<ITestProjectItem>;
}

/**
 * My View
 */
export class MyView extends React.Component<Props, any> {
    // Render the component
    render() {
        return (
            <div className="tpLink">
                {this.renderLinks()}
            </div>
        );
    }

    // Method to render the links
    private renderLinks() {
        let categories = {};
        let links = [];

        // Ensure items exist
        if(this.props.items == null || this.props.items.length == 0) {
            return <Label>The list contains no items.</Label>;
        }

        // Parse the items
        for(let i=0; i<this.props.items.length; i++) {
            let item = this.props.items[i];

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