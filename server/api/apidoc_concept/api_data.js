define({ "api": [
  {
    "type": "get",
    "url": "/concepts/:id",
    "title": "Request Concept information",
    "name": "GetConcept",
    "group": "Concept",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Concepts",
            "description": "<p>unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the Concept.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "concept/index.spec.js",
    "groupTitle": "Concept"
  }
] });
