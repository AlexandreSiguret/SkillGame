define({ "api": [
  {
    "type": "delete",
    "url": "/games/:id",
    "title": "delete a Game",
    "name": "DeleteGame",
    "group": "Game",
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
            "field": "GameNotFound",
            "description": "<p>The <code>id</code> of Game was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"GameNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "game/index.spec.js",
    "groupTitle": "Game"
  },
  {
    "type": "get",
    "url": "/games",
    "title": "Read data of Game",
    "name": "GetGame",
    "group": "Game",
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
            "type": "Number",
            "optional": false,
            "field": "UserId",
            "description": "<p>ID of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ConceptId",
            "description": "<p>ID of Concept.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "ended",
            "description": "<p>Ended of game.</p>"
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
            "field": "GameNotFound",
            "description": "<p>The <code>id</code> of the Game was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"GameNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "game/index.spec.js",
    "groupTitle": "Game"
  },
  {
    "type": "get",
    "url": "/games/:id",
    "title": "Read data of Game by id",
    "name": "GetGame",
    "group": "Game",
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
            "type": "Number",
            "optional": false,
            "field": "UserId",
            "description": "<p>ID of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ConceptId",
            "description": "<p>ID of Concept.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "ended",
            "description": "<p>Ended of game.</p>"
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
            "field": "GameNotFound",
            "description": "<p>The <code>id</code> of the Game was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"GameNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "game/index.spec.js",
    "groupTitle": "Game"
  },
  {
    "type": "patch",
    "url": "/games/:id",
    "title": "Change a Game",
    "name": "PatchGame",
    "group": "Game",
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
            "type": "Number",
            "optional": false,
            "field": "UserId",
            "description": "<p>ID of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ConceptId",
            "description": "<p>ID of Concept.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "ended",
            "description": "<p>Ended of game.</p>"
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
            "field": "GameNotFound",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"GameNameTooShort\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "game/index.spec.js",
    "groupTitle": "Game"
  },
  {
    "type": "post",
    "url": "/games",
    "title": "Create a new Game",
    "name": "PostGame",
    "group": "Game",
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
            "type": "Number",
            "optional": false,
            "field": "UserId",
            "description": "<p>ID of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ConceptId",
            "description": "<p>ID of Concept.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "ended",
            "description": "<p>Ended of game.</p>"
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
            "field": "GameNotFound",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"GameNameTooShort\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "game/index.spec.js",
    "groupTitle": "Game"
  },
  {
    "type": "put",
    "url": "/games/:id",
    "title": "Change a Game",
    "name": "PutGame",
    "group": "Game",
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
            "type": "Number",
            "optional": false,
            "field": "UserId",
            "description": "<p>ID of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ConceptId",
            "description": "<p>ID of Concept.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "ended",
            "description": "<p>Ended of game.</p>"
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
            "field": "GameNotFound",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response(exemple):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"GameNameTooShort\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "game/index.spec.js",
    "groupTitle": "Game"
  }
] });
