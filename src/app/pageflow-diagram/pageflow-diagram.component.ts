import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';
import { PageflowServiceService } from '../pageflow-service.service';
import {Inspector} from './Inspector';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageflowStatusDialogComponent } from '../pageflow-status-dialog/pageflow-status-dialog.component';


@Component({
  selector: 'app-pageflow-diagram',
  templateUrl: './pageflow-diagram.component.html',
  styleUrls: ['./pageflow-diagram.component.css']
})
export class PageflowDiagramComponent implements OnInit {

  public myDiagram ;

  jobName : String = '';
  showErrorMsg= false;
  showSuccessMsg = false;

  //Parameters required to add
  tableName = '';
  columns = '';
  alias = '';
  mySavedModel = '';
  jobExecutionStatus : any;

  public sampleData = [];

  public postData = {
      test : 'my content'
  };

  constructor(private pageflowServiceService: PageflowServiceService, 
              private activatedRoute : ActivatedRoute,
              public dialog: MatDialog) { }

  
  ngOnInit(): void {
    //alert('ngOnInit Method')
    this.activatedRoute.queryParams.subscribe(params => {
      this.jobName = params.jobName;
    });
  }

  save() {
    this.showErrorMsg= false;
    this.showSuccessMsg = false;
    this.mySavedModel  = this.myDiagram.model.toJson();
    this.utilityMethod();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PageflowStatusDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  load(){
    this.showErrorMsg = false;
    this.showSuccessMsg = false;
   if(this.jobName != ''){
    this.pageflowServiceService.postEtlJobDetails(this.myDiagram.model.toJson(), this.jobName).
    subscribe(response => 
      {
      },err => {
        if(err.status == 200){
         this.showSuccessMsg = true;
         this.jobExecutionStatus = String(err.error.text);
        }else{
         this.showErrorMsg = true;
         this.jobExecutionStatus = String(err.error.message);
        }
   } );
  }else{
    alert('Please enter Job Name and Save');
  }
  }
  
  public ngAfterViewInit(): void
  {
    this.utilityMethod();
  }


  public utilityMethod(): void{
    
    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    var greengrad = $(go.Brush, "Linear", { 0: "#0a69c9", 1: "#0a69c9" });
    var bluegrad = $(go.Brush, "Linear", { 0: "#0a69c9", 1: "#0a69c9" });
    var redgrad = $(go.Brush, "Linear", { 0: "#0a69c9", 1: "#0a69c9" });
    var whitegrad = $(go.Brush, "Linear", { 0: "#0a69c9", 1: "#0a69c9" });

    var bigfont = "bold 13pt Helvetica, Arial, sans-serif";
    var smallfont = "bold 11pt Helvetica, Arial, sans-serif";

    // Common text styling
    function textStyle() : any {
      return {
        margin: 6,
        wrap: go.TextBlock.WrapFit,
        textAlign: "center",
        editable: true,
        //font: bigfont,
        stroke: "white",
      }
    }

    this.myDiagram  =
      $(go.Diagram, "myDiagramDiv",
        {
          // have mouse wheel events zoom in and out instead of scroll up and down
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
          initialAutoScale: go.Diagram.Uniform,
          "linkingTool.direction": go.LinkingTool.ForwardsOnly,
          layout: $(go.LayeredDigraphLayout, { isInitial: false, isOngoing: false, layerSpacing: 50 }),
          "undoManager.isEnabled": true,
          "clickCreatingTool.archetypeNodeData": { // allow double-click in background to create a new node
            TableName: "",
            Columns: "",
            alias: ""
          }
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    /*this.myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      //if (button) (<HTMLInputElement>document.getElementsByTagName("button")).disabled = !this.myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (this.myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });*/

    var defaultAdornment =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 4 }),
          $(go.Placeholder)),
        // the button to create a "next" node, at the top-right corner
        $("Button",
          {
            alignment: go.Spot.TopRight,
            click: addNodeAndLink
          },  // this function is defined below
          new go.Binding("visible", "", function(a) { return !a.diagram.isReadOnly; }).ofObject(),
          $(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
        )
      );

      var myInspector = new Inspector("myInspector", this.myDiagram,
      {
        properties: {
          "key": { show: Inspector.showIfPresent, readOnly: true  },
          //"text": { show: Inspector.showIfNode },
          "category": {show: Inspector.showIfPresent, readOnly: true}
          //"LinkComments": { show: Inspector.showIfLink },
          /*"Table Name": { show: Inspector.showIfNode },
          "Columns": { show: Inspector.showIfNode },
          "alias": { show: Inspector.showIfNode }*/
          //"chosen": { show: Inspector.showIfNode, type: "checkbox" },
          //"state": { show: Inspector.showIfNode, type: "select", choices: ["Stopped", "Parked", "Moving"] }
          //"comments": {}
        }
      });

       
    this.myDiagram.nodeTemplateMap.add("sourceHive",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          {
            fill: bluegrad,
            portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40,
          }),
        $(go.TextBlock, "SourceHive", textStyle(),
          {row: 1, column: 0,
            editable: false, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3)},
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, textStyle()),
          { row:2, column: 0, textEditable: false},
          new go.Binding("text", "text").makeTwoWay()
      ));

      this.myDiagram.nodeTemplateMap.add("sourceSql",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          {
            fill: bluegrad,
            portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40
          }),
        $(go.TextBlock, "SourceSql", textStyle(),
          {row: 1, column: 0,
            editable: false, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3)},
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, textStyle()),
          { row:2, column: 0, textEditable: false},
          new go.Binding("text", "text").makeTwoWay()
      ));

      this.myDiagram.nodeTemplateMap.add("sourceHbase",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          {
            fill: bluegrad,
            portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40
          }),
        $(go.TextBlock, "SourceHbase", textStyle(),
          {row: 1, column: 0,
            editable: false, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3)},
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, textStyle()),
          { row:2, column: 0, textEditable: false},
          new go.Binding("text", "text").makeTwoWay()
      ));

      this.myDiagram.nodeTemplateMap.add("sourcePhoenix",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          {
            fill: bluegrad,
            portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40
          }),
        $(go.TextBlock, "SourcePhoenix", textStyle(),
          {row: 1, column: 0,
            editable: false, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3)},
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, textStyle()),
          { row:2, column: 0, textEditable: false},
          new go.Binding("text", "text").makeTwoWay()
      ));


      this.myDiagram.nodeTemplateMap.add("deserializerNode",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          {
            fill: whitegrad, toLinkable: true,
            portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40
          }),
        $(go.TextBlock, "Deserializer", textStyle(),
          {row: 1, column: 0,
            editable: false, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3)},
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, "", textStyle()),
          { row:2, column: 0, textEditable: false},
          new go.Binding("text", "text", function(v){return v}).makeTwoWay()
      ));

      this.myDiagram.nodeTemplateMap.add("dslNode",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          {
            fill: whitegrad, toLinkable: true,
            portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40
          }),
        $(go.TextBlock, "DSL", textStyle(),
          {row: 1, column: 0,
            editable: false, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3)},
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, "", textStyle()),
          { row:2, column: 0, textEditable: false},
          new go.Binding("text", "text", function(v){return v}).makeTwoWay()
      ));

    this.myDiagram.nodeTemplateMap

    this.myDiagram.nodeTemplateMap.add("targetPhoenix",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          { fill: greengrad, portId: "", toLinkable: true, toEndSegmentLength: 50 }),
        $(go.TextBlock, "TargetPhoenix", textStyle(),
          new go.Binding("text", "text", function(v){return v}).makeTwoWay())
      ));

      this.myDiagram.nodeTemplateMap.add("targetHbase",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          { fill: greengrad, portId: "", toLinkable: true, toEndSegmentLength: 50 }),
        $(go.TextBlock, "TargetHbase", textStyle(),
          new go.Binding("text", "text", function(v){return v}).makeTwoWay())
      ));

      this.myDiagram.nodeTemplateMap.add("targetSql",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          { fill: greengrad, portId: "", toLinkable: true, toEndSegmentLength: 50 }),
        $(go.TextBlock, "TargetSql", textStyle(),
          new go.Binding("text", "text", function(v){return v}).makeTwoWay())
      ));

      this.myDiagram.nodeTemplateMap.add("targetHive",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          { fill: greengrad, portId: "", toLinkable: true, toEndSegmentLength: 50 }),
        $(go.TextBlock, "TargetHive", textStyle(),
          new go.Binding("text", "text", function(v){return v}).makeTwoWay())
      ));

    // Undesired events have a special adornment that allows adding additional "reasons"
    var UndesiredEventAdornment =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 4 }),
          $(go.Placeholder)),
        // the button to create a "next" node, at the top-right corner
        $("Button",
          {
            alignment: go.Spot.BottomRight,
            click: addReason
          },  // this function is defined below
          new go.Binding("visible", "", function(a) { return !a.diagram.isReadOnly; }).ofObject(),
          $(go.Shape, "TriangleDown", { desiredSize: new go.Size(10, 10) })
        )
      );

    var reasonTemplate = $(go.Panel, "Vertical",
      $(go.TextBlock, "Reason",
        {
          margin: new go.Margin(4, 0, 0, 0),
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          stroke: "whitesmoke",
          editable: true,
          font: smallfont
        },
        new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, "Columns",
        {
          margin: new go.Margin(4, 0, 0, 0),
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          stroke: "whitesmoke",
          editable: true,
          font: smallfont
        },
        new go.Binding("text", "text").makeTwoWay())
    );


    this.myDiagram.nodeTemplateMap.add("UndesiredEvent",
      $(go.Node, "Auto",
        //new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("location", "loc", <any>'testing').makeTwoWay(),
        { selectionAdornmentTemplate: UndesiredEventAdornment },
        $(go.Shape, "Rectangle",
          { fill: redgrad, portId: "", toLinkable: true, toEndSegmentLength: 50 }),
        $(go.Panel, "Vertical", { defaultAlignment: go.Spot.TopLeft },

          $(go.TextBlock, "Drop", textStyle(),
            {
              stroke: "whitesmoke",
              minSize: new go.Size(80, NaN)
            },
            new go.Binding("text", "text").makeTwoWay()),

          $(go.Panel, "Vertical",
            {
              defaultAlignment: go.Spot.TopLeft,
              itemTemplate: reasonTemplate
            },
            new go.Binding("itemArray", "reasonsList").makeTwoWay()
          ),
          $(go.Panel, "Vertical",
            {
              defaultAlignment: go.Spot.TopLeft,
              itemTemplate: reasonTemplate
            },
            new go.Binding("text", "inputData").makeTwoWay()
          )
        )
      ));

    this.myDiagram.nodeTemplateMap.add("Comment",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle",
          { portId: "", fill: whitegrad, fromLinkable: true }),
        $(go.TextBlock, "A comment",
          {
            margin: 9,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
            font: smallfont
          },
          new go.Binding("text", "text").makeTwoWay())
        // no ports, because no links are allowed to connect with a comment
      ));

    // clicking the button on an UndesiredEvent node inserts a new text object into the panel
    function addReason(e, obj) {
      var adorn = obj.part;
      if (adorn === null) return;
      e.handled = true;
      var arr = adorn.adornedPart.data.reasonsList;
      this.myDiagram.startTransaction("add reason");
      this.myDiagram.model.addArrayItem(arr, {});
      this.myDiagram.commitTransaction("add reason");
    }

    // clicking the button of a default node inserts a new node to the right of the selected node,
    // and adds a link to that new node
    function addNodeAndLink(e, obj) {
      var adorn = obj.part;
      if (adorn === null) return;
      e.handled = true;
      var diagram = adorn.diagram;
      diagram.startTransaction("Add State");
      // get the node data for which the user clicked the button
      var fromNode = adorn.adornedPart;
      var fromData = fromNode.data;
      // create a new "State" data object, positioned off to the right of the adorned Node
      var toData = { text: "new"};
      var p = fromNode.location;
      toData.text = p.x + 200 + " " + p.y;  // the "loc" property is a string, not a Point object
      // add the new node data to the model
      var model = diagram.model;
      model.addNodeData(toData);
      // create a link data from the old node data to the new node data
      var linkdata = {};
      linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
      linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
      // and add the link data to the model
      model.addLinkData(linkdata);
      // select the new Node
      var newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);
      diagram.commitTransaction("Add State");
    }

    // replace the default Link template in the linkTemplateMap
    this.myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
       // new go.Binding("points").makeTwoWay(),
        {  toShortLength: 15 },
        new go.Binding("curviness", "curviness"),
        $(go.Shape,  // the link shape
          { stroke: "#2F4F4F", strokeWidth: 2.5 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "kite", fill: "#2F4F4F", stroke: null, scale: 2 })
      );

    this.myDiagram.linkTemplateMap.add("Comment",
      $(go.Link, { selectable: false },
        $(go.Shape, { strokeWidth: 2, stroke: "darkgreen" })));


    var palette =
      $(go.Palette, "myPaletteDiv",  // create a new Palette in the HTML DIV element
        {
          // share the template map with the Palette
          nodeTemplateMap: this.myDiagram.nodeTemplateMap,
          autoScale: go.Diagram.Uniform  // everything always fits in viewport
        });

    palette.model.nodeDataArray = [
      { key: 1, text: "Source                -", color: "green", isGroup: true, Position : screenLeft },
      { category: "sourceHive", tableName: '', columnName: '' },
      { category: "sourceSql", sql: '', alias : ''},
      { category: "sourceHbase", catalog: '', region : 1 },
      { category: "sourcePhoenix", tableName: '', columns: '' },
      { key: 6, text: "Transformations-", color: "black", isGroup: true },
      { category: "deserializerNode", decoder: '', columnName: '', schemaInfo: ''},
      { category: "dslNode", dslText: '' },
      { key: 9, text: "Target                  -", color: "black", isGroup: true },
      { category: "targetPhoenix", tableName: ''},
      { category: "targetHbase", catalog:'', region: 1 },
      { category: "targetSql", sql: '' }, 
      { category: "targetHive", tableName: '' },
      //{ key: 9, text: "Note: User should be able to drag nodes to canvas", color: "black" },
      //{ category: "UndesiredEvent", reasonsList: ['Sample1','Sample2'],inputData: {} },
      //{ category: "Comment" }
    ];

    // read in the JSON-format data from the "mySavedModel" element
    //this.save();
    load();
    layout();
  
  }
  
}
function layout() {
  this.myDiagram.layoutDiagram(true);
}
function load() {
  //alert('load Method');
  //this.myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").nodeValue);
  this.myDiagram.model = go.Model.fromJson(JSON.parse(`{ "class": "GraphLinksModel",
  "nodeDataArray": [ {"category":"sourceHive", "tableName":"", "columnName":"", "key":-4, "loc":"-287 -79"} ],
  "linkDataArray": []}`));
}
