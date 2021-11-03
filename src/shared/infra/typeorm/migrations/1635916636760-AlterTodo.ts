import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTodo1635916636760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("todos", "id")
        await queryRunner.dropColumn("todos", "iscompleted")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "todos",
            new TableColumn({
                name: "id",
                type: "uuid",
                isPrimary: true
            })
        )
        await queryRunner.addColumn(
            "todos",
            new TableColumn({
                name: "completed",
                type: "boolean",
            })
        )
    }

}
