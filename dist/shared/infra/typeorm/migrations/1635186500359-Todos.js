"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todos1635186500359 = void 0;

var _typeorm = require("typeorm");

class Todos1635186500359 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "todos",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "body",
        type: "varchar"
      }, {
        name: "iscompleted",
        type: "boolean"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('todos');
  }

}

exports.Todos1635186500359 = Todos1635186500359;