import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserPassword1624809612627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        "users",
        new TableColumn({
          name: "password",
          type: "varchar"
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("users", "password");
    }

}
