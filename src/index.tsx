import * as React from "react";
import {render} from "react-dom";
import {TestProjectPanel} from "./components/panel";
import {TestProjectCfg} from "./scripts/panel";

/**
 * Test Project
 */
class TestProject {
    /**
     * Constants
     */

     private _id = "testProject";

    // Configuration
    Configuration = TestProjectCfg;

    /**
     * Constructor
     */
    constructor() {
        // Add a load event
        window.addEventListener("load", () => {
            // Add body element
            let el = this.addBodyElement();
            if(el) {
                // Render the panel
                render(<TestProjectPanel id={this._id} />, el);
            } else {
                // Log
                console.log("[Test Project] The suite bar was not detected. Are you testing against SharePoint Online?");
            }
        });
    }

    /**
     * Methods
     */

    // Method to add a body component to render the panel to
    private addBodyElement = () => {
        // Ensure the element exists
        let el = document.querySelector("#" + this._id);
        if(el == null) {
            // Create the element
            el = document.createElement("div");
            el.id = this._id;

            // Add the element to the body
            document.body.appendChild(el);
        }

        // Return the element
        return el;
    }
}

// Create the global variable
window["TestProject"] = new TestProject();