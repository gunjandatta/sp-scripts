import {Helper, SPTypes} from "gd-sprest";

/**
 * Test Project Configuration
 */
export const TestProjectCfg = new Helper.SPConfig({
    /**
     * User Custom Actions
     */
    CustomActionCfg: {
        Web: [
            {
                Description: "Adds a link in the suitebar to the test list.",
                Location: "ScriptLink",
                Name: "GD_TestProject",
                ScriptSrc: "~site/siteassets/dev/testProject.js",
                Title: "Test Project"
            }
        ]
    },

    /**
     * List
     */
    ListCfg: [
        {
            CustomFields: [
                {
                    Name: "TPCategory",
                    SchemaXml: '<Field ID="" Name="TPCategory" StaticName="TPCategory" DisplayName="Link Category" Type="Choice"><CHOICES><CHOICE>Cat 1</CHOICE><CHOICE>Cat 2</CHOICE><CHOICE>Cat 3</CHOICE><CHOICE>Cat 4</CHOICE></CHOICES></Field>'
                },
                {
                    Name: "TPLink",
                    SchemaXml: '<Field ID="" Name="TPLink" StaticName="TPLink" DisplayName="Link URL" Type="URL" />'
                }
            ],
            ListInformation: {
                BaseTemplate: SPTypes.ListTemplateType.GenericList,
                Description: "Datasource for the test project.",
                Title: "Test Project"
            },
            TitleFieldDisplayName: "Link Name",
            ViewInformation: [
                // All Items
                {
                    ViewFields: ["Title", "TPCategory", "TPLink"],
                    ViewName: "All Items",
                    ViewQuery: "<OrderBy><FieldRef Name='TPCategory' /><FieldRef Name='Title' /></OrderBy>"
                },
                // My View
                {
                    JSLink: "~site/siteassets/dev/testProject_jslink.js",
                    ViewFields: ["Title", "TPCategory", "TPLink"],
                    ViewName: "My View"
                }
            ]
        }
    ]
});