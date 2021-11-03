import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTodoIdType1635899814258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("todos", "id")
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
    }

}
