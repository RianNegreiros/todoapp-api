import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AlterTodoId1635796216669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("todos", "id")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "todos",
            new TableColumn({
                name: "id",
                type: "numeric",
                isPrimary: true
            })
        )
    }

}
