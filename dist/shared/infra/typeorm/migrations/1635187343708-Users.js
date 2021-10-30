"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users1635187343708 = void 0;

var _typeorm = require("typeorm");

class Users1635187343708 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'username',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.Users1635187343708 = Users1635187343708;