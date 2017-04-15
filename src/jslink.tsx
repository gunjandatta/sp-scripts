import * as React from "react";
import {render} from "react-dom";
import {JSLink} from "gd-sprest";
import {MyView} from "./components/myView";

declare var RenderBodyTemplate:(ctx:any) => void;
declare var RenderFooterTemplate:(ctx:any) => void;
declare var RenderHeaderTemplate:(ctx:any) => void;

/**
 * Test Project - My View
 */
class TestProjectMyView {
    // Initialization
    init = () => {
        // Create the JSLink helper
        let jslink = new JSLink();

        // Set the template
        jslink.Templates = {
            Body: this.renderBody,
            Footer: this.renderFooter,
            Header: this.renderHeader
        }

        // Register the CSR override
        jslink.register();
    }

    // Method to render the body
    private renderBody = (ctx) => {
        // Clear the body
        return "";
    }

    // Method to render the footer
    private renderFooter = (ctx) => {
        // Render the element, passing the view data to it
        render(<MyView items={ctx.ListData.Row} />, document.querySelector("#myCustomView"));

        // Return nothing
        return "";
    }

    // Method to render the header
    private renderHeader = (ctx) => {
        return "<div id='myCustomView'></div>"
    }
}

// Create the global variable
if(window["TestProjectMyView"] == null) {
    // Create the global variable
    window["TestProjectMyView"] = new TestProjectMyView();

    // Write the js to initialize the CSR override. This will ensure it works w/ MDS.
    document.write("<script type='text/javascript'>(function() { TestProjectMyView.init(); })()</script>");
}