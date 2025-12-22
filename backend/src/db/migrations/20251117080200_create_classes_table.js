/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("class_name").notNullable();  
    table.string("section").notNullable();     
    table.integer("class_teacher_id").unsigned().references("id").inTable("teachers").onDelete("SET NULL");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("classes");
}
