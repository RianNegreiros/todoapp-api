import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class TodoUsers1635794646862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "todos_users",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "todo_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            "todos_user",
            new TableForeignKey({
                name: "FKTodoUser",
                referencedTableName: "todos",
                referencedColumnNames: ["id"],
                columnNames: ["todo_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        )

        await queryRunner.createForeignKey(
            "todos_user",
            new TableForeignKey({
                name: "FKUserTodo",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "todos_user",
            "FKTodoUser"
        )

        await queryRunner.dropForeignKey(
            "todos_user",
            "FKUserTodo"
        )

        await queryRunner.dropTable("todos_users")
    }
}
