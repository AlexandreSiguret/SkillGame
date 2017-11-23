define({ "api": [
  {
    "type": "delete",
    "url": "/messages/:id",
    "title": "delete a Message",
    "name": "DeleteMessage",
    "group": "Message",
    "permission": [
      {
        "name": "none"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MessageNotFound",
            "description": "<p>The <code>id</code> of the Message was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MessageNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "message/index.spec.js",
    "groupTitle": "Message"
  },
  {
    "type": "get",
    "url": "/messages",
    "title": "Read data of Message",
    "name": "GetMessage",
    "group": "Message",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expediteur",
            "description": "<p>Expediteur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destinateur",
            "description": "<p>Destinateur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "msg_type",
            "description": "<p>Type of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Message-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MessageNotFound",
            "description": "<p>The <code>id</code> of the Message was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MessageNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "message/index.spec.js",
    "groupTitle": "Message"
  },
  {
    "type": "get",
    "url": "/messages/:id",
    "title": "Read data of Message by id",
    "name": "GetMessage",
    "group": "Message",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expediteur",
            "description": "<p>Expediteur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destinateur",
            "description": "<p>Destinateur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "msg_type",
            "description": "<p>Type of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Message-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MessageNotFound",
            "description": "<p>The <code>id</code> of the Message was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MessageNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "message/index.spec.js",
    "groupTitle": "Message"
  },
  {
    "type": "post",
    "url": "/messages",
    "title": "Create a new Message",
    "name": "PostMessage",
    "group": "Message",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expediteur",
            "description": "<p>Expediteur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destinateur",
            "description": "<p>Destinateur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "msg_type",
            "description": "<p>Type of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Message-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MessageNotFound",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"MessageNameTooShort\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "message/index.spec.js",
    "groupTitle": "Message"
  },
  {
    "type": "put",
    "url": "/messages/:id",
    "title": "Change a Message",
    "name": "PutMessage",
    "group": "Message",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expediteur",
            "description": "<p>Expediteur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destinateur",
            "description": "<p>Destinateur of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "msg_type",
            "description": "<p>Type of the Message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MessageNotFound",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"MessageNameTooShort\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "message/index.spec.js",
    "groupTitle": "Message"
  }
] });
