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
            },
            {
                Description: "Adds a reference to the fabric ui styles.",
                Location: "ScriptLink",
                Name: "Office_Fabric-UI",
                ScriptBlock: "document.head.innerHTML += \"<link rel='stylesheet' href='https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/4.1.0/css/fabric.min.css'>\";",
                Title: "Office Fabric-UI"
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
                    SchemaXml: '<Field ID="{1D6F2ABA-F9B1-42D1-8D90-601720F42048}" Name="TPCategory" StaticName="TPCategory" DisplayName="Link Category" Type="Choice"><CHOICES><CHOICE>Cat 1</CHOICE><CHOICE>Cat 2</CHOICE><CHOICE>Cat 3</CHOICE><CHOICE>Cat 4</CHOICE></CHOICES></Field>'
                },
                {
                    Name: "TPLink",
                    SchemaXml: '<Field ID="{228BE422-EE27-4277-ABB4-60172054203C}" Name="TPLink" StaticName="TPLink" DisplayName="Link URL" Type="URL" />'
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
                    ViewFields: ["LinkTitle", "TPCategory", "TPLink"],
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
    ],

    /**
     * Web Parts
     */
    WebPartCfg: [
        {
            FileName: "aaa_test.webpart",
            XML: `<?xml version="1.0" encoding="utf-8"?>
<webParts>
    <webPart xmlns="http://schemas.microsoft.com/WebPart/v3">
        <metaData>
            <type name="Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />
            <importErrorMessage>$Resources:core,ImportantErrorMessage;</importErrorMessage>
        </metaData>
        <data>
            <properties>
                <property name="Title" type="string">AAA Test</property>
                <property name="Description" type="string">Demo of creating a custom webpart.</property>
                <property name="ChromeType" type="chrometype">None</property>
                <property name="Content" type="string">
                    &lt;div id="wp_testProject" /&gt;
                    &lt;script type="text/javascript" src="~site/siteassets/dev/testProject.js"&gt;&lt;/script&gt;
                </property>
            </properties>
        </data>
    </webPart>
</webParts>`
        }
    ]
});