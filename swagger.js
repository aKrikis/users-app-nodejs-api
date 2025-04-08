const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User)
    },
    "securitySchemes": {              //gia na poume gia to JWT
      "bearerAuth" : {
        "type": "http",
        "scheme": "bearer",
        "format" : "JWT"
      }
    }
  },
  "security": [{"bearerAuth": []}],   // kai ayto

  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Users and Products CRUD API",
    "description": "App for creating users and choosing products",
    "contacts": {
      "name": "API Support",
      "url": "https://aueb.gr",
      "email": "support@example.gr"
    }
  },
  "servers": [
    {
      "url": "http://localhost:3000/",
      "descriprion": " Local Server"
    },
    {
      "url":"http://www.backend.aueb.gr",
      "description": "Testing server"
    }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "Endpoints for User"
    },
    {
      "name": "Users and Products",
      "description": "Endpoints for users and their products"
    },
    {
      "name": "Auth",
      "description": "Endpoints for Authentication"
    }
  ],


  
  "paths":{
    "/api/users": {
      "get": {
        "tags": ["Users"],
        "summary": "Get all users in system",
        "responses": {
            "200": {
            "description": "OK",
              "schema": {
              "$ref": "#/components/schemas/User",
            }
          }
        }
      },
      "post": {
        "tags": ["Users"],
        "description": "Data of users that we want to create",
        "requestBody" : {
          "description": "Json with user data",
          "content": {
            "application/json": {
              "schema": {
                "type":"object",
                "properties": {
                  "username": {"type":"string"},
                  "password" : {"type":"string"},
                  "name": {"type":"string"},
                  "surname" : {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  },
                  "phone": {
                    "type":"array",
                    "items" : {
                      "type": "object",
                      "properties": {
                        "type": {"type":"string"},
                        "number": {"type":"number"},
                      }
                    }
                  }
                },
                "required": ["username", "password", "name", "surname", "email"] 
              },
            }
          }
        },
        "responses": {
          "200": {
            "description": "New user is created"
          }
        }
      }
    },
    "api/users/{username}":{
      "get": {
        "tags": ["Users"],
        "parameters": [{
          "name": "username",
          "in": "path",
          "required": true,
          "description": "Username of userrs we want to find",
          "type" : "string"
        }],
        "description": "Returns users details for specific username",
        "responses": {
          "200": {
            "description": "User details",
            "schema": {
              "$ref": "#/components/schemas/Users"
            }
          }
        }
        
        },
        "patch" : {
          "tags": ["Users"],
          "description": "Update user",
          "parameters": [
            {
              "name": "username",
              "in": "path",
              "required": true,
              "description": "Username of user that can update",
              "type":"string"
            }
          ],
          "requestBody": {
            "description": "Data of user to update",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type": "object",
                  "properties": {
                    "username": {"type":"string"},
                    "password" : {"type":"string"},
                    "name": {"type":"string"},
                    "surname" : {"type":"string"},
                    "email": {"type":"string"},
                    "address": {
                      "type": "object",
                      "properties": {
                        "area": {"type":"string"},
                        "road": {"type":"string"}
                      }
                    },
                    "phone": {
                      "type":"array",
                      "items" : {
                        "type": "object",
                        "properties": {
                          "type": {"type":"string"},
                          "number": {"type":"number"},
                        }
                      }
                    }
                  },
                  "required": ["email"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Data to be update"
            }
          }
        },
        "delete": {
          "tags": ["Users"],
          "description": "Delete user from DB",
          "parameters" : [{
            "name": "username",
            "in" : "path",
            "description": "User to delete",
            "type": "string",
            "required": true
          }],
          "responses": {
            "200": {
              "description":"Delete a user"
            }
          }
        } 
      },
      "/api/auth/login": {
        "post" : {
          "tags" : ["Auth"],
          "description" : "Login User",
          "requestBody": {
            "description" : "User send username and passwors and for response we have jwt token",
            "content": {
              "application/json": {
                "shema": {
                  "type": "object",
                  "properties" : {
                    "username": {"type": "string"},
                    "password": {"type": "string"}
                  },
                  "required": ["username", "password"],
                }
              }
            }
          },
          "responses": {
            "200": {
              "description" : "Token returned"
            }
          }
        }
      },
      "/api/user-products/{username}": {
        "get": {
          "tags" : ["Users and Products"],
          "parameters" : [
            {
              "name": "username",
              "in": "path",
              "required": true,
              "description": "Find user and products",
              "type": "string"
            }
          ],
          "responses": { 
            "200": {
              "description": "User and Products",
              "schema":{
                "$ref": "#/components/schemas/User"
              }
            }
          }
        }
      }
    }
  }




