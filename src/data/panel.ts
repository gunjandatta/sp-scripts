import { List, Types } from "gd-sprest";
import { Promise } from "es6-promise";

/**
 * Test Project Item
 */
export interface ITestProjectItem extends Types.IListItemQueryResult {
    Title: string,
    TPCategory: string,
    TPLink: Types.ComplexTypes.FieldUrlValue
}

/**
 * Test Project Data Source
 */
export class TestProjectDataSource {
    static loadData = () => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the list
            (new List("Test Project"))
                // Get the items
                .Items()
                // Set the query
                .query({
                    OrderBy: ["TPCategory", "Title"],
                    Select: ["Title", "TPCategory", "TPLink"]
                })
                // Execute the request
                .execute((items) => {
                    // Resolve or reject the promise
                    items.results ? resolve(items.results) : reject(items);
                });
        });
    }
}